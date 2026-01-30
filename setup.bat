@echo off
echo 🚀 AstroMate24 - One-Click Setup Starting...
echo.

:: Check Node.js
echo 📦 Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js found
node --version

:: Backend Setup
echo.
echo 🔧 Setting up Backend...
cd backend

echo 📥 Installing backend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

:: Create .env if not exists
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please update .env file with your Firebase credentials
)

cd ..

:: Frontend Setup
echo.
echo 🎨 Setting up Frontend...
cd frontend

echo 📥 Installing frontend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

:: Create .env if not exists
if not exist .env (
    echo 📝 Creating .env file...
    echo REACT_APP_BACKEND_URL=http://localhost:8001 > .env
)

cd ..

:: Success
echo.
echo ✅ Setup Complete!
echo.
echo 📚 Next Steps:
echo 1. Update backend/.env with your Firebase credentials
echo 2. Run: npm run dev (to start both servers)
echo 3. Open: http://localhost:3000
echo.
echo For detailed setup guide, check README.md
echo.
pause
