import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import axios from 'axios';
import { db } from '../firebase.js';
import { config } from '../config.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const razorpay = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret
});

// Create order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const { amount, birth_data } = req.body;
    
    // Create Razorpay order
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `order_${Date.now()}`
    };
    
    const razorpayOrder = await razorpay.orders.create(options);
    
    // Save order to Firestore
    const orderRef = await db.collection('orders').add({
      userId: req.user.id,
      razorpayOrderId: razorpayOrder.id,
      amount,
      status: 'created',
      birthData: birth_data,
      createdAt: new Date().toISOString()
    });
    
    res.json({
      order_id: orderRef.id,
      razorpay_order_id: razorpayOrder.id,
      amount,
      key: config.razorpay.keyId
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(400).json({
      error: 'Failed to create payment order',
      message: error.message
    });
  }
});

// Verify payment
router.post('/verify', authenticate, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = req.body;
    
    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(sign.toString())
      .digest('hex');
    
    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }
    
    // Update order
    const orderRef = db.collection('orders').doc(order_id);
    const orderDoc = await orderRef.get();
    
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    await orderRef.update({
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: 'paid',
      paidAt: new Date().toISOString()
    });
    
    // Generate report
    const orderData = orderDoc.data();
    const reportId = await generateReport(req.user.id, order_id, orderData.birthData);
    
    res.json({
      success: true,
      message: 'Payment verified successfully',
      report_id: reportId
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Generate astrology report
async function generateReport(userId, orderId, birthData) {
  const reportRef = await db.collection('reports').add({
    userId,
    orderId,
    birthData,
    status: 'processing',
    createdAt: new Date().toISOString()
  });
  
  try {
    // Call DivineAPI
    const response = await axios.post(config.divineApi.url, {
      api_key: config.divineApi.key,
      ...birthData
    });
    
    // Update report with API response
    await reportRef.update({
      apiResponse: response.data,
      status: 'completed',
      completedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Report generation error:', error);
    await reportRef.update({
      status: 'failed',
      error: error.message
    });
  }
  
  return reportRef.id;
}

export default router;
