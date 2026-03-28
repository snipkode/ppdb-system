/**
 * Script untuk menambahkan role admin ke user yang sudah ada di Firestore
 *
 * Usage:
 * 1. Pastikan Firebase sudah dikonfigurasi
 * 2. User harus sudah pernah login agar ada di collection users
 * 3. Jalankan script ini untuk set role admin
 * 4. Admin dapat login dengan email yang sudah terdaftar
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

// Firebase config - sesuaikan dengan config Anda
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

console.log('🔥 Firebase initialized');
console.log('📝 Project ID:', firebaseConfig.projectId);

/**
 * Set user sebagai admin
 * @param {string} userId - UID user di Firebase Auth
 * @param {string} role - Role: super_admin, admin, staff
 */
async function setUserAsAdmin(userId, role = 'super_admin') {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role: role,
      permissions: role === 'super_admin' 
        ? ['read', 'write', 'delete', 'manage_users', 'manage_payments', 'manage_exams']
        : ['read', 'write'],
      active: true,
      updatedAt: new Date().toISOString()
    });
    
    return {
      success: true,
      userId,
      role
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Seed default admin
async function main() {
  console.log('\n🚀 Starting admin setup...\n');

  console.log('⚠️  PENTING: Script ini untuk set role admin pada user yang SUDAH ADA di Firestore.');
  console.log('💡  User harus sudah pernah login agar terdaftar di collection users.\n');
  
  const userId = prompt('Masukkan UID user yang akan dijadikan admin:');
  
  if (!userId) {
    console.log('❌ UID tidak boleh kosong');
    return;
  }

  const role = prompt('Masukkan role (super_admin/admin/staff), tekan enter untuk super_admin:') || 'super_admin';

  const result = await setUserAsAdmin(userId, role);

  if (result.success) {
    console.log('\n✅ SUCCESS! User diupdate sebagai admin:');
    console.log('   User ID:', result.userId);
    console.log('   Role:', result.role);
    console.log('\n📝 Admin dapat login di: http://localhost:5173/admin/login\n');
  } else {
    console.log('\n❌ ERROR:', result.error);
    console.log('\n💡 Tips:');
    console.log('   - Pastikan user sudah login minimal sekali (ada di collection users)');
    console.log('   - Cek UID user di Firebase Console → Firestore → users collection');
    console.log('   - Periksa Firebase console untuk error detail\n');
  }
}

// Run script
main().catch(console.error);

export { setUserAsAdmin };
