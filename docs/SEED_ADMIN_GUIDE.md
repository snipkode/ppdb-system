# 🌱 Seed Admin - Cara Membuat Admin Pertama

## 📋 Overview

Script `seedAdmin.js` digunakan untuk membuat admin pertama di sistem PPDB. Ada 2 cara untuk menjalankan:

1. **Via Browser Console** (Recommended - Mudah)
2. **Via Node.js** (Advanced)

---

## 🎯 Metode 1: Via Browser Console (Paling Mudah)

### **Step-by-Step:**

**1. Buka Aplikasi**
```
http://localhost:5173
```

**2. Buka Browser Console**
```
Tekan F12 → Tab "Console"
```

**3. Copy-Paste Script Ini:**

```javascript
// Import functions
import { createFirstAdmin, setUserAsAdmin } from './src/scripts/seedAdmin.js';

// Option A: Create admin baru (anonymous)
await createFirstAdmin();

// Option B: Set user yang sudah ada sebagai admin
// await setUserAsAdmin("UID_USER");
```

**4. Tekan Enter**

Script akan otomatis:
- ✅ Login anonymous untuk dapat UID
- ✅ Buat document di Firestore collection `users`
- ✅ Set role: `super_admin`
- ✅ Set permissions lengkap

**5. Lihat Hasil:**

```
🚀 Creating first admin...

📝 Creating admin with:
   UID: abc123xyz...
   Email: admin@smk.sch.id
   Name: Administrator
   Role: super_admin

✅ SUCCESS! Admin created:

   UID: abc123xyz...
   Email: admin@smk.sch.id
   Name: Administrator
   Role: super_admin

📝 Next steps:
   1. Login dengan Google di: http://localhost:5173/admin/login
   2. Gunakan email: admin@smk.sch.id
   3. Admin akan otomatis terdeteksi!
```

---

## 💻 Metode 2: Via Node.js

### **Prerequisites:**

```bash
# Install Firebase SDK
npm install firebase
```

### **Step-by-Step:**

**1. Buat File `scripts/seedAdmin.mjs`:**

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjsr4LTeWcc0CwLo2pWRVGpcqY2dR2Uks",
  authDomain: "x-ppdb.firebaseapp.com",
  projectId: "x-ppdb",
  storageBucket: "x-ppdb.firebasestorage.app",
  messagingSenderId: "1024737155564",
  appId: "1:1024737155564:web:6a2ab3d6d6f52c3de708c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function createAdmin() {
  await signInAnonymously(auth);
  const user = auth.currentUser;
  
  if (!user) {
    console.log('❌ Failed to get user');
    return;
  }
  
  const uid = user.uid;
  const email = 'admin@smk.sch.id';
  
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    uid,
    email: email.toLowerCase(),
    name: 'Administrator',
    role: 'super_admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_payments'],
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }, { merge: true });
  
  console.log('✅ Admin created!');
  console.log('UID:', uid);
  console.log('Email:', email);
}

createAdmin().catch(console.error);
```

**2. Jalankan Script:**

```bash
node scripts/seedAdmin.mjs
```

---

## 🧪 Test Admin

Setelah script berhasil dijalankan:

**1. Logout** (jika sedang login)

**2. Buka Halaman Admin Login:**
```
http://localhost:5173/admin/login
```

**3. Login dengan Google:**
- Gunakan email: `admin@smk.sch.id`
- Atau email yang sudah di-set di script

**4. Verifikasi:**
- ✅ Redirect ke `/admin/payments`
- ✅ Tombol "Dashboard" muncul di header
- ✅ Bisa akses semua halaman admin

---

## 🛠️ Troubleshooting

### **Problem: "Firebase is not defined"**

**Solution:**
```
Pastikan Firebase SDK sudah diinstall:
npm install firebase
```

### **Problem: "Cannot use import statement"**

**Solution:**
```
Gunakan file .mjs atau tambahkan "type": "module" di package.json
```

### **Problem: Admin tidak terdeteksi setelah login**

**Cause:** UID di Firestore tidak match dengan UID Firebase Auth

**Solution:**
```javascript
// Browser console
import { auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Your UID:', user.uid);
    console.log('Your email:', user.email);
  }
});

// Copy UID ini dan update di Firestore
```

**Update Firestore:**
```
1. Buka Firebase Console
2. Firestore Database
3. Collection: users
4. Document ID: {Paste UID yang baru}
5. Update field email, name, role
```

### **Problem: Script tidak jalan di browser**

**Solution:**
```
Gunakan browser modern (Chrome, Firefox, Edge)
Pastikan aplikasi running di localhost
Buka console dengan F12
```

---

## 📝 Quick Commands

### **Create Admin Baru:**
```javascript
// Browser console
await createFirstAdmin();
```

### **Set User yang Sudah Ada:**
```javascript
// Browser console
await setUserAsAdmin("UID_USER", "super_admin");
```

### **Check Admin Status:**
```javascript
// Browser console
import { checkIfAdmin } from '@/services/adminService';
import { auth } from '@/services/firebase';

const user = auth.currentUser;
if (user) {
  const isAdmin = await checkIfAdmin(user.uid);
  console.log('Is Admin:', isAdmin);
  console.log('UID:', user.uid);
}
```

---

## 🎯 Best Practices

1. ✅ **Create minimal 2 super admins** - Untuk backup
2. ✅ **Use institutional email** - `@smk.sch.id`
3. ✅ **Save UID** - Simpan UID admin untuk referensi
4. ✅ **Test immediately** - Login ulang setelah create
5. ✅ **Document** - Catat email & UID admin yang dibuat

---

## 📧 Default Admin Credentials

Setelah seed berhasil:

```
Email: admin@smk.sch.id
Role: super_admin
Permissions: [
  "read",
  "write",
  "delete",
  "manage_users",
  "manage_payments",
  "manage_exams",
  "send_notifications"
]
```

---

## 🔐 Security Notes

- ⚠️ **Jangan share UID admin**
- ⚠️ **Gunakan email institusi** untuk production
- ⚠️ **Review permissions** secara berkala
- ⚠️ **Deactivate ex-staff** - Set `active: false`

---

## 🚀 Summary

**Quick Start:**

```bash
# 1. Buka aplikasi
http://localhost:5173

# 2. Buka browser console (F12)

# 3. Run script
await createFirstAdmin();

# 4. Login dengan email admin
http://localhost:5173/admin/login

# ✅ Done!
```

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready
