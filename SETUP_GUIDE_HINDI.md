# AstroMate24 - Local Setup Guide (हिंदी में)

## 🎯 ज़रूरी चीज़ें (Prerequisites)

सबसे पहले ये सब install करें:

### 1. Python 3.11 या उससे ऊपर
- **Windows**: https://www.python.org/downloads/ से download करें
- **Installation के समय**: "Add Python to PATH" checkbox ज़रूर check करें
- **Verify करें**: 
  ```bash
  python --version
  # Output: Python 3.11.x
  ```

### 2. Node.js 18 या उससे ऊपर
- **Download**: https://nodejs.org/ (LTS version)
- **Verify करें**:
  ```bash
  node --version
  npm --version
  ```

### 3. MongoDB
- **Windows**: https://www.mongodb.com/try/download/community
  - Download MongoDB Community Server
  - Installation के बाद automatically service start हो जाती है
  
- **macOS**: 
  ```bash
  # Homebrew से install करें
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```

- **Linux (Ubuntu/Debian)**:
  ```bash
  sudo apt-get install -y mongodb
  sudo systemctl start mongodb
  sudo systemctl enable mongodb
  ```

- **Verify करें**:
  ```bash
  mongosh
  # MongoDB shell open होनी चाहिए
  ```

---

## 📥 Step 1: Project Download करें

### Option A: ZIP File से
1. Project का ZIP file download करें
2. Extract करें किसी folder में
3. Terminal/Command Prompt open करें
4. Project folder में जाएं:
   ```bash
   cd path/to/astromate24
   ```

### Option B: Git से (अगर Git installed है)
```bash
git clone <repository-url>
cd astromate24
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Backend Folder में जाएं
```bash
cd backend
```

### 2.2 Virtual Environment बनाएं (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

✅ **Success Sign**: आपके terminal में `(venv)` दिखना चाहिए

### 2.3 Dependencies Install करें
```bash
pip install -r requirements.txt
```

⏱️ **समय लगेगा**: 2-3 minutes

### 2.4 Environment Variables Setup

**`.env` file बनाएं** backend folder में:

**Windows (Notepad से):**
```bash
notepad .env
```

**macOS/Linux:**
```bash
nano .env
# या
touch .env
```

**इस content को paste करें:**
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="astromate24_db"
CORS_ORIGINS="http://localhost:3000"

JWT_SECRET="apna-secret-key-yahan-dalein-production-me-change-karein"

# Razorpay Keys (abhi placeholder hain)
RAZORPAY_KEY_ID="XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"

# DivineAPI Key (abhi placeholder hai)
DIVINE_API_KEY="XXXXX"

# Admin Credentials
ADMIN_EMAIL="admin@astromate24.com"
ADMIN_PASSWORD="admin123"
```

**Save करें**: Ctrl+S (Windows) या Cmd+S (macOS)

### 2.5 Backend Server Start करें

```bash
# Backend folder में ho aur venv activate ho
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

✅ **Success Messages दिखने चाहिए:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001
INFO:     Started reloader process
INFO:     Application startup complete.
```

🌐 **Test करें**: Browser में खोलें: http://localhost:8001/api/

**दिखना चाहिए:**
```json
{
  "message": "AstroMate24 API",
  "company": {...}
}
```

⚠️ **इस terminal को बंद मत करें!** Backend चलता रहना चाहिए।

---

## 🎨 Step 3: Frontend Setup

### 3.1 नया Terminal/Command Prompt खोलें

**Windows**: नया CMD window खोलें
**macOS/Linux**: नया Terminal tab खोलें

### 3.2 Frontend Folder में जाएं
```bash
cd frontend
# Or पूरा path:
# cd path/to/astromate24/frontend
```

### 3.3 Dependencies Install करें

**Option A: NPM से**
```bash
npm install
```

**Option B: Yarn से (अगर install है)**
```bash
yarn install
```

⏱️ **समय लगेगा**: 3-5 minutes

### 3.4 Environment Variables Setup

**`.env` file बनाएं** frontend folder में:

```bash
# Windows
notepad .env

# macOS/Linux
nano .env
```

