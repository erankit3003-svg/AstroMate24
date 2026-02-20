<<<<<<< HEAD
# Here are your Instructions
Perfect! Ab main summary de deta hoon:

## ✅ Complete Setup Documentation Ready!

Maine aapke liye **3 detailed guide files** bana di hain:

### 📄 **README.md** (English - Complete Guide)
- Full project documentation
- Prerequisites installation steps
- Backend & Frontend setup with code
- API keys setup (Razorpay & DivineAPI)
- Common issues & solutions
- Database schema
- Deployment guide
- Customization options
- Testing checklist

### 📄 **SETUP_GUIDE_HINDI.md** (Hindi - Detailed Guide)
- सारे steps हिंदी में
- Screenshots जैसे detailed instructions
- Common problems aur solutions
- Testing checklist
- Tips & tricks
- Quick commands
- MongoDB, Python, Node.js setup

### 📄 **QUICK_SETUP.md** (Quick Reference)
- 5-minute quick start
- Copy-paste commands
- One-command setup
- Common issues quick fix
- Production checklist

---

## 🎯 Local Setup Summary (Hindi):

### **Step 1: Install करें**
```
✓ Python 3.11+
✓ Node.js 18+
✓ MongoDB
```

### **Step 2: Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
# .env file banao
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### **Step 3: Frontend**
```bash
cd frontend
npm install
# .env file banao
npm start
```

### **Step 4: Test करें**
```
✓ http://localhost:3000 → Homepage
✓ Register → test@example.com
✓ Admin Login → admin@astromate24.com / admin123
=======
# 🌟 AstroMate24 - Vedic Astrology Platform

**Simple, Modern & Easy to Deploy** | Firebase + Node.js + React

Complete astrology website jo personalized Vedic astrology reports generate karta hai with Razorpay payment integration.

---

## ✨ Features

### 🎯 User Features
- ✅ User Registration & Login (JWT Auth)
- ✅ Birth Details Form (Complete Astrological Inputs)
- ✅ Razorpay Payment Integration (₹799 per report)
- ✅ Instant Report Generation via DivineAPI
- ✅ User Dashboard (All Reports)
- ✅ Detailed Report View (17 Sections)

### 👨‍💼 Admin Features
- ✅ Admin Panel (Complete Management)
- ✅ View All Users
- ✅ View All Orders & Payments
- ✅ View All Generated Reports

### 📊 17 Report Sections
1. Personal Introduction
2. Astrological Blueprint
3. Planetary Positions
4. Horoscope Charts
5. House Cusps Analysis
6. Divisional Charts (Vargas)
7. Relationship Compatibility
8. KP Astrology Insights
9. Ascendant Report
10. Bhava Kundli
11. Vimshottari Dasha (15 Years)
12. Yogini Dasha
13. Sadhesati Analysis
14. Kalsarpa Dosha
15. Manglik Analysis
16. Planet Profiles
17. Gemstone Suggestions

---

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- Firebase Firestore (Database)
- JWT Authentication
- Razorpay Integration
- DivineAPI Integration

**Frontend:**
- React 19
- Tailwind CSS (Premium Light Theme)
- React Router v7
- Axios
- Shadcn/UI Components

---

## 🚀 One-Click Setup (Super Easy!)

### Prerequisites
Sirf ye 2 cheezein chahiye:
1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **Firebase Account** - [Free Setup](https://firebase.google.com/)

### Step 1: Firebase Setup (5 minutes)

#### 1.1 Create Firebase Project
```
1. Go to: https://console.firebase.google.com/
2. Click "Add Project"
3. Enter project name: astromate24
4. Disable Google Analytics (optional)
5. Click "Create Project"
```

#### 1.2 Enable Firestore Database
```
1. In Firebase Console, click "Firestore Database"
2. Click "Create Database"
3. Select "Start in production mode"
4. Choose location (asia-south1 for India)
5. Click "Enable"
```

#### 1.3 Get Service Account Key
```
1. Go to Project Settings (⚙️ icon)
2. Go to "Service Accounts" tab
3. Click "Generate new private key"
4. Download JSON file
5. Keep it safe - we'll use it in next step
```

### Step 2: Run One-Click Setup

#### For Windows:
```bash
# Double-click setup.bat
# Or run in CMD:
setup.bat
```

#### For Mac/Linux:
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Step 3: Configure Firebase Credentials

Open `backend/.env` and add your Firebase credentials from the downloaded JSON:

```env
# Copy from your Firebase JSON file
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Keep these as is for now
PORT=8001
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=change-this-secret-key-in-production

