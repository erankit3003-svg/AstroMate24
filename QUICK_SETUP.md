# 🎬 AstroMate24 - Quick Setup Tutorial (Step by Step)

## ⚡ 5-Minute Quick Setup

### Prerequisites Install Karein (5 minutes)
```
1. Python 3.11 → python.org से download
2. Node.js 18 → nodejs.org से download  
3. MongoDB → mongodb.com से download
   - Windows: Auto-start hoga
   - Mac: brew install mongodb-community
```

---

## 🚀 Setup Steps (10 minutes)

### Step 1: Project Download (30 seconds)
```bash
# Extract ZIP or Git clone
cd astromate24
```

### Step 2: Backend Setup (3 minutes)
```bash
# Terminal 1
cd backend

# Virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install packages
pip install -r requirements.txt

# Create .env file
notepad .env
```

**Copy-paste in .env:**
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="astromate24_db"
CORS_ORIGINS="http://localhost:3000"
JWT_SECRET="secret-key-123"
RAZORPAY_KEY_ID="XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"
DIVINE_API_KEY="XXXXX"
ADMIN_EMAIL="admin@astromate24.com"
ADMIN_PASSWORD="admin123"
```

**Start Backend:**
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

✅ Success: "Uvicorn running on http://0.0.0.0:8001"

### Step 3: Frontend Setup (3 minutes)
```bash
# Terminal 2 (new terminal)
cd frontend

# Install packages
npm install

# Create .env file
notepad .env
```

**Copy-paste in .env:**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Start Frontend:**
```bash
npm start
```

✅ Success: Browser opens at http://localhost:3000

---

## ✅ Verify Setup (2 minutes)

### Test 1: Homepage
```
✓ Open: http://localhost:3000
✓ See: "15 Years of Cosmic Blueprint" heading
✓ See: 17 astrology features
```

### Test 2: Registration
```
1. Click "Get Started"
2. Fill form:
   Name: Test User
   Email: test@example.com
   Mobile: +919999999999
   Password: test123
3. Click "Register"
4. ✓ Dashboard should open
```

### Test 3: Admin Login
```
1. Logout (top-right)
2. Login with:
   Email: admin@astromate24.com
   Password: admin123
3. Click "Admin" button
4. ✓ Admin panel should open
```

---

## 🔥 Common Issues - Quick Fix

### Issue: MongoDB not running
```bash
# Windows: Open Services → Start "MongoDB"
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongodb
```

### Issue: Port already in use
```bash
# Windows:
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8001 | xargs kill -9
```

### Issue: Module not found
```bash
# Backend:
pip install -r requirements.txt

# Frontend:
npm install
```

---

## 📊 What You Get

### User Features:
```
✓ Registration & Login
✓ Birth Details Form (with coordinates)
✓ Payment Integration (Razorpay)
✓ Report Generation (DivineAPI)
✓ Dashboard (All Reports)
✓ Report View (Detailed Analysis)
```

### Admin Features:
```
✓ Admin Panel
✓ View All Users
✓ View All Orders
✓ View All Reports
```

### 17 Report Sections:
```
1. Personal Introduction
2. Astrological Blueprint
3. Planetary Positions
4. Horoscope Charts
5. House Cusps
6. Divisional Charts
7. Relationship Compatibility
8. KP Astrology
9. Ascendant Report
10. Bhava Kundli
11. Vimshottari Dasha (15 years)
12. Yogini Dasha
13. Sadhesati Analysis
14. Kalsarpa Dosha
15. Manglik Analysis
16. Planet Profiles
17. Gemstone Suggestions
```

---

## 🎯 Production Checklist

### Before Going Live:
```
☐ Get Razorpay Live Keys (razorpay.com)
☐ Get DivineAPI Key (divineapi.com)
☐ Update backend/.env with real keys
☐ Change JWT_SECRET
☐ Change Admin Password
☐ Update Company Logo & Details
☐ Setup MongoDB Atlas (cloud database)
☐ Deploy Backend (Railway/Heroku/AWS)
☐ Deploy Frontend (Vercel/Netlify)
☐ Setup Custom Domain
☐ Enable HTTPS/SSL
```

---

## 💰 API Keys Setup

### Razorpay (Payment Gateway)
```
1. Signup: dashboard.razorpay.com/signup
2. Go to: Settings → API Keys
3. Generate Test Keys
4. Copy Key ID & Secret
5. Paste in backend/.env:
   RAZORPAY_KEY_ID="rzp_test_xxxxx"
   RAZORPAY_KEY_SECRET="xxxxxxxx"
