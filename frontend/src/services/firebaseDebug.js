/**
 * Firebase Debug & Development Tools
 * 
 * Gunakan untuk debugging Firebase di development mode
 */

import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { auth, db, storage } from './firebase';

// Use emulators only in development
const USE_EMULATORS = import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';

export const setupFirebaseEmulators = () => {
  if (!USE_EMULATORS) {
    console.log('🔥 Firebase: Using production Firebase (emulators disabled)');
    return;
  }

  console.log('🔧 Firebase: Using Emulators for development');

  try {
    // Auth Emulator
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    console.log('✅ Auth Emulator: http://127.0.0.1:9099');

    // Firestore Emulator
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    console.log('✅ Firestore Emulator: http://127.0.0.1:8080');

    // Storage Emulator
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    console.log('✅ Storage Emulator: http://127.0.0.1:9199');

    console.log('\n📊 Emulator UI: http://127.0.0.1:4000');
    console.log('⚠️  All data is local and will be cleared on emulator stop\n');
  } catch (error) {
    console.error('❌ Failed to connect to Firebase Emulators:', error);
    console.log('📝 Make sure emulators are running: firebase emulators:start');
  }
};

/**
 * Debug helper functions
 */
export const firebaseDebug = {
  // Check current user
  getCurrentUser: () => {
    const user = auth.currentUser;
    console.log('👤 Current User:', user);
    return user;
  },

  // Check auth state
  checkAuthState: () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log('🔐 Auth State:', user ? 'LOGGED IN' : 'LOGGED OUT');
        if (user) {
          console.log('  - UID:', user.uid);
          console.log('  - Email:', user.email);
          console.log('  - Name:', user.displayName);
          console.log('  - Provider:', user.providerData[0]?.providerId);
        }
        unsubscribe();
        resolve(user);
      });
    });
  },

  // Test Firestore connection
  testFirestore: async () => {
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const testRef = collection(db, 'test');
      const snapshot = await getDocs(testRef);
      console.log('✅ Firestore connection: OK');
      console.log('   Documents in "test" collection:', snapshot.size);
      return true;
    } catch (error) {
      console.error('❌ Firestore connection: FAILED');
      console.error('   Error:', error.message);
      return false;
    }
  },

  // List all collections
  listCollections: async () => {
    try {
      const { getFirestore, listCollections } = await import('firebase/firestore');
      const db = getFirestore();
      const collections = await listCollections(db);
      console.log('📁 Firestore Collections:');
      collections.forEach(col => {
        console.log(`   - ${col.id}`);
      });
      return collections;
    } catch (error) {
      console.error('❌ Failed to list collections:', error.message);
      return [];
    }
  },

  // Clear all local data (emulators only)
  clearLocalData: async () => {
    if (!USE_EMULATORS) {
      console.warn('⚠️  This function only works with emulators enabled');
      return;
    }

    try {
      const { getFirestore, clearIndexedDbPersistence } = await import('firebase/firestore');
      const db = getFirestore();
      await clearIndexedDbPersistence(db);
      console.log('✅ Local data cleared');
    } catch (error) {
      console.error('❌ Failed to clear local data:', error);
    }
  }
};

// Auto-setup in development
if (import.meta.env.DEV) {
  console.log('🔍 Firebase Debug Tools loaded');
  console.log('💡 Use firebaseDebug helper functions in console:');
  console.log('   - firebaseDebug.getCurrentUser()');
  console.log('   - firebaseDebug.checkAuthState()');
  console.log('   - firebaseDebug.testFirestore()');
  console.log('   - firebaseDebug.listCollections()');
}

export default { setupFirebaseEmulators, firebaseDebug };
