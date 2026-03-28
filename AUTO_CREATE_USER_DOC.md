# 👨‍💼 Auto Create User Document - Sistem Admin PPDB

## 📋 Overview

Sistem sekarang **otomatis membuat document user** di Firestore collection `users/{uid}` setiap kali user login pertama kali.

---

## 🔄 Flow Otomatis

### **Saat User Login:**

```
1. User login dengan Google
   ↓
2. Firebase Auth create/update user
   ↓
3. AuthContext otomatis create document di Firestore:
   - Collection: users
   - Document ID: {UID}
   - Data: uid, email, name, role, permissions, active
   ↓
4. Check role admin dari Firestore
   ↓
5. Jika admin → Redirect ke dashboard admin
   Jika user biasa → Redirect ke register
```

---

## 📊 Firestore Document Structure

### **Collection: `users`**

**Document ID:** `{Firebase Auth UID}`

**Fields:**
```javascript
{
  // Auto-filled from Firebase Auth
  uid: "abc123xyz...",              // Firebase Auth UID
  email: "user@example.com",        // Email (lowercase)
  name: "Nama User",                // Display name
  photoURL: "https://...",          // Profile photo
  provider: "google.com",           // Auth provider
  
  // Role & Permissions
  role: "user",                     // user | staff | admin | super_admin
  permissions: ["read"],            // Array of permissions
  active: true,                     // Account status
  
  // Timestamps
  createdAt: Timestamp,             // First login
  lastLoginAt: Timestamp,           // Last login
  updatedAt: Timestamp              // Last update
}
```

---

## 🎯 Cara Membuat Admin

### **Metode 1: Update Manual di Firestore Console**

**1. User Login Dulu**
```
1. Buka: http://localhost:5173
2. Login dengan Google
3. Document users/{uid} otomatis dibuat
```

**2. Update Role di Firestore Console**
```
1. Buka: https://console.firebase.google.com/
2. Pilih project → Firestore Database
3. Collection: users
4. Document: {UID user yang baru login}
5. Update field:
   - role: "super_admin" (atau "admin")
   - permissions: ["read", "write", "delete", "manage_users"]
   - active: true
6. Save
```

**3. Logout & Login Ulang**
```
1. Logout
2. Login ulang dengan email yang sama
3. Sistem otomatis detect role baru
4. Redirect ke /admin/payments ✅
```

---

### **Metode 2: Via Browser Console (Quick)**

**1. Buka Browser Console (F12)**

**2. Run Script:**
```javascript
// Get current user UID
import { auth } from '@/services/firebase';
const uid = auth.currentUser.uid;

// Update to admin
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const userRef = doc(db, 'users', uid);
await updateDoc(userRef, {
  role: 'super_admin',
  permissions: ['read', 'write', 'delete', 'manage_users', 'manage_payments'],
  active: true,
  updatedAt: new Date().toISOString()
});

console.log('✅ Admin role set! Logout & login ulang.');
```

**3. Logout & Login Ulang**

---

### **Metode 3: Via Script (Batch)**

**Create script `scripts/createAdmin.js`:**

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

async function createAdmin(uid, email, role = 'super_admin') {
  const userRef = doc(db, 'users', uid);
  
  await updateDoc(userRef, {
    email: email.toLowerCase(),
    role: role,
    permissions: role === 'super_admin'
      ? ['read', 'write', 'delete', 'manage_users', 'manage_payments']
      : ['read', 'write'],
    active: true,
    updatedAt: new Date().toISOString()
  });
  
  console.log('✅ Admin created!');
  console.log('UID:', uid);
  console.log('Email:', email);
  console.log('Role:', role);
}

// Usage
createAdmin('UID_USER', 'admin@smk.sch.id');
```

---

## 🧪 Test Admin Creation

### **Step-by-Step Test:**

**1. Login Pertama Kali**
```
http://localhost:5173
→ Login Google
→ Document users/{uid} otomatis dibuat dengan role: "user"
```

**2. Check Firestore**
```
Firebase Console → Firestore Database → users → {uid}

Fields:
- uid: "abc123..."
- email: "user@gmail.com"
- role: "user"
- active: true
```

**3. Update Role ke Admin**
```
Firestore Console → users → {uid}
Update:
- role: "super_admin"
- permissions: ["read", "write", "delete"]
```

**4. Logout & Login Ulang**
```
Logout → Login lagi dengan email yang sama
→ Redirect ke /admin/payments ✅
→ Dashboard button muncul ✅
```

---

## 🔍 Verify User Document

### **Browser Console:**

```javascript
// Check current user document
import { auth } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const user = auth.currentUser;
if (user) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  console.log('User Data:', userSnap.data());
  console.log('Role:', userSnap.data()?.role);
  console.log('Is Admin:', ['super_admin', 'admin', 'staff'].includes(userSnap.data()?.role));
}
```

---

## 🛠️ Troubleshooting

### **Problem: Document users tidak dibuat**

**Cause:** AuthContext tidak load dengan benar

**Solution:**
```javascript
// Check AuthProvider di App.jsx
<AuthProvider>
  <App />
</AuthProvider>

// Pastikan import db benar
import { db } from '@/services/firebase';
```

### **Problem: Role tidak terdeteksi setelah update**

**Cause:** Role di Firestore sudah update tapi user masih login dengan data lama

**Solution:**
```
1. Logout
2. Clear browser cache
3. Login ulang
```

### **Problem: "Cannot read property 'role' of undefined"**

**Cause:** Document users belum ada atau field role belum di-set

**Solution:**
```
1. Login minimal 1x agar document dibuat
2. Check Firestore → users → {uid}
3. Verify field 'role' exists
```

---

## 📊 Default Roles & Permissions

### **Role: user** (Default)
```javascript
{
  role: "user",
  permissions: ["read"],
  active: true
}
```

### **Role: staff**
```javascript
{
  role: "staff",
  permissions: ["read"],
  active: true
}
```

### **Role: admin**
```javascript
{
  role: "admin",
  permissions: ["read", "write", "manage_payments"],
  active: true
}
```

### **Role: super_admin**
```javascript
{
  role: "super_admin",
  permissions: ["read", "write", "delete", "manage_users", "manage_payments", "manage_exams"],
  active: true
}
```

---

## 🔐 Security Best Practices

1. ✅ **Auto-create with default role** - Role "user" untuk semua new user
2. ✅ **Manual upgrade to admin** - Admin role hanya via Firestore Console
3. ✅ **Preserve role on re-login** - Role tidak reset saat login ulang
4. ✅ **Track lastLoginAt** - Audit trail login times
5. ✅ **Use active flag** - Deactivate users tanpa delete document

---

## 📝 Summary

### **Auto Create Flow:**

```
User Login Google
  ↓
AuthContext.createUserDocument()
  ↓
Firestore: users/{uid}
  {
    uid: ...,
    email: ...,
    name: ...,
    role: "user" (default),
    permissions: ["read"],
    active: true
  }
  ↓
Check role → Redirect accordingly
```

### **Make Admin:**

```
1. User login → Document created
  ↓
2. Firestore Console → users/{uid}
  ↓
3. Update: role = "super_admin"
  ↓
4. Logout & Login ulang
  ↓
5. Admin dashboard ✅
```

---

**Last Updated:** 2024
**Version:** 3.0.0 (Auto Create User Document)
**Status:** ✅ Production Ready
