# 👨‍💼 Cara Membuat User Admin - Via Firestore Console

## 📋 Overview

Sistem PPDB menggunakan **Firestore collection `users`** untuk menyimpan data admin. Setiap user (termasuk admin) disimpan di collection ini dengan **UID sebagai document ID**.

---

## 🎯 Cara Membuat Admin (Step-by-Step)

### **Prerequisites:**
1. ✅ User harus sudah login minimal 1x (agar UID terdaftar di Firebase Auth)
2. ✅ Dapatkan UID user dari Firebase Console

---

### **Step 1: Buka Firebase Console**

```
https://console.firebase.google.com/
```

1. Pilih project Anda (**x-ppdb**)
2. Klik **"Firestore Database"** di menu kiri

---

### **Step 2: Dapatkan UID User**

**Option A: Dari Authentication**
```
1. Klik "Authentication" di menu kiri
2. Klik tab "Users"
3. Cari user dengan email yang ingin dijadikan admin
4. Copy UID (contoh: "abc123xyz456...")
```

**Option B: Dari Firestore (jika sudah pernah login)**
```
1. Buka Firestore Database
2. Collection "users"
3. Cari document dengan email user tersebut
4. Document ID = UID
```

---

### **Step 3: Buat/Update Document di Collection `users`**

1. **Buka Firestore Database**
2. **Collection: `users`**
3. **Document ID:** Paste UID yang sudah di-copy
4. **Klik "Save"** (jika document baru) atau **"Edit"** (jika sudah ada)

---

### **Step 4: Isi Data Admin**

Tambahkan field berikut:

```javascript
{
  // Required Fields
  uid: "abc123xyz456...",           // UID dari Firebase Auth
  email: "admin@smk.sch.id",         // Email admin (lowercase)
  name: "Nama Lengkap Admin",        // Nama lengkap
  role: "super_admin",               // Role: super_admin | admin | staff
  
  // Optional Fields
  permissions: [                     // Permissions (array)
    "read",
    "write", 
    "delete",
    "manage_users",
    "manage_payments"
  ],
  active: true,                      // Status aktif (boolean)
  photoURL: "https://...",          // URL foto profil
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

**Screenshot:**
```
┌─────────────────────────────────────────────┐
│ Collection: users                           │
│ Document: abc123xyz456... (UID)            │
├─────────────────────────────────────────────┤
│ Field       │ Type    │ Value              │
├─────────────┼─────────┼────────────────────┤
│ uid         │ string  │ abc123xyz456...    │
│ email       │ string  │ admin@smk.sch.id   │
│ name        │ string  │ Nama Lengkap       │
│ role        │ string  │ super_admin        │
│ permissions │ array   │ ["read", "write"]  │
│ active      │ boolean │ true               │
│ photoURL    │ string  │ https://...        │
│ createdAt   │ string  │ 2024-01-01T...     │
│ updatedAt   │ string  │ 2024-01-01T...     │
└─────────────────────────────────────────────┘
```

---

### **Step 5: Save Document**

1. Klik **"Save"**
2. Admin sudah dibuat! ✅

---

## 🧪 Test Admin

### **1. Logout & Login Ulang**

```
1. Logout dari aplikasi
2. Buka: http://localhost:5173/admin/login
3. Login dengan Google menggunakan email admin
4. Sistem akan otomatis detect role dari Firestore
```

### **2. Verifikasi**

Setelah login, seharusnya:
- ✅ Redirect ke `/admin/payments`
- ✅ Tombol "Dashboard" muncul di header
- ✅ Bisa akses semua halaman admin

---

## 📊 Role & Permissions

### **Roles:**

| Role | Description | Permissions |
|------|-------------|-------------|
| `super_admin` | Full access | All permissions |
| `admin` | Standard admin | read, write, manage_payments |
| `staff` | Limited access | read only |

### **Default Permissions:**

```javascript
// Super Admin
permissions: [
  "read",
  "write",
  "delete",
  "manage_users",
  "manage_payments",
  "manage_exams",
  "send_notifications"
]

