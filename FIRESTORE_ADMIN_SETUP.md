# 🔐 Setup Admin di Firestore - PPDB System

## 📋 Overview

Sistem admin menggunakan **Firestore database** dengan collection `users` yang terunifikasi. Semua user (admin & non-admin) disimpan di collection yang sama, dibedakan berdasarkan field `role`.

---

## 🗄️ Firestore Schema

### Collection: `users`

```typescript
{
  id: string,         // User UID (sama dengan Firebase Auth UID)
  email: string,      // Email user (lowercase)
  name: string,       // Nama lengkap
  role: string,       // Role: user | staff | admin | super_admin
  permissions?: string[], // Array of permissions (optional untuk admin)
  active: boolean,    // Status aktif/nonaktif (default: true)
  photoURL?: string,  // URL foto profil
  createdAt: string,  // ISO timestamp
  updatedAt?: string  // ISO timestamp (optional)
}
```

**Example Document:**
```json
{
  "id": "abc123xyz",
  "email": "admin@smk.sch.id",
  "name": "Administrator",
  "role": "super_admin",
  "permissions": ["read", "write", "delete", "manage_users"],
  "active": true,
  "photoURL": "https://lh3.googleusercontent.com/...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 👥 Role Hierarchy

| Role | Description | Access Level |
|------|-------------|--------------|
| `user` | User biasa (siswa/ortu) | Hanya bisa lihat & edit data sendiri |
| `staff` | Staff/Guru | Read & write terbatas |
| `admin` | Administrator | Full akses kelola PPDB |
| `super_admin` | Super Administrator | Full akses + manage admins lain |

---

## 🚀 Cara Setup Admin

### **Metode 1: Via Manage Admins UI (Recommended)**

1. Login dengan akun yang sudah ada di sistem
2. Akses halaman `/admin/manage-admins`
3. Klik **"Jadikan User Sebagai Admin"**
4. Masukkan email user yang sudah pernah login
5. Pilih role (admin, super_admin, atau staff)
6. Klik **"Jadikan Admin"**

**Note:** User harus sudah pernah login agar terdaftar di collection `users`.

### **Metode 2: Via Firebase Console (Manual)**

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Masuk ke **Firestore Database**
4. Collection `users` → cari document dengan UID user yang sesuai
5. Update field:

```
Field         | Type     | Value
--------------|----------|---------------------------
role          | string   | super_admin
permissions   | array    | ["read", "write", "delete", "manage_users"]
active        | boolean  | true
```

### **Metode 3: Via Code (Programmatically)**

```javascript
import { updateUserRole } from '@/services/adminService';

// Update role user
const result = await updateUserRole('user-uid-here', 'super_admin');
console.log(result); // { success: true }
```

---

## 🔧 Firestore Rules

Tambahkan rules ini ke Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if user is admin (any role)
    function isAdmin() {
      return request.auth != null &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['super_admin', 'admin', 'staff'] &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.active != false;
    }

    // Helper function to check if user is super admin
    function isSuperAdmin() {
      return request.auth != null &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin' &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.active != false;
    }

    // Users collection (unified user & admin data)
    match /users/{userId} {
      // Allow read for authenticated users
      allow read: if request.auth != null;

      // Allow create during registration (own profile)
      allow create: if request.auth != null &&
                       request.auth.uid == userId &&
                       request.resource.data.keys().hasAll(['email', 'name']);

      // Allow update only self or super admin
      allow update: if request.auth != null &&
                       (request.auth.uid == resource.data.id ||
                        isSuperAdmin());

      // Allow delete only super admin
      allow delete: if request.auth != null && isSuperAdmin();
    }

    // Students collection
    match /students/{studentId} {
      allow read: if request.auth != null &&
                     (isAdmin() || request.auth.uid == resource.data.user_id);
      allow write: if request.auth != null && isAdmin();
    }

    // Settings collection
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin();
    }
  }
}
```

---

## 🔍 Verify Admin Setup

### **Via Browser Console:**

```javascript
// Cek role user
import { getUserData, checkIfAdmin } from '@/services/adminService';

const uid = firebase.auth().currentUser.uid;
const userData = await getUserData(uid);
console.log('User data:', userData);
console.log('Role:', userData.role);
console.log('Is Admin:', await checkIfAdmin(uid));
```

### **Via Firebase Console:**

1. Buka Firestore Database
2. Collection `users`
3. Cek document dengan UID user
4. Pastikan field `role` dan `active` sudah benar

### **Via App:**

1. Login dengan email admin
2. Akses `/admin/payments` atau `/admin/manage-admins`
3. Jika berhasil masuk → ✅ Setup berhasil

---

## 🛠️ Troubleshooting

### Problem: "Akses ditolak" padahal sudah set role

**Cek:**
1. Field `active` harus `true` (atau tidak ada, default true)
2. Role harus salah satu: `super_admin`, `admin`, `staff`
3. UID di Firestore harus sama dengan Firebase Auth UID

**Solusi:**
```javascript
// Cek di Firebase Console
users collection → document (UID) → role field
Harus: "super_admin" (bukan "Super Admin" atau "admin")
```

### Problem: Admin tidak terdeteksi

**Debug:**
```javascript
// Di browser console
import { getUserData } from '@/services/adminService';

const userData = await getUserData(firebase.auth().currentUser.uid);
console.log('User data:', userData);
// Cek apakah role ada dan aktif
```

### Problem: Firestore permission denied

**Solusi:**
1. Update Firestore Rules (lihat di atas)
2. Pastikan user authenticated
3. Cek Firebase Console → Rules

---

## 📊 Manage Admins UI

Akses halaman manage admins:
```
http://localhost:5173/admin/manage-admins
```

**Fitur:**
- ✅ Lihat semua admin (tab Admins)
- ✅ Lihat semua users (tab All Users)
- ✅ Jadikan user sebagai admin
- ✅ Edit role user
- ✅ Aktifkan/nonaktifkan admin
- ✅ Stats dashboard

---

## 🎯 Quick Start

```bash
# 1. Pastikan ada user yang sudah login
# 2. Start development server
npm run dev

# 3. Login dengan akun pertama
http://localhost:5173/admin/login

# 4. Via Firebase Console, set role user pertama sebagai super_admin
#    users collection → {UID} → role: "super_admin"

# 5. Manage admin lain di
http://localhost:5173/admin/manage-admins
```

---

## 📌 Best Practices

1. ✅ **Set role saat user pertama kali login** - Buat Cloud Function trigger
2. ✅ **Minimal 2 super admin** - Untuk backup
3. ✅ **Review permissions** - Berikan sesuai kebutuhan
4. ✅ **Nonaktifkan user keluar** - Set `active: false`
5. ✅ **Gunakan role hierarchy** - user → staff → admin → super_admin

---

## 🔐 Security Notes

- Jangan berikan `super_admin` ke banyak orang
- Review permissions secara berkala
- Gunakan Firestore Rules untuk proteksi tambahan
- Enable Firebase Authentication untuk audit log
- Field `active` memungkinkan disable user tanpa hapus data

---

## 📝 Migration dari Collection `admins` Terpisah

Jika sebelumnya menggunakan collection `admins` terpisah:

```javascript
// 1. Export data dari collection admins
// 2. Import ke collection users dengan mapping:
//    admins.email → users.email
//    admins.role → users.role
//    admins.permissions → users.permissions
// 3. Update UID mapping berdasarkan email
// 4. Hapus collection admins lama
```

---

**Last Updated:** 2024-03-28
**Version:** 3.0.0 (Unified users collection)
