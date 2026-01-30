#!/bin/bash

echo "🚀 AstroMate24 - One-Click Setup Starting..."
echo ""

# Colors
GREEN='\033[0.32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "${RED}❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/${NC}"
    exit 1
fi
echo "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Backend Setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

# Install dependencies
echo "📥 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "${RED}❌ Backend installation failed${NC}"
    exit 1
fi
echo "${GREEN}✅ Backend dependencies installed${NC}"

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "${YELLOW}⚠️  Please update .env file with your Firebase credentials${NC}"
fi

cd ..

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd frontend

# Install dependencies
echo "📥 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "${RED}❌ Frontend installation failed${NC}"
    exit 1
fi
echo "${GREEN}✅ Frontend dependencies installed${NC}"

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env
fi

cd ..

# Success
echo ""
echo "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "📚 Next Steps:"
echo "1. Update backend/.env with your Firebase credentials"
echo "2. Run: npm run dev (to start both servers)"
echo "3. Open: http://localhost:3000"
echo ""
echo "For detailed setup guide, check README.md"
