/**
 * Script untuk membuat admin pertama di PPDB System
 * 
 * CARA MENGGUNAKAN:
 * 1. Buka browser console (F12) di halaman aplikasi
 * 2. Copy-paste script ini
 * 3. Jalankan fungsi: await createFirstAdmin()
 * 
 * ATAU via Node.js:
 * 1. Install: npm install firebase
 * 2. Jalankan: node scripts/seedAdmin.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAjsr4LTeWcc0CwLo2pWRVGpcqY2dR2Uks",
  authDomain: "x-ppdb.firebaseapp.com",
  projectId: "x-ppdb",
  storageBucket: "x-ppdb.firebasestorage.app",
  messagingSenderId: "1024737155564",
  appId: "1:1024737155564:web:6a2ab3d6d6f52c3de708c9",
  measurementId: "G-2811PD4BD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Create first admin
 * @param {string} uid - User UID from Firebase Auth
 * @param {string} email - Admin email
 * @param {string} name - Admin name
 * @param {string} role - Role: super_admin, admin, staff
 */
async function createAdmin(uid, email, name, role = 'super_admin') {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    const existingData = userSnap.exists() ? userSnap.data() : {};
    
    const adminData = {
      ...existingData,
      uid,
      email: email.toLowerCase(),
      name: name || 'Administrator',
      role: role,
      permissions: role === 'super_admin' 
        ? ['read', 'write', 'delete', 'manage_users', 'manage_payments', 'manage_exams', 'send_notifications']
        : role === 'admin'
        ? ['read', 'write', 'manage_payments']
        : ['read'],
      active: true,
      createdAt: existingData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await setDoc(userRef, adminData, { merge: true });
    
    return {
      success: true,
      uid,
      email,
      name,
      role
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create first admin with anonymous auth (for testing)
 */
async function createFirstAdmin() {
  console.log('🚀 Creating first admin...\n');
  
  try {
    // Sign in anonymously to get a UID
    await signInAnonymously(auth);
    const user = auth.currentUser;
    
    if (!user) {
      console.log('❌ Failed to get user');
      return;
    }
    
    const uid = user.uid;
    const email = 'admin@smk.sch.id';
    const name = 'Administrator';
    
    console.log('📝 Creating admin with:');
    console.log('   UID:', uid);
    console.log('   Email:', email);
    console.log('   Name:', name);
    console.log('   Role: super_admin\n');
    
    const result = await createAdmin(uid, email, name, 'super_admin');
    
    if (result.success) {
      console.log('✅ SUCCESS! Admin created:\n');
      console.log('   UID:', result.uid);
      console.log('   Email:', result.email);
      console.log('   Name:', result.name);
      console.log('   Role:', result.role);
      console.log('\n📝 Next steps:');
      console.log('   1. Login dengan Google di: http://localhost:5173/admin/login');
      console.log('   2. Gunakan email:', result.email);
      console.log('   3. Admin akan otomatis terdeteksi!\n');
    } else {
      console.log('❌ ERROR:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

/**
 * Set existing user as admin
 * @param {string} uid - User UID
 * @param {string} role - Role: super_admin, admin, staff
 */
async function setUserAsAdmin(uid, role = 'super_admin') {
  console.log('🚀 Setting user as admin...\n');
  
  const email = prompt('Masukkan email user:');
  const name = prompt('Masukkan nama user:') || 'User';
  
  if (!email) {
    console.log('❌ Email diperlukan');
    return;
  }
  
  const result = await createAdmin(uid, email, name, role);
  
  if (result.success) {
    console.log('✅ SUCCESS! User updated as admin:\n');
    console.log('   UID:', result.uid);
    console.log('   Email:', result.email);
    console.log('   Name:', result.name);
    console.log('   Role:', result.role);
    console.log('\n📝 Login di: http://localhost:5173/admin/login\n');
  } else {
    console.log('❌ ERROR:', result.error);
  }
}

// Export functions
export { createAdmin, createFirstAdmin, setUserAsAdmin };

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('📝 PPDB Admin Seed Script loaded!');
  console.log('📝 Run: await createFirstAdmin() untuk membuat admin pertama\n');
  console.log('📝 Atau: await setUserAsAdmin("UID_USER") untuk set user yang sudah ada\n');
}

// Auto-run if executed directly (Node.js)
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('seedAdmin')) {
  createFirstAdmin().catch(console.error);
}
