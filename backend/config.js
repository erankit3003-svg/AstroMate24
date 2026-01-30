import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 8001,
  corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiration: '7d',
  
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  },
  
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'XXXXX',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'XXXXX'
  },
  
  divineApi: {
    key: process.env.DIVINE_API_KEY || 'XXXXX',
    url: 'https://reports.divineapi.com/reports'
  },
  
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@astromate24.com',
    password: process.env.ADMIN_PASSWORD || 'admin123'
  }
};

export const COMPANY_DETAILS = {
  company_url: 'https://AstroMate24.com',
  logo_url: 'https://www.astromate24.com/wp-content/uploads/2025/04/cropped-logopng-1.png',
  footer_text: '© 2025 AstroMate24',
  company_mobile: '+919588369001',
  company_name: 'AstroMate24',
  company_email: 'info@AstroMate24.com',
  company_bio: 'AstroMate24 delivers precise cosmic insights through advanced Vedic astrology.'
};