**इस content को paste करें:**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
ENABLE_HEALTH_CHECK=false
```

**Save करें**

### 3.5 Frontend Server Start करें

```bash
npm start
# या
yarn start
```

✅ **Success होने पर:**
- Browser automatically खुलेगा
- Ya manually खोलें: http://localhost:3000

🎉 **Website दिखनी चाहिए!**

---

## ✅ Step 4: Verify Setup

### 1. Homepage Check करें
- URL: http://localhost:3000
- "15 Years of Cosmic Blueprint" heading दिखनी चाहिए
- Premium light theme (gold aur indigo colors)

### 2. Registration Test करें
```
1. "Get Started" button click करें
2. Form fill करें:
   - Name: Test User
   - Email: test@example.com
   - Mobile: +919999999999
   - Password: test123
3. "Register" click करें
4. Dashboard खुलना चाहिए
```

### 3. Admin Panel Test करें
```
1. Logout करें (top-right)
2. "Login" click करें
3. Admin credentials:
   - Email: admin@astromate24.com
   - Password: admin123
4. Login करने पर "Admin" button header में दिखना चाहिए
5. Admin Panel खोलें
6. Users, Orders, Reports tabs दिखने चाहिए
```

---

## 🔑 API Keys Setup (Production के लिए)

### Razorpay Keys कैसे पाएं?

#### Step 1: Razorpay Account बनाएं
1. जाएं: https://dashboard.razorpay.com/signup
2. Email aur mobile verify करें
3. Business details fill करें

#### Step 2: Test Keys निकालें
1. Dashboard में जाएं
2. Left sidebar में "Settings" click करें
3. "API Keys" section में जाएं
4. "Generate Test Key" click करें
5. **Key ID** aur **Key Secret** copy करें

#### Step 3: Backend में Update करें
1. `backend/.env` file खोलें
2. Update करें:
   ```env
   RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
   RAZORPAY_KEY_SECRET="your_secret_key_here"
   ```
3. Backend server restart करें (Ctrl+C फिर फिर से start)

#### Step 4: Test Payment करें
- **Test Card Number**: 4111 1111 1111 1111
- **CVV**: कोई भी 3 digits (जैसे 123)
- **Expiry**: कोई भी future date (जैसे 12/25)
- **Name**: कुछ भी

### DivineAPI Key कैसे पाएं?

1. Visit करें: https://divineapi.com/
2. Account create करें
3. API key request करें
4. Key मिलने पर `backend/.env` में update करें:
   ```env
   DIVINE_API_KEY="your_divine_api_key_here"
   ```

---

## 🐛 Common Problems & Solutions

### Problem 1: MongoDB नहीं चल रहा
**Error**: 
```
MongoServerError: connect ECONNREFUSED
```

**Solution**:
```bash
# Check करें MongoDB running है या नहीं
mongosh

# अगर error आए तो start करें:

# Windows:
# Services में जाकर "MongoDB" service start करें
# या Run (Win+R) → services.msc

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongodb
```

### Problem 2: Port Already in Use
**Error**:
```
Port 8001 is already in use
```

**Solution Windows**:
```bash
# Process find करें
netstat -ano | findstr :8001

# PID note करें aur kill करें
taskkill /PID <PID_NUMBER> /F
```

**Solution macOS/Linux**:
```bash
# Process kill करें
lsof -ti:8001 | xargs kill -9
```

### Problem 3: Module Not Found (Python)
**Error**:
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution**:
```bash
# Virtual environment activate hai ya nahi check करें
# Terminal में (venv) दिखना चाहिए

# फिर से install करें
pip install -r requirements.txt
```

### Problem 4: Frontend Backend se Connect नहीं हो रहा
**Error**: Console में "Network Error" या "Cannot connect to backend"

**Solution**:
1. **Check करें** backend server chal raha hai (http://localhost:8001/api/)
2. **Verify करें** `frontend/.env` में `REACT_APP_BACKEND_URL=http://localhost:8001`
3. **Verify करें** `backend/.env` में `CORS_ORIGINS="http://localhost:3000"`
4. **Restart करें** दोनों servers

### Problem 5: npm install Fail हो रहा
**Error**: "Permission denied" या "EACCESS"

**Solution**:
```bash
# Cache clear करें
npm cache clean --force

# फिर से try करें
npm install

# अगर फिर भी error हो:
# Administrator/sudo se run करें (not recommended)
# या Node.js reinstall करें
```

### Problem 6: Payment काम नहीं कर रहा
**Expected Behavior**: Placeholder keys ("XXXXX") से payment fail होगा

**Solution**:
1. Razorpay test keys डालें (ऊपर देखें)
2. Backend restart करें
3. Payment फिर से try करें

---

## 📂 Folder Structure Samjhein

