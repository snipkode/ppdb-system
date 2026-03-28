import { initializeApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence, setLogLevel } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjsr4LTeWcc0CwLo2pWRVGpcqY2dR2Uks",
  authDomain: "x-ppdb.firebaseapp.com",
  projectId: "x-ppdb",
  storageBucket: "x-ppdb.firebasestorage.app",
  messagingSenderId: "1024737155564",
  appId: "1:1024737155564:web:6a2ab3d6d6f52c3de708c9",
  measurementId: "G-2811PD4BD6"
};

// Debug mode - set to true untuk enable debug logging
const DEBUG_MODE = import.meta.env.DEV;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable debug logging if in development mode
if (DEBUG_MODE) {
  console.log('🔥 Firebase initialized');
  console.log('📝 Config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
  });

  // Enable Firebase debug logging
  setLogLevel('debug');
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Set auth persistence to LOCAL (default)
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      if (DEBUG_MODE) {
        console.log('✅ Auth persistence enabled (LOCAL)');
      }
    })
    .catch((error) => {
      console.error('❌ Auth persistence error:', error);
    });
}

// Enable Firestore multi-tab persistence (for development)
if (DEBUG_MODE && typeof window !== 'undefined') {
  enableMultiTabIndexedDbPersistence(db)
    .then(() => {
      console.log('✅ Firestore multi-tab persistence enabled');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn('⚠️ Firestore persistence: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('⚠️ Firestore persistence: Browser doesn\'t support');
      } else {
        console.error('❌ Firestore persistence error:', err);
      }
    });
}

export default app;
