# 👨‍💼 Role & Permissions Admin - PPDB System

## 📋 Overview

Sistem admin PPDB menggunakan **role-based access control (RBAC)** dengan hierarki permissions yang jelas.

---

## 🎯 Role Hierarchy

```
super_admin (Full Access)
    ↓
admin (Standard Access)
    ↓
staff (Limited Access)
```

---

## 🔐 Roles & Permissions

### **1. Super Admin** (`super_admin`)

**Description:** Full access ke semua fitur dan manajemen user.

**Permissions:**
```javascript
[
  "read",                    // Baca data
  "write",                   // Tulis/edit data
  "delete",                  // Hapus data
  "manage_users",            // Kelola user & admin
  "manage_payments",         // Kelola pembayaran
  "manage_exams",            // Kelola ujian
  "send_notifications",      // Kirim notifikasi
  "view_reports",            // Lihat laporan
  "export_data"              // Export data
]
```

**Can Access:**
- ✅ Semua halaman admin
- ✅ Manage admins (`/admin/manage-admins`)
- ✅ Verifikasi pembayaran
- ✅ Kelola ujian & nilai
- ✅ Kirim notifikasi
- ✅ Generate laporan
- ✅ Export data

**Default Email:**
```
admin@smk.sch.id
kepsek@smk.sch.id
```

---

### **2. Admin** (`admin`)

**Description:** Standard access untuk operasional harian.

**Permissions:**
```javascript
[
  "read",                    // Baca data
  "write",                   // Tulis/edit data
  "manage_payments",         // Kelola pembayaran
  "send_notifications",      // Kirim notifikasi
  "view_reports"             // Lihat laporan
]
```

**Can Access:**
- ✅ Dashboard pembayaran
- ✅ Verifikasi pembayaran
- ✅ Kirim notifikasi
- ✅ Lihat laporan
- ❌ Manage admins (reserved for super_admin)
- ❌ Delete data (reserved for super_admin)

**Default Email:**
```
operator@smk.sch.id
tu@smk.sch.id
```

---

### **3. Staff** (`staff`)

**Description:** Read-only access untuk monitoring.

**Permissions:**
```javascript
[
  "read",                    // Baca data
  "view_reports"             // Lihat laporan
]
```

**Can Access:**
- ✅ Lihat dashboard
- ✅ Lihat data pembayaran
- ✅ Lihat laporan
- ❌ Verifikasi pembayaran
- ❌ Edit data
- ❌ Kirim notifikasi

**Default Email:**
```
guru@smk.sch.id
staff@smk.sch.id
```

---

### **4. User** (`user`)

**Description:** Regular user (calon siswa).

**Permissions:**
```javascript
[
  "read"                     // Baca data sendiri
]
```

**Can Access:**
- ✅ Dashboard siswa
- ✅ Isi form pendaftaran
- ✅ Upload dokumen
- ✅ Lihat status pendaftaran
- ❌ Admin panel

---

## 🎨 Admin Navigation

### **Desktop Navigation:**

```
┌─────────────────────────────────────────────┐
│ [Logo] Beranda PPDB Jurusan Berita Profil  │
│                                             │
│          [Admin ▼] [User] [Logout]         │
└─────────────────────────────────────────────┘

Click "Admin" → Dropdown menu:
┌──────────────────────────────────┐
│ 🛡️ Admin Panel                  │
│    admin@smk.sch.id             │
├──────────────────────────────────┤
│ 💰 Pembayaran                   │
│    Kelola cicilan               │
│                                  │
│ 🔔 Notifikasi                   │
│    Kirim notifikasi             │
│                                  │
│ 📅 Jadwal Ujian                 │
│    Atur jadwal                  │
│                                  │
│ 📊 Nilai                        │
│    Input nilai                  │
│                                  │
│ 📈 Laporan                      │
│    Statistik & laporan          │
│                                  │
│ 👥 Kelola Admin                 │
│    Manage user (super_admin)    │
├──────────────────────────────────┤
│ Role: super_admin               │
└──────────────────────────────────┘
```

### **Mobile Navigation:**

```
┌─────────────────────┐
│ 🎓 SMK Nusantara   │
│    admin@...       │
├─────────────────────┤
│ 🏠 Beranda         │
│ 📄 PPDB            │
│ 📚 Jurusan         │
│ 📰 Berita          │
│ ℹ️ Profil          │
├─────────────────────┤
│ Admin Panel        │
│ 💰 Pembayaran      │
│ 🔔 Notifikasi      │
│ 📅 Jadwal Ujian    │
│ 📊 Nilai           │
│ 📈 Laporan         │
│ 👥 Kelola Admin    │
├─────────────────────┤
│ [Logout]           │
└─────────────────────┘
```

---

## 🔒 Route Protection

### **Admin Routes:**

```javascript
// App.jsx
<Route path="/admin/payments" element={
  <AdminRoute requiredRole="admin">
    <AdminPayments />
  </AdminRoute>
} />

<Route path="/admin/manage-admins" element={
  <AdminRoute requiredRole="super_admin">
    <ManageAdmins />
  </AdminRoute>
} />
```

