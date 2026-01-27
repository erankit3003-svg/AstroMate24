# AstroMate24 - Vedic Astrology Report Platform

A complete production-ready astrology website that generates personalized Vedic astrology reports with Razorpay payment integration.

## 🌟 Features

### User Features
- **User Registration & Login** - JWT-based authentication
- **Birth Details Form** - Comprehensive form with location coordinates
- **Razorpay Payment Integration** - Secure payment processing (₹499 per report)
- **Instant Report Generation** - Automated astrology report via DivineAPI
- **User Dashboard** - View all purchased reports
- **Report View** - Detailed report display with birth chart data

### Admin Features
- **Admin Panel** - Manage users, orders, and reports
- **Analytics Dashboard** - View all transactions and user data
- **Report Management** - Access all generated reports

### Report Contents (17 Sections)
1. Personal Introduction & Life Overview
2. Detailed Astrological Blueprint
3. Planetary Positions & Influences
4. Complete Horoscope Charts
5. House Cusps Analysis
6. Divisional Charts (Vargas)
7. Friendship & Relationship Compatibility
8. KP Astrology Insights
9. Ascendant & Rising Sign Report
10. Bhava Kundli (House Strength)
11. Vimshottari Dasha Timeline (15 Years)
12. Yogini Dasha Predictions
13. Sadhesati Analysis (Saturn Transit)
14. Kalsarpa Dosha Detection
15. Manglik Analysis (Mars Influence)
16. Complete Planet Profiles
17. Personalized Gemstone Recommendations

---

## 🚀 Local Setup Guide

### Prerequisites

Before starting, make sure you have these installed:

- **Python 3.11+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** and **npm/yarn** ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/downloads))

### Step 1: Clone/Download Project

```bash
# If you have the project ZIP, extract it
# OR if it's in a git repository:
git clone <repository-url>
cd astromate24
```

### Step 2: MongoDB Setup

**Option A: Install MongoDB Locally**

1. Download and install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:

```bash
# Windows
# MongoDB starts automatically after installation

# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. Verify MongoDB is running:
```bash
mongosh
# You should see MongoDB shell
```

**Option B: Use MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update in backend/.env: `MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/"`

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (if not exists)
cp .env.example .env   # OR create manually

# Edit .env file with your configuration
```

**Backend .env Configuration:**

Create or edit `backend/.env`:

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="astromate24_db"
CORS_ORIGINS="http://localhost:3000"

JWT_SECRET="your-secret-key-change-this-in-production"

# Get from https://dashboard.razorpay.com/
RAZORPAY_KEY_ID="XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"

# Get from DivineAPI
DIVINE_API_KEY="XXXXX"

# Admin credentials (auto-created on first run)
ADMIN_EMAIL="admin@astromate24.com"
ADMIN_PASSWORD="admin123"
```

**Start Backend Server:**

```bash
# Make sure you're in backend directory and venv is activated
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend should now be running at: `http://localhost:8001`

Test it: Open browser and go to `http://localhost:8001/api/`

### Step 4: Frontend Setup

