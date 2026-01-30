import admin from 'firebase-admin';
import { config } from './config.js';

// Initialize Firebase Admin
const serviceAccount = {
  type: 'service_account',
  project_id: config.firebase.projectId,
  private_key: config.firebase.privateKey,
  client_email: config.firebase.clientEmail
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