### **AdminRoute Component:**

```javascript
// components/auth/ProtectedRoute.jsx
const AdminRoute = ({ children, requiredRole = 'admin' }) => {
  const { user, isAdmin, userData } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check role hierarchy
  const roleHierarchy = {
    user: 0,
    staff: 1,
    admin: 2,
    super_admin: 3
  };

  const userRoleLevel = roleHierarchy[userData?.role] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

  if (userRoleLevel < requiredRoleLevel) {
    return <Navigate to="/admin/payments" replace />;
  }

  return children;
};
```

---

## 📊 Permission Matrix

| Feature | super_admin | admin | staff | user |
|---------|-------------|-------|-------|------|
| View dashboard | ✅ | ✅ | ✅ | ✅ |
| View payments | ✅ | ✅ | ✅ | ❌ |
| Verify payments | ✅ | ✅ | ❌ | ❌ |
| Send notifications | ✅ | ✅ | ❌ | ❌ |
| Manage exams | ✅ | ❌ | ❌ | ❌ |
| Input grades | ✅ | ❌ | ❌ | ❌ |
| View reports | ✅ | ✅ | ✅ | ❌ |
| Export data | ✅ | ❌ | ❌ | ❌ |
| Manage admins | ✅ | ❌ | ❌ | ❌ |
| Delete data | ✅ | ❌ | ❌ | ❌ |

---

## 🛠️ Setup Admin Role

### **Via Firestore Console:**

```
1. Firebase Console → Firestore Database
2. Collection: users
3. Document: {UID}
4. Update fields:
   - role: "super_admin" | "admin" | "staff"
   - permissions: ["read", "write", ...]
   - active: true
5. Save
```

### **Via Browser Console:**

```javascript
// Get current user UID
import { auth } from '@/services/firebase';
const uid = auth.currentUser.uid;

// Update role
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const userRef = doc(db, 'users', uid);
await updateDoc(userRef, {
  role: 'admin', // or 'super_admin', 'staff'
  permissions: ['read', 'write', 'manage_payments'],
  active: true,
  updatedAt: new Date().toISOString()
});

console.log('✅ Role updated!');
```

---

## 🧪 Test Role Access

### **Test 1: Super Admin Access**

```
1. Login: admin@smk.sch.id
2. Check dropdown menu → All 6 items visible ✅
3. Access /admin/manage-admins → Success ✅
4. Verify payment → Success ✅
```

### **Test 2: Admin Access**

```
1. Login: operator@smk.sch.id
2. Check dropdown menu → 5 items (no Kelola Admin) ✅
3. Access /admin/manage-admins → Redirect to /admin/payments ✅
4. Verify payment → Success ✅
```

### **Test 3: Staff Access**

```
1. Login: guru@smk.sch.id
2. Check dropdown menu → View only ✅
3. Try verify payment → Permission denied ✅
4. View reports → Success ✅
```

---

## 🔐 Security Best Practices

1. ✅ **Minimum 2 super admins** - Backup access
2. ✅ **Regular role audit** - Review every month
3. ✅ **Deactivate ex-staff** - Set active: false
4. ✅ **Use institutional emails** - @smk.sch.id
5. ✅ **Log admin actions** - Track who did what
6. ✅ **Role-based UI** - Hide features user can't access

---

## 📝 Role Assignment Workflow

```
New Admin Request
       ↓
Super Admin Approval
       ↓
Firestore Update:
  - role: "admin"
  - permissions: [...]
  - active: true
       ↓
User Logout & Login
       ↓
New role active ✅
```

---

## 🚀 Quick Commands

### **Check User Role:**
```javascript
// Browser console
import { auth } from '@/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

const user = auth.currentUser;
const userRef = doc(db, 'users', user.uid);
const userSnap = await getDoc(userRef);

console.log('Role:', userSnap.data()?.role);
console.log('Permissions:', userSnap.data()?.permissions);
console.log('Active:', userSnap.data()?.active);
```

### **List All Admins:**
```javascript
// Browser console
import { getAllAdmins } from '@/services/adminService';

const admins = await getAllAdmins();
console.log('Admins:', admins);
```

### **Update User Role:**
```javascript
// Browser console
import { updateUserRole } from '@/services/adminService';

const result = await updateUserRole('UID_USER', 'admin');
console.log('Result:', result);
```

---

## 📧 Email Templates by Role

### **Super Admin:**
```
Subject: Admin Access Granted

Hi {name},

Anda telah diangkat sebagai Super Admin PPDB System.

Role: super_admin
Permissions: Full Access
Email: {email}

Silakan login di: http://localhost:5173/admin/login
```

### **Admin:**
```
Subject: Admin Access Granted

Hi {name},

Anda telah diangkat sebagai Admin PPDB System.

Role: admin
Permissions: Standard Access
Email: {email}

Silakan login di: http://localhost:5173/admin/login
```

---

**Last Updated:** 2024
**Version:** 2.0.0 (Role-Based Navigation)
**Status:** ✅ Production Ready
