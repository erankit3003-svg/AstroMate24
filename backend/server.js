import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { config, COMPANY_DETAILS } from './config.js';
import { db } from './firebase.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payments.js';
import reportRoutes from './routes/reports.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigins.split(','),
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'AstroMate24 API',
    company: COMPANY_DETAILS
  });
});

app.get('/api/company', (req, res) => {
  res.json(COMPANY_DETAILS);
});

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// Create admin user on startup
async function createAdminUser() {
  try {
    const usersRef = db.collection('users');
    const adminSnapshot = await usersRef.where('email', '==', config.admin.email).get();
    
    if (adminSnapshot.empty) {
      const hashedPassword = await bcrypt.hash(config.admin.password, 10);
      await usersRef.add({
        name: 'Admin',
        email: config.admin.email,
        mobile: '+919588369001',
        password: hashedPassword,
        isAdmin: true,
        createdAt: new Date().toISOString()
      });
      console.log('✅ Admin user created');
    }
  } catch (error) {
    console.error('❌ Admin user creation error:', error);
  }
}

// Start server
const PORT = config.port;
app.listen(PORT, async () => {
  console.log(`✨ AstroMate24 Backend running on port ${PORT}`);
  await createAdminUser();
});

export default app;