RAZORPAY_KEY_ID=XXXXX
RAZORPAY_KEY_SECRET=XXXXX
DIVINE_API_KEY=XXXXX

ADMIN_EMAIL=admin@astromate24.com
ADMIN_PASSWORD=admin123
```

### Step 4: Start the Application

```bash
# One command to start everything!
npm run dev
```

✅ **Done!** Open http://localhost:3000 in your browser!

---

## 📖 Detailed Manual Setup (if automatic fails)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Firebase credentials

# Start backend
npm run dev
```

Backend will run on: http://localhost:8001

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

Frontend will open automatically at: http://localhost:3000

---

## 🔑 API Keys Setup

### 1. Razorpay Keys (For Payments)

**Free Test Mode:**
```
1. Signup: https://dashboard.razorpay.com/signup
2. Go to Settings → API Keys
3. Generate Test Keys
4. Copy Key ID & Secret to backend/.env:
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
```

**Test Payment:**
- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: 12/25

### 2. DivineAPI Key (For Astrology Reports)

```
1. Visit: https://divineapi.com/
2. Create Account
3. Get API Key
4. Add to backend/.env:
   DIVINE_API_KEY=your_key_here
>>>>>>> 15d5be0c64316803beab57d3b097dd89a0bab9df
```

---

<<<<<<< HEAD
## 📚 Files Available:

1. **/app/README.md** - Complete English documentation
2. **/app/SETUP_GUIDE_HINDI.md** - Complete Hindi guide
3. **/app/QUICK_SETUP.md** - Quick reference
4. **/app/PROJECT_DOCUMENTATION.md** - Technical docs

Sab kuch step-by-step likha hai with commands! 🎉

Koi aur help chahiye setup me? Ya koi specific section detail me samjhau? 😊
=======
## 📂 Project Structure

```
astromate24/
│
├── backend/                    # Node.js + Express + Firebase
│   ├── routes/
│   │   ├── auth.js           # Login/Register APIs
│   │   ├── payments.js       # Razorpay Integration
│   │   ├── reports.js        # Report Management
│   │   └── admin.js          # Admin APIs
│   ├── middleware/
│   │   └── auth.js           # JWT Middleware
│   ├── server.js             # Main Server
│   ├── firebase.js           # Firebase Config
│   ├── config.js             # App Config
│   ├── .env                  # Environment Variables 🔐
│   └── package.json
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── pages/            # All Pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── BirthDetails.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ReportView.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── components/       # Reusable Components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ui/          # Shadcn Components
│   │   ├── utils/
│   │   ├── config.js
│   │   ├── App.js
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── setup.sh                   # Mac/Linux Setup Script
├── setup.bat                  # Windows Setup Script
├── package.json              # Root Package (Run Scripts)
└── README.md                 # This File
```

---

## 🎨 Design System

**Theme:** Celestial Light (Premium)

**Colors:**
- Primary (Gold): `#B49248`
- Secondary (Indigo): `#2A2B5F`
- Background: `#FDFBF7`

**Typography:**
- Headings: Playfair Display
- Body: Manrope

---

## 🧪 Testing

### Test Admin Login
```
Email: admin@astromate24.com
Password: admin123
```

### Test User Registration
```
1. Click "Get Started"
2. Fill form with any details
3. Register & Login
```

### Test Flow
```
1. Register → 2. Login → 3. Fill Birth Details → 
4. Payment (Test Mode) → 5. View Report
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Firebase Error
```
Error: Firebase initialization failed
```
**Solution:**
- Check FIREBASE_PROJECT_ID in .env
- Check FIREBASE_PRIVATE_KEY format (must include \\n)
- Verify Firebase Console has Firestore enabled

### Issue 2: Port Already in Use
```
Error: Port 8001 is already in use
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8001 | xargs kill -9
```

### Issue 3: Payment Not Working
```
Error: Invalid Razorpay credentials
```
**Solution:**
- Expected with placeholder keys "XXXXX"
- Get real test keys from Razorpay
- Update backend/.env
- Restart backend

### Issue 4: Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## 📝 Environment Variables

### Backend (.env)
```env
# Firebase (Required)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key-with-newlines"
FIREBASE_CLIENT_EMAIL=your-service-account-email