// Admin
permissions: [
  "read",
  "write",
  "manage_payments"
]

// Staff
permissions: [
  "read"
]
```

---

## 🛠️ Troubleshooting

### **Problem: "Akses ditolak" saat login admin**

**Causes:**
1. UID tidak match dengan Firebase Auth
2. Field `role` tidak ada atau salah
3. Field `active: false`

**Solution:**
```
1. Check UID di Firebase Authentication
2. Pastikan UID di Firestore match dengan Auth
3. Verify field role: "super_admin" | "admin" | "staff"
4. Pastikan active: true
5. Logout dan login ulang
```

### **Problem: User tidak terdeteksi sebagai admin**

**Debug:**
```javascript
// Browser console (F12)
import { checkIfAdmin } from '@/services/adminService';
import { auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const isAdmin = await checkIfAdmin(user.uid);
    console.log('UID:', user.uid);
    console.log('Is Admin:', isAdmin);
  }
});
```

**Check Firestore:**
```
1. Buka Firestore Database
2. Collection: users
3. Document ID: {UID user}
4. Verify field:
   - role: "super_admin" | "admin" | "staff"
   - active: true
```

### **Problem: Document tidak ada di collection users**

**Solution:**
```
User harus login minimal 1x agar document users dibuat otomatis.

1. Login dengan Google
2. Document users akan dibuat otomatis
3. Update document dengan role admin
4. Logout & login ulang
```

---

## 📝 Contoh UID & Email

### **Super Admin:**
```
UID: abc123xyz456def789
Email: admin@smk.sch.id
Role: super_admin
```

### **Admin Operator:**
```
UID: xyz789abc123ghi456
Email: operator@smk.sch.id
Role: admin
```

### **Admin Guru:**
```
UID: def456ghi789jkl012
Email: guru@smk.sch.id
Role: staff
```

---

## 🔐 Security Best Practices

1. ✅ **Verify UID** - Pastikan UID match dengan Firebase Auth
2. ✅ **Use lowercase email** - Firestore case-sensitive
3. ✅ **Minimum 2 super admins** - Untuk backup
4. ✅ **Review permissions** - Berkala setiap bulan
5. ✅ **Deactivate ex-staff** - Set `active: false`
6. ✅ **Audit trail** - Track `updatedAt` timestamp

---

## 🚀 Quick Commands

### **Check Admin Status:**
```javascript
// Browser console
import { checkIfAdmin } from '@/services/adminService';
import { auth } from '@/services/firebase';

const user = auth.currentUser;
if (user) {
  const isAdmin = await checkIfAdmin(user.uid);
  console.log('UID:', user.uid);
  console.log('Is Admin:', isAdmin);
}
```

### **Get User Data:**
```javascript
// Browser console
import { getUserData } from '@/services/adminService';
import { auth } from '@/services/firebase';

const user = auth.currentUser;
if (user) {
  const userData = await getUserData(user.uid);
  console.log('User Data:', userData);
}
```

### **List All Admins:**
```javascript
// Browser console
import { getAllAdmins } from '@/services/adminService';

const admins = await getAllAdmins();
console.log('All Admins:', admins);
```

---

## 📧 Email Domain

### **Recommended Admin Domains:**

```
@smk.sch.id  - Domain institusi utama
@gmail.com   - Untuk testing (tidak direkomendasikan untuk production)
```

### **Email Validation:**

Sistem tidak memvalidasi berdasarkan domain email, tetapi berdasarkan:
1. ✅ UID di Firebase Auth
2. ✅ Field `role` di Firestore
3. ✅ Field `active: true`

---

## 🎯 Summary

**Flow Pembuatan Admin:**

```
1. User login Google → UID terdaftar di Auth
2. Dapatkan UID dari Firebase Console
3. Buat document di Firestore → Collection: users
4. Document ID = UID
5. Isi field: uid, email, name, role, active
6. Save document
7. Logout & login ulang
8. User sekarang adalah admin! ✅
```

---

**Last Updated:** 2024
**Version:** 2.0.0 (Using users collection with UID)
**Status:** ✅ Production Ready
