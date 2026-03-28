# 👨‍💼 Cara Membuat User Admin - PPDB System

## 📋 Overview

Ada beberapa cara untuk membuat user admin di sistem PPDB:

1. **Via Firestore Console** (Manual - Recommended)
2. **Via Manage Admin Page** (UI)
3. **Via Script** (Automated)

---

## 🎯 Metode 1: Via Firestore Console (Recommended)

### **Step-by-Step:**

1. **Buka Firebase Console**
   ```
   https://console.firebase.google.com/
   ```

2. **Pilih Project** Anda (x-ppdb)

3. **Buka Firestore Database**
   - Klik "Firestore Database" di menu kiri
   - Klik "Start collection" jika belum ada

4. **Buat Collection `admins`**
   - Collection ID: `admins`
   - Klik "Add document"

5. **Isi Document Data:**

   ```
   Field         | Type     | Value
   --------------|----------|---------------------------
   email         | string   | admin@smk.sch.id
   name          | string   | Administrator
   role          | string   | super_admin
   permissions   | array    | ["read", "write", "delete", "manage_users"]
   active        | boolean  | true
   createdAt     | string   | 2024-01-01T00:00:00.000Z
   createdBy     | string   | system
   ```

   **Screenshot:**
   ```
   ┌─────────────────────────────────────┐
   │ Collection: admins                  │
   │ Document: Auto-ID                   │
   ├─────────────────────────────────────┤
   │ email        │ string │ admin@...   │
   │ name         │ string │ Admin...    │
   │ role         │ string │ super_admin │
   │ permissions  │ array  │ [...]       │
   │ active       │ bool   │ true        │
   │ createdAt    │ string │ 2024-...    │
   │ createdBy    │ string │ system      │
   └─────────────────────────────────────┘
   ```

6. **Save Document**
   - Klik "Save"
   - Admin sudah dibuat! ✅

---

## 🎨 Metode 2: Via Manage Admin Page (UI)

### **Step-by-Step:**

1. **Login dengan Admin yang Sudah Ada**
   ```
   http://localhost:5173/admin/login
   ```

2. **Buka Manage Admins**
   ```
   http://localhost:5173/admin/manage-admins
   ```

3. **Klik "Tambah Admin Baru"**

4. **Isi Form:**
   - **Email**: `nama@smk.sch.id`
   - **Nama**: `Nama Lengkap`
   - **Role**: `admin` atau `super_admin`
   - **Permissions**: Pilih sesuai kebutuhan

5. **Klik "Tambah"**
   - Admin baru akan ditambahkan ✅

---

## 💻 Metode 3: Via Script (Automated)

### **Create Script:**

Buat file `scripts/createAdmin.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAjsr4LTeWcc0CwLo2pWRVGpcqY2dR2Uks",
  authDomain: "x-ppdb.firebaseapp.com",
  projectId: "x-ppdb",
  storageBucket: "x-ppdb.firebasestorage.app",
  messagingSenderId: "1024737155564",
  appId: "1:1024737155564:web:6a2ab3d6d6f52c3de708c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin data
const adminData = {
  email: 'admin@smk.sch.id',
  name: 'Administrator',
  role: 'super_admin',
  permissions: ['read', 'write', 'delete', 'manage_users'],
  active: true,
  createdAt: new Date().toISOString(),
  createdBy: 'script'
};

// Create admin
async function createAdmin() {
  try {
    const docRef = await addDoc(collection(db, 'admins'), adminData);
    console.log('✅ Admin created with ID:', docRef.id);
    console.log('Email:', adminData.email);
    console.log('Name:', adminData.name);
    console.log('Role:', adminData.role);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createAdmin();
```

### **Run Script:**

```bash
# Install dependencies (if not already)
npm install firebase

# Run script
node scripts/createAdmin.js
```

---

## 🔐 Default Admin Credentials

### **Super Admin:**
```
Email: admin@smk.sch.id
Role: super_admin
Permissions: ["read", "write", "delete", "manage_users"]
```

### **Admin Staff:**
```
Email: operator@smk.sch.id
Role: admin
Permissions: ["read", "write"]
```