6. Restart backend server
```

**Test Payment:**
```
Card: 4111 1111 1111 1111
CVV: 123
Expiry: 12/25
```

### DivineAPI (Astrology Reports)
```
1. Visit: divineapi.com
2. Create Account
3. Get API Key
4. Paste in backend/.env:
   DIVINE_API_KEY="your_key_here"
5. Restart backend server
```

---

## 🎨 Customization

### Change Company Details:
**File:** `backend/config.py`
```python
COMPANY_DETAILS = {
    "company_name": "Your Company",
    "company_email": "info@yourcompany.com",
    "company_mobile": "+91XXXXXXXXXX",
    "logo_url": "your-logo-url",
    ...
}
```

### Change Report Price:
**File:** `frontend/src/pages/BirthDetails.js`
```javascript
amount: 499,  // Change to your price
```

### Change Colors:
**File:** `frontend/src/index.css`
```css
--primary: 41 42% 49%;     /* Gold color */
--secondary: 239 43% 27%;  /* Indigo color */
```

---

## 📁 Project Structure (Simplified)

```
astromate24/
│
├── backend/              # Python FastAPI
│   ├── server.py        # Main APIs
│   ├── models.py        # Database models
│   ├── auth.py          # Login/Register
│   ├── .env             # Secret keys 🔐
│   └── requirements.txt
│
├── frontend/             # React
│   ├── src/
│   │   ├── pages/       # All pages
│   │   ├── components/  # Reusable UI
│   │   └── App.js
│   ├── .env             # Backend URL
│   └── package.json
│
└── README.md            # Full documentation
```

---

## 🆘 Getting Help

### Check Logs:
```bash
# Backend errors: Terminal 1
# Frontend errors: Browser Console (F12)
# MongoDB errors: mongosh
```

### Test Endpoints:
```bash
# Backend health
curl http://localhost:8001/api/

# Test registration
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","mobile":"123","password":"test"}'
```

### Reset Database:
```bash
mongosh
use astromate24_db
db.users.deleteMany({})
db.orders.deleteMany({})
db.reports.deleteMany({})
exit
```

---

## ✨ Features Highlights

### Design:
```
✓ Premium Light Theme (Celestial)
✓ Gold (#B49248) + Indigo (#2A2B5F)
✓ Playfair Display Typography
✓ Glassmorphism Effects
✓ Mobile-First Responsive
✓ Smooth Animations
```

### Security:
```
✓ JWT Authentication
✓ Password Hashing (bcrypt)
✓ Payment Signature Verification
✓ Protected Routes
✓ Admin-Only Access
✓ CORS Configuration
```

### Tech Stack:
```
Backend:  FastAPI + MongoDB + JWT
Frontend: React + Tailwind + Shadcn
Payment:  Razorpay Integration
Reports:  DivineAPI Integration
```

---

## 🎓 Documentation Files

```
📄 README.md                 → Complete English documentation
📄 SETUP_GUIDE_HINDI.md      → Complete Hindi setup guide
📄 PROJECT_DOCUMENTATION.md  → Technical documentation
📄 design_guidelines.json    → Design system
```

---

## 🚀 One-Command Setup (Copy-Paste)

**Terminal 1 (Backend):**
```bash
cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm install && npm start
```

**Don't forget to create .env files in both folders!**

---

## 📈 Next Steps After Setup

1. ✅ Test all features locally
2. ✅ Get real API keys
3. ✅ Customize branding
4. ✅ Test payment flow
5. ✅ Deploy to production
6. ✅ Setup custom domain
7. ✅ Launch! 🎉

---

**Setup Time: ~15 minutes**
**Difficulty: Easy** (Just follow steps)

**Need Help?** Check:
- README.md (English)
- SETUP_GUIDE_HINDI.md (Hindi)
- Backend terminal logs
- Browser console (F12)

---

**Made with ❤️ for AstroMate24**
**Version: 1.0.0**
**Last Updated: January 2025**
