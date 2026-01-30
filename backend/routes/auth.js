import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../firebase.js';
import { config } from '../config.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    
    // Check if user exists
    const usersRef = db.collection('users');
    const existingUser = await usersRef.where('email', '==', email).get();
    
    if (!existingUser.empty) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const userRef = await usersRef.add({
      name,
      email,
      mobile,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date().toISOString()
    });
    
    const userId = userRef.id;
    
    // Generate token
    const token = jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiration
    });
    
    res.json({
      token,
      user: {
        id: userId,
        name,
        email,
        mobile,
        isAdmin: false
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    
    if (snapshot.empty) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    
    // Verify password
    const validPassword = await bcrypt.compare(password, userData.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: userDoc.id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration
    });
    
    res.json({
      token,
      user: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        isAdmin: userData.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authenticate, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    mobile: req.user.mobile,
    isAdmin: req.user.isAdmin
  });
});

export default router;
