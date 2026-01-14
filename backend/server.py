from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime
import razorpay
import httpx
import hmac
import hashlib

from config import settings, COMPANY_DETAILS
from models import (
    User, UserCreate, UserLogin, UserResponse,
    Order, OrderCreate, PaymentVerification,
    Report, BirthData
)
from auth import (
    hash_password, verify_password, create_access_token,
    get_current_user, get_admin_user
)

mongo_url = settings.MONGO_URL
client = AsyncIOMotorClient(mongo_url)
db = client[settings.DB_NAME]

app = FastAPI()
api_router = APIRouter(prefix="/api")

razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_router.get("/")
async def root():
    return {"message": "AstroMate24 API", "company": COMPANY_DETAILS}

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    existing_user = await db.users.find_one({"email": user_data.email}, {"_id": 0})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user = User(
        name=user_data.name,
        email=user_data.email,
        mobile=user_data.mobile,
        password=hash_password(user_data.password)
    )
    
    doc = user.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.users.insert_one(doc)
    
    token = create_access_token({"sub": user.id})
    
    return {
        "token": token,
        "user": UserResponse(**user.model_dump())
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user_data = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    
    if not user_data or not verify_password(credentials.password, user_data['password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if isinstance(user_data.get('created_at'), str):
        user_data['created_at'] = datetime.fromisoformat(user_data['created_at'])
    
    user = User(**user_data)
    token = create_access_token({"sub": user.id})
    
    return {
        "token": token,
        "user": UserResponse(**user.model_dump())
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse(**current_user.model_dump())

@api_router.post("/payments/create-order")
async def create_order(order_data: OrderCreate, current_user: User = Depends(get_current_user)):
    try:
        razorpay_order = razorpay_client.order.create({
            "amount": order_data.amount * 100,
            "currency": "INR",
            "payment_capture": 1
        })
        
        order = Order(
            user_id=current_user.id,
            razorpay_order_id=razorpay_order['id'],
            amount=order_data.amount,
            status="created",
            birth_data=order_data.birth_data
        )
        
        doc = order.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.orders.insert_one(doc)
        
        return {
            "order_id": order.id,
            "razorpay_order_id": razorpay_order['id'],
            "amount": order_data.amount,
            "key": settings.RAZORPAY_KEY_ID
        }
    except Exception as e:
        logging.error(f"Error creating order: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create order"
        )

@api_router.post("/payments/verify")
async def verify_payment(payment_data: PaymentVerification, current_user: User = Depends(get_current_user)):
    try:
        generated_signature = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode(),
            f"{payment_data.razorpay_order_id}|{payment_data.razorpay_payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()
        
        if generated_signature != payment_data.razorpay_signature:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid payment signature"
            )
        
        order_data = await db.orders.find_one({"id": payment_data.order_id}, {"_id": 0})
        if not order_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Order not found"
            )
        
        await db.orders.update_one(
            {"id": payment_data.order_id},
            {"$set": {
                "razorpay_payment_id": payment_data.razorpay_payment_id,
                "razorpay_signature": payment_data.razorpay_signature,
                "status": "paid"
            }}
        )
        
        report = await generate_astrology_report(payment_data.order_id, current_user.id, order_data['birth_data'])
        
        return {
            "success": True,
            "message": "Payment verified successfully",
            "report_id": report.id
        }
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error verifying payment: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to verify payment"
        )

async def generate_astrology_report(order_id: str, user_id: str, birth_data: dict) -> Report:
    report = Report(
        user_id=user_id,
        order_id=order_id,
        birth_data=birth_data,
        status="processing"
    )
    
    doc = report.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reports.insert_one(doc)
    
    try:
        payload = {
            "api_key": settings.DIVINE_API_KEY,
            **birth_data
        }
        
        async with httpx.AsyncClient(timeout=30.0) as http_client:
            response = await http_client.post(settings.DIVINE_API_URL, json=payload)
            response.raise_for_status()
            api_response = response.json()
        
        await db.reports.update_one(
            {"id": report.id},
            {"$set": {
                "api_response": api_response,
                "status": "completed"
            }}
        )
        
        report.api_response = api_response
        report.status = "completed"
        
    except Exception as e:
        logging.error(f"Error generating report: {e}")
        await db.reports.update_one(
            {"id": report.id},
            {"$set": {"status": "failed"}}
        )
        report.status = "failed"
    
    return report

@api_router.get("/reports/my-reports")
async def get_my_reports(current_user: User = Depends(get_current_user)):
    reports = await db.reports.find({"user_id": current_user.id}, {"_id": 0}).to_list(1000)
    
    for report in reports:
        if isinstance(report.get('created_at'), str):
            report['created_at'] = datetime.fromisoformat(report['created_at'])
    
    return reports

@api_router.get("/reports/{report_id}")
async def get_report(report_id: str, current_user: User = Depends(get_current_user)):
    report_data = await db.reports.find_one({"id": report_id}, {"_id": 0})
    
    if not report_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    if report_data['user_id'] != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    if isinstance(report_data.get('created_at'), str):
        report_data['created_at'] = datetime.fromisoformat(report_data['created_at'])
    
    return report_data

@api_router.get("/admin/users")
async def get_all_users(admin_user: User = Depends(get_admin_user)):
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    
    for user in users:
        if isinstance(user.get('created_at'), str):
            user['created_at'] = datetime.fromisoformat(user['created_at'])
    
    return users

@api_router.get("/admin/orders")
async def get_all_orders(admin_user: User = Depends(get_admin_user)):
    orders = await db.orders.find({}, {"_id": 0}).to_list(1000)
    
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return orders

@api_router.get("/admin/reports")
async def get_all_reports(admin_user: User = Depends(get_admin_user)):
    reports = await db.reports.find({}, {"_id": 0}).to_list(1000)
    
    for report in reports:
        if isinstance(report.get('created_at'), str):
            report['created_at'] = datetime.fromisoformat(report['created_at'])
    
    return reports

@api_router.get("/company")
async def get_company_details():
    return COMPANY_DETAILS

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=settings.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    admin_exists = await db.users.find_one({"email": settings.ADMIN_EMAIL}, {"_id": 0})
    if not admin_exists:
        admin_user = User(
            name="Admin",
            email=settings.ADMIN_EMAIL,
            mobile="+919588369001",
            password=hash_password(settings.ADMIN_PASSWORD),
            is_admin=True
        )
        doc = admin_user.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.users.insert_one(doc)
        logger.info("Admin user created")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
