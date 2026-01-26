# AstroMate24 - Vedic Astrology Report Platform

A complete production-ready astrology website that generates personalized Vedic astrology reports with Razorpay payment integration.

## 🌟 Features

### User Features
- **User Registration & Login** - JWT-based authentication
- **Birth Details Form** - Comprehensive form with location coordinates
- **Razorpay Payment Integration** - Secure payment processing
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

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Razorpay** - Payment gateway
- **DivineAPI** - Astrology report generation
- **Python Libraries**: passlib, python-jose, httpx, razorpay

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Shadcn/UI** - Component library
- **Axios** - HTTP client
- **React Router** - Navigation
- **Sonner** - Toast notifications

## 🔐 Environment Variables

### Backend (.env)
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
JWT_SECRET="your-secret-key-change-in-production"
RAZORPAY_KEY_ID="XXXXX"
RAZORPAY_KEY_SECRET="XXXXX"
DIVINE_API_KEY="XXXXX"
ADMIN_EMAIL="admin@astromate24.com"
ADMIN_PASSWORD="admin123"
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-domain.com
```

## 🚀 Getting Started

### Default Admin User
- Email: admin@astromate24.com
- Password: admin123
(Auto-created on first startup)

## 💳 Payment Flow

1. User fills birth details form
2. Backend creates Razorpay order
3. Frontend opens Razorpay checkout modal
4. User completes payment
5. Payment verification via signature
6. Report generated via DivineAPI
7. Report saved to database
8. User redirected to report view

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

### Reports
- `GET /api/reports/my-reports` - Get user reports
- `GET /api/reports/{report_id}` - Get specific report

### Admin (requires admin role)
- `GET /api/admin/users` - List all users
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/reports` - List all reports

## 🐛 Known Limitations

- Razorpay and DivineAPI use placeholder credentials ("XXXXX")
- Actual payment processing requires valid Razorpay keys
- Report generation requires valid DivineAPI key
- Configure real credentials in .env for production

## 🤝 Support

For support, email info@AstroMate24.com or call +919588369001
