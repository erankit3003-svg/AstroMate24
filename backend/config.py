import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Settings:
    MONGO_URL = os.environ['MONGO_URL']
    DB_NAME = os.environ['DB_NAME']
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
    JWT_ALGORITHM = 'HS256'
    JWT_EXPIRATION_HOURS = 24 * 7
    
    RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', 'XXXXX')
    RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', 'XXXXX')
    
    DIVINE_API_KEY = os.environ.get('DIVINE_API_KEY', 'XXXXX')
    DIVINE_API_URL = 'https://reports.divineapi.com/reports'
    
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@astromate24.com')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

settings = Settings()

COMPANY_DETAILS = {
    "company_url": "https://AstroMate24.com",
    "logo_url": "https://www.astromate24.com/wp-content/uploads/2025/04/cropped-logopng-1.png",
    "footer_text": "© 2025 AstroMate24",
    "company_mobile": "+919588369001",
    "company_name": "AstroMate24",
    "company_email": "info@AstroMate24.com",
    "company_bio": "AstroMate24 delivers precise cosmic insights through advanced Vedic astrology."
}