# Server
PORT=8001
CORS_ORIGINS=http://localhost:3000

# Auth
JWT_SECRET=your-secret-key

# Razorpay (Optional for testing)
RAZORPAY_KEY_ID=XXXXX
RAZORPAY_KEY_SECRET=XXXXX

# DivineAPI (Optional for testing)
DIVINE_API_KEY=XXXXX

# Admin
ADMIN_EMAIL=admin@astromate24.com
ADMIN_PASSWORD=admin123
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 🚀 Deployment Guide

### Deploy Backend (Railway/Render)

**Railway.app:**
```
1. Push code to GitHub
2. Go to railway.app
3. New Project → Deploy from GitHub
4. Select repository
5. Add environment variables from backend/.env
6. Deploy!
```

**Render.com:**
```
1. Go to render.com
2. New → Web Service
3. Connect GitHub repo
4. Build Command: cd backend && npm install
5. Start Command: cd backend && npm start
6. Add environment variables
7. Deploy!
```

### Deploy Frontend (Vercel/Netlify)

**Vercel:**
```
1. Go to vercel.com
2. New Project → Import from GitHub
3. Root Directory: frontend
4. Framework: Create React App
5. Add env: REACT_APP_BACKEND_URL=<backend-url>
6. Deploy!
```

---

## 📚 API Documentation

### Authentication APIs
```
POST /api/auth/register    - Create account
POST /api/auth/login       - Login user
GET  /api/auth/me          - Get current user (auth required)
```

### Payment APIs
```
POST /api/payments/create-order  - Create Razorpay order
POST /api/payments/verify        - Verify payment
```

### Report APIs
```
GET /api/reports/my-reports      - Get user reports
GET /api/reports/:reportId       - Get specific report
```

### Admin APIs
```
GET /api/admin/users    - List all users
GET /api/admin/orders   - List all orders
GET /api/admin/reports  - List all reports
```

---

## 🎯 Customization

### Change Company Details
Edit `backend/config.js`:
```javascript
export const COMPANY_DETAILS = {
  company_name: 'Your Company',
  company_email: 'info@yourcompany.com',
  // ... other details
};
```

### Change Report Price
Edit `frontend/src/pages/BirthDetails.jsx`:
```javascript
amount: 799,  // Change to your price
```

### Change Theme Colors
Edit `frontend/src/index.css`:
```css
--primary: 41 42% 49%;     /* Your primary color */
--secondary: 239 43% 27%;  /* Your secondary color */
```

---

## 💡 Quick Commands

```bash
# Setup everything
npm run setup

# Start both servers
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm start
```

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Change Admin password
- [ ] Use environment variables (never commit .env)
- [ ] Enable Firebase security rules
- [ ] Use HTTPS in production
- [ ] Add rate limiting
- [ ] Sanitize user inputs

---

## 📖 Learning Resources

- **Firebase:** https://firebase.google.com/docs
- **Express.js:** https://expressjs.com/
- **React:** https://react.dev/
- **Razorpay:** https://razorpay.com/docs/

---

## 🆘 Need Help?

**Check logs:**
```bash
# Backend errors: Terminal where backend is running
# Frontend errors: Browser Console (F12)
```

**Test backend:**
```bash
curl http://localhost:8001/api/
```

**Reset Firestore data:**
Go to Firebase Console → Firestore → Delete collections manually

---

## 📄 License

Proprietary - AstroMate24

---

## 🎉 Quick Start Summary

```bash
# 1. Setup (One-time)
npm run setup

# 2. Configure Firebase
# Edit backend/.env with Firebase credentials

# 3. Start
npm run dev

# 4. Open
http://localhost:3000

# 5. Test Login
admin@astromate24.com / admin123
```

---

**🌟 Setup Time:** 5-10 minutes  
**💪 Difficulty:** Easy  
**📱 Status:** Production Ready

---

Made with ❤️ for AstroMate24 | Version 2.0.0 | Firebase Edition
>>>>>>> 15d5be0c64316803beab57d3b097dd89a0bab9df