Open a **NEW terminal** (keep backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# OR if you prefer yarn:
yarn install

# Create .env file (if not exists)
```

**Frontend .env Configuration:**

Create or edit `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
ENABLE_HEALTH_CHECK=false
```

**Start Frontend Server:**

```bash
# Make sure you're in frontend directory
npm start
# OR
yarn start
```

Frontend should now be running at: `http://localhost:3000`

### Step 5: Verify Setup

1. **Open Browser**: Go to `http://localhost:3000`
2. **Check Homepage**: You should see the AstroMate24 landing page
3. **Test Registration**: Click "Get Started" and create an account
4. **Check Admin Panel**: 
   - Login with: `admin@astromate24.com` / `admin123`
   - Click "Admin" button in header

---

## 🔑 API Keys Setup

### 1. Razorpay Setup (For Payment Integration)

1. **Sign up**: Go to https://dashboard.razorpay.com/signup
2. **Get Test Keys**:
   - Go to Settings → API Keys
   - Generate Test Keys (for development)
   - Copy `Key ID` and `Key Secret`
3. **Update backend/.env**:
   ```
   RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
   RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxxx"
   ```
4. **Test Mode**: Use test cards provided by Razorpay
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

### 2. DivineAPI Setup (For Astrology Reports)

1. **Contact DivineAPI**: Visit https://divineapi.com/
2. **Get API Key**: Register and get your API key
3. **Update backend/.env**:
   ```
   DIVINE_API_KEY="your_divine_api_key_here"
   ```

---

## 📁 Project Structure

```
astromate24/
│
├── backend/                    # FastAPI Backend
│   ├── server.py              # Main application
│   ├── models.py              # Database models
│   ├── auth.py                # Authentication logic
│   ├── config.py              # Configuration
│   ├── .env                   # Environment variables
│   └── requirements.txt       # Python dependencies
│
├── frontend/                   # React Frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── BirthDetails.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ReportView.js
│   │   │   └── AdminPanel.js
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── ui/           # Shadcn components
│   │   ├── utils/            # Utility functions
│   │   ├── config.js         # Frontend config
│   │   ├── App.js            # Main app
│   │   └── index.css         # Global styles
│   ├── .env                  # Environment variables
│   └── package.json          # Node dependencies
│
├── design_guidelines.json     # Design system
├── PROJECT_DOCUMENTATION.md   # Detailed docs
└── README.md                 # This file
```

---

## 🎨 Design System

**Theme**: Celestial Light Mode (Premium)

**Colors**:
- Primary (Vedic Gold): `#B49248`
- Secondary (Cosmic Indigo): `#2A2B5F`
- Background: `#FDFBF7` (Pearl White)
- Text: `#1A1B4B` (Deep Indigo)

**Typography**:
- Headings: **Playfair Display** (serif)
- Body: **Manrope** (sans-serif)
- Accents: **Cormorant Garamond**

**Features**:
- Glassmorphism effects
- Smooth animations
- Mobile-first responsive design
- Accessible (WCAG compliant)

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user details (requires auth)

### Payments
- `POST /api/payments/create-order` - Create Razorpay order (requires auth)
- `POST /api/payments/verify` - Verify payment signature (requires auth)

### Reports
- `GET /api/reports/my-reports` - Get user's all reports (requires auth)
- `GET /api/reports/{report_id}` - Get specific report (requires auth)

### Admin (Admin access only)
- `GET /api/admin/users` - List all users
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/reports` - List all reports

### Company
- `GET /api/company` - Get company details (public)

---

## 🔒 Default Credentials

### Admin Account (Auto-created on first startup)
```
Email: admin@astromate24.com
Password: admin123
```

**⚠️ Important**: Change admin password in production by updating `ADMIN_PASSWORD` in backend/.env

---

## 🧪 Testing the Application

### 1. Test User Registration
```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "+919999999999",
    "password": "test123"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### 3. Manual Testing Flow
1. Open `http://localhost:3000`
2. Click "Get Started" → Register new account
3. Fill birth details form
4. Test payment flow (with test keys)
5. View report in dashboard
6. Login as admin → Check admin panel

---

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Error
```
Error: MongoServerError: connect ECONNREFUSED
```
**Solution**: 
- Make sure MongoDB is running
- Check MONGO_URL in backend/.env
- Try: `mongosh` to verify connection

### Issue 2: Port Already in Use
```
Error: Port 8001 is already in use
```
**Solution**:
```bash
# Find and kill the process
# Windows:
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8001 | xargs kill -9
```

### Issue 3: Module Not Found
```
Error: ModuleNotFoundError: No module named 'fastapi'
```
**Solution**:
```bash
# Make sure virtual environment is activated
# Then reinstall dependencies
pip install -r requirements.txt
```

### Issue 4: Frontend Not Loading
```
Error: Cannot connect to backend
```
**Solution**:
- Verify backend is running at http://localhost:8001
- Check REACT_APP_BACKEND_URL in frontend/.env
- Check CORS_ORIGINS in backend/.env includes frontend URL

### Issue 5: Payment Not Working
```
Error: Invalid Razorpay credentials
```
**Solution**:
- This is expected with placeholder keys ("XXXXX")
- Get real test keys from Razorpay dashboard
- Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env
- Restart backend server

---

## 📦 Dependencies

### Backend (Python)
```
fastapi==0.110.1
uvicorn==0.25.0
motor==3.3.1          # MongoDB async driver
pymongo==4.5.0
pydantic>=2.6.4
python-jose>=3.3.0    # JWT
passlib>=1.7.4        # Password hashing
bcrypt==4.1.3
razorpay              # Payment gateway
httpx                 # HTTP client for DivineAPI
python-dotenv>=1.0.1
```

### Frontend (Node.js)
```
react: ^19.0.0
react-router-dom: ^7.5.1
axios: ^1.8.4
tailwindcss: ^3.4.17
lucide-react: ^0.507.0     # Icons
sonner: ^2.0.3             # Toast notifications
@radix-ui/*                # Shadcn UI components
```

---

## 🚀 Deployment Guide

### Deploy on Vercel (Frontend) + Railway (Backend)

**Backend (Railway):**
1. Push code to GitHub
2. Go to https://railway.app/
3. Create new project → Deploy from GitHub
4. Add environment variables from backend/.env
5. Backend will be deployed with auto URL

**Frontend (Vercel):**
1. Go to https://vercel.com/
2. Import GitHub repository
3. Framework: Create React App
4. Root Directory: `frontend`
5. Add environment variable: `REACT_APP_BACKEND_URL=<railway-backend-url>`
6. Deploy

### Deploy on AWS/DigitalOcean/VPS

**Requirements:**
- Ubuntu 20.04+ server
- Nginx
- PM2 (for Node.js)
- Supervisor (for Python)

**Steps:**
1. Install MongoDB, Python, Node.js
2. Clone repository
3. Setup backend with Supervisor
4. Setup frontend with PM2
5. Configure Nginx reverse proxy
6. Setup SSL with Let's Encrypt

---

## 🔧 Customization

### Change Company Details

Edit `backend/config.py`:

```python
COMPANY_DETAILS = {
    "company_url": "https://YourWebsite.com",
    "logo_url": "https://your-logo-url.com/logo.png",
    "footer_text": "© 2025 Your Company",
    "company_mobile": "+91XXXXXXXXXX",
    "company_name": "Your Company Name",
    "company_email": "info@yourcompany.com",
    "company_bio": "Your company description"
}
```

Also update in `frontend/src/config.js`

### Change Report Price

Edit `frontend/src/pages/BirthDetails.js`:
```javascript
// Line with amount
amount: 499,  // Change to your price
```

### Change Admin Credentials

Edit `backend/.env`:
```
ADMIN_EMAIL="youradmin@email.com"
ADMIN_PASSWORD="your_secure_password"
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  id: String,
  name: String,
  email: String,
  mobile: String,
  password: String (hashed),
  is_admin: Boolean,
  created_at: DateTime
}
```

### Orders Collection
```javascript
{
  id: String,
  user_id: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  status: String, // "created", "paid", "failed"
  birth_data: Object,
  created_at: DateTime
}
```

### Reports Collection
```javascript
{
  id: String,
  user_id: String,
  order_id: String,
  birth_data: Object,
  api_response: Object,
  status: String, // "pending", "processing", "completed", "failed"
  created_at: DateTime
}
```

---

## 📖 User Flow

```
1. User visits homepage
   ↓
2. Clicks "Get Started" → Registers
   ↓
3. Fills birth details form
   ↓
4. Clicks "Proceed to Payment"
   ↓
5. Razorpay modal opens → Makes payment
   ↓
6. Payment verified
   ↓
7. Report generated via DivineAPI
   ↓
8. User redirected to Report View
   ↓
9. Report saved in Dashboard
```

---

## 🤝 Support

**Contact:**
- Email: info@AstroMate24.com
- Phone: +919588369001
- Website: https://AstroMate24.com

**Technical Issues:**
- Check logs in backend terminal
- Check browser console for frontend errors
- Verify all environment variables are set correctly

---

## 📄 License

Proprietary - AstroMate24

---

## ⚠️ Important Notes

1. **Placeholder Credentials**: Current setup uses "XXXXX" for Razorpay and DivineAPI. Replace with real keys for production.

2. **Security**: 
   - Change JWT_SECRET in production
   - Use HTTPS in production
   - Change admin password
   - Enable rate limiting

3. **Testing**: Always test with Razorpay test keys before going live

4. **Backup**: Regular MongoDB backups recommended

---

**Last Updated**: January 2025
**Version**: 1.0.0

---

## 🎉 Quick Start (TL;DR)

```bash
# 1. Start MongoDB
mongod

# 2. Backend (Terminal 1)
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# 3. Frontend (Terminal 2)
cd frontend
npm install
npm start

# 4. Open browser: http://localhost:3000
# 5. Test login: admin@astromate24.com / admin123
```

---

Made with ❤️ by AstroMate24 Team