```
astromate24/
│
├── backend/                      # Python FastAPI Backend
│   ├── server.py                # Main file - सारे APIs यहां हैं
│   ├── models.py                # Database models (User, Order, Report)
│   ├── auth.py                  # Login/Register logic
│   ├── config.py                # Company details & settings
│   ├── .env                     # 🔐 Secret keys (इसे share मत करें)
│   └── requirements.txt         # Python packages की list
│
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── pages/               # सारे pages
│   │   │   ├── Home.js         # Landing page (17 features)
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Register.js     # Signup page
│   │   │   ├── BirthDetails.js # Birth form + Payment
│   │   │   ├── Dashboard.js    # User dashboard
│   │   │   ├── ReportView.js   # Report देखने के लिए
│   │   │   └── AdminPanel.js   # Admin panel
│   │   ├── components/          # Reusable components
│   │   │   ├── Header.js       # Top navigation
│   │   │   ├── Footer.js       # Bottom footer
│   │   │   └── ui/             # Shadcn components (Button, Input, etc)
│   │   ├── config.js           # Frontend settings
│   │   └── App.js              # Main app file
│   ├── .env                     # Backend URL यहां है
│   └── package.json             # Node packages की list
│
└── README.md                     # Ye documentation file
```

---

## 🎯 Testing Checklist

### ✅ Basic Tests
- [ ] Backend http://localhost:8001/api/ खुल रहा है
- [ ] Frontend http://localhost:3000 खुल रहा है
- [ ] Registration form काम कर रहा है
- [ ] Login काम कर रहा है
- [ ] Dashboard खुल रहा है
- [ ] Admin panel (admin@astromate24.com) access हो रहा है

### ✅ Feature Tests
- [ ] Birth details form सारे fields show कर रहा है
- [ ] Payment button click हो रहा है
- [ ] Header navigation काम कर रहा है
- [ ] Logout functionality काम कर रही है
- [ ] Design सही दिख रहा है (gold/indigo colors)

---

## 💡 Important Tips

### Development के लिए:
1. **2 Terminals खुले रखें**: एक backend के लिए, एक frontend के लिए
2. **MongoDB चालू रखें**: Server restart के बाद भी
3. **Browser Console देखें**: Errors के लिए (F12 key)
4. **Backend Logs देखें**: Terminal में errors दिखते हैं

### Code Changes के बाद:
- **Frontend changes**: Automatically reload होता है
- **Backend changes**: Automatically reload होता है (--reload flag की वजह से)
- **.env changes**: Backend restart करना पड़ेगा

### Data Clear करने के लिए:
```bash
# MongoDB में जाएं
mongosh

# Database select करें
use astromate24_db

# Collections clear करें
db.users.deleteMany({})
db.orders.deleteMany({})
db.reports.deleteMany({})

# Exit
exit
```

---

## 🚀 Next Steps (Production के लिए)

### 1. Real API Keys Setup करें
- ✅ Razorpay test keys (development)
- ✅ DivineAPI key
- ⚠️ Production keys use करें live जाने से पहले

### 2. Security
- 🔒 JWT_SECRET change करें
- 🔒 Admin password change करें
- 🔒 HTTPS enable करें

### 3. Customization
- 🎨 Company logo update करें
- 🎨 Colors customize करें
- 📱 Company details update करें

### 4. Deployment
- ☁️ Backend: Railway, Heroku, या AWS
- ☁️ Frontend: Vercel, Netlify
- 💾 Database: MongoDB Atlas (cloud)

---

## 📞 Help Chahiye?

### Quick Commands (Copy-Paste)

**Backend Start:**
```bash
cd backend
source venv/bin/activate  # macOS/Linux
# या
venv\Scripts\activate     # Windows
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend Start:**
```bash
cd frontend
npm start
```

**MongoDB Start:**
```bash
# Windows: Services se start karein
# macOS:
brew services start mongodb-community
# Linux:
sudo systemctl start mongodb
```

**Check if Running:**
```bash
# Backend check
curl http://localhost:8001/api/

# MongoDB check
mongosh
```

---

## 🎓 Learning Resources

### FastAPI सीखने के लिए:
- https://fastapi.tiangolo.com/ (Official Docs)

### React सीखने के लिए:
- https://react.dev/ (Official Docs)

### MongoDB सीखने के लिए:
- https://www.mongodb.com/docs/ (Official Docs)

---

**सवाल हो तो पूछें!** 😊

**Last Updated**: January 2025