### **Admin Guru:**
```
Email: guru@smk.sch.id
Role: staff
Permissions: ["read"]
```

---

## 📊 Role & Permissions

### **Roles:**

| Role | Description | Default Permissions |
|------|-------------|---------------------|
| `super_admin` | Full access | All permissions |
| `admin` | Standard admin | read, write |
| `staff` | Limited access | read only |

### **Permissions:**

| Permission | Description |
|------------|-------------|
| `read` | View data |
| `write` | Create/edit data |
| `delete` | Delete data |
| `manage_users` | Manage admin users |
| `manage_payments` | Manage payments |
| `manage_exams` | Manage exams |
| `send_notifications` | Send notifications |

---

## ✅ Verify Admin Creation

### **1. Via Firebase Console:**

```
Firestore Database → admins collection
→ Check document exists with correct email
```

### **2. Via Browser Console:**

```javascript
// Open browser console (F12)
import { checkIfAdmin } from '@/services/adminService';

const isAdmin = await checkIfAdmin('admin@smk.sch.id');
console.log('Is Admin:', isAdmin); // Should return true
```

### **3. Test Login:**

```
1. Go to: http://localhost:5173/admin/login
2. Login with Google using admin email
3. Should redirect to /admin/payments
4. Should see "Dashboard" button in header
```

---

## 🛠️ Troubleshooting

### **Problem: "Akses ditolak" saat login admin**

**Cause:** Email tidak ada di Firestore atau tidak active

**Solution:**
```
1. Check Firestore → admins collection
2. Verify email matches exactly (case-sensitive)
3. Ensure active: true
4. Logout and login again
```

### **Problem: Admin tidak terdeteksi**

**Debug:**
```javascript
// Browser console
import { getAdminData } from '@/services/adminService';

const admin = await getAdminData('admin@smk.sch.id');
console.log('Admin data:', admin);
// Should return admin object or null
```

### **Problem: Firestore permission denied**

**Solution:**
```
1. Go to Firestore Rules
2. Add rule:
   match /admins/{adminId} {
     allow read: if request.auth != null;
     allow write: if request.auth != null;
   }
```

---

## 📝 Quick Start - First Admin

### **Create First Admin:**

```bash
# 1. Open Firebase Console
https://console.firebase.google.com/

# 2. Go to Firestore Database

# 3. Create collection "admins"

# 4. Add document with data:
{
  email: "admin@smk.sch.id",
  name: "Administrator",
  role: "super_admin",
  permissions: ["read", "write", "delete", "manage_users"],
  active: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  createdBy: "system"
}

# 5. Save

# 6. Test login at:
http://localhost:5173/admin/login
```

---

## 🎯 Best Practices

1. ✅ **Use institutional email** - `@smk.sch.id`
2. ✅ **Lowercase email** - Firestore is case-sensitive
3. ✅ **Minimum 2 super admins** - For backup
4. ✅ **Review permissions regularly** - Security
5. ✅ **Deactivate ex-staff** - Set `active: false`
6. ✅ **Audit trail** - Track who creates admins

---

## 🔐 Security Notes

- ⚠️ **Don't give super_admin to many people**
- ⚠️ **Review permissions periodically**
- ⚠️ **Use Firestore Rules for protection**
- ⚠️ **Enable Firebase Authentication audit logs**

---

## 📧 Email Domain Setup

### **Allowed Admin Domains:**

```javascript
// In AuthContext.jsx
const isAdminEmail = email.endsWith('@smk.sch.id');
```

### **Common Admin Emails:**

```
admin@smk.sch.id
kepsek@smk.sch.id
operator@smk.sch.id
guru@smk.sch.id
tu@smk.sch.id
```

---

## 🚀 Quick Commands

### **Check Admin Status:**
```javascript
// Browser console
const { user } = useAuth();
console.log('Is Admin:', user?.isAdmin);
console.log('Email:', user?.email);
```

### **List All Admins:**
```javascript
// Browser console
import { getAllAdmins } from '@/services/adminService';
const admins = await getAllAdmins();
console.log('Admins:', admins);
```

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready
