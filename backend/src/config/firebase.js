import admin from 'firebase-admin';

// Load service account key from environment
const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

// Initialize Firebase Admin only if credentials are provided
const isInitialized = () => {
  if (!serviceAccount.project_id || !serviceAccount.private_key?.includes('PRIVATE KEY')) {
    console.warn('⚠️  Firebase Admin credentials not configured. Set FIREBASE_PROJECT_ID and FIREBASE_PRIVATE_KEY in .env');
    return false;
  }
  return true;
};

if (isInitialized() && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else if (!admin.apps.length) {
  // Initialize without credentials for development/testing
  // This allows the server to start but Firestore operations will fail
  console.warn('⚠️  Starting in development mode without Firebase Admin credentials');
}

// Initialize services
export const db = admin.apps.length ? admin.firestore() : null;
export const storage = admin.apps.length ? admin.storage() : null;
export const auth = admin.apps.length ? admin.auth() : null;
export { admin };

// Export default for convenience
export default admin;
