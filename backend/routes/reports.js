import express from 'express';
import { db } from '../firebase.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user's reports
router.get('/my-reports', authenticate, async (req, res) => {
  try {
    const reportsSnapshot = await db.collection('reports')
      .where('userId', '==', req.user.id)
      .orderBy('createdAt', 'desc')
      .get();
    
    const reports = [];
    reportsSnapshot.forEach(doc => {
      reports.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// Get specific report
router.get('/:reportId', authenticate, async (req, res) => {
  try {
    const reportDoc = await db.collection('reports').doc(req.params.reportId).get();
    
    if (!reportDoc.exists) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    const reportData = reportDoc.data();
    
    // Check access
    if (reportData.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json({
      id: reportDoc.id,
      ...reportData
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

export default router;
