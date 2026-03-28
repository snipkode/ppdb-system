# Firestore Security Rules - PPDB Online

Deploy rules ini ke Firebase Console → Firestore Database → Rules

## Production Rules

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

    // Students collection
    match /students/{studentId} {

      // Allow read for owner or admin
      allow read: if request.auth != null &&
                     (isAdmin() ||
                      request.auth.uid == resource.data.user_id);

      // Allow create during PPDB period (public registration)
      allow create: if request.time >= Timestamp.date(2024, 1, 1) &&
                       request.time < Timestamp.date(2025, 1, 1) &&
                       request.resource.data.keys().hasAll(['nomor_pendaftaran', 'data_siswa', 'data_ortu']) &&
                       request.resource.data.data_siswa.nama_lengkap is string &&
                       request.resource.data.data_siswa.nama_lengkap.size() > 3 &&
                       request.resource.data.data_siswa.nisn is string;

      // Allow update only for admin
      allow update: if request.auth != null && isAdmin();

      // Allow delete only for admin
      allow delete: if request.auth != null && isAdmin();
    }

    // Settings collection - read public, write admin only
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin();
    }

    // Announcements collection
    match /announcements/{announcementId} {
      // Allow read if published or user is admin
      allow read: if resource.data.published == true ||
                     (request.auth != null && isAdmin());

      // Write: Admin only
      allow write: if request.auth != null && isAdmin();
    }

    // Gallery collection
    match /gallery/{galleryId} {
      // Allow read if published
      allow read: if resource.data.published == true;

      // Write: Admin only
      allow write: if request.auth != null && isAdmin();
    }

    // Exams collection
    match /exams/{examId} {
      // Allow read for owner or admin
      allow read: if request.auth != null &&
                     (isAdmin() ||
                      request.auth.uid == resource.data.student_id);

      // Write: Admin only
      allow write: if request.auth != null && isAdmin();
    }

    // Contacts collection
    match /contacts/{contactId} {
      // Allow create for anyone (contact form)
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message']) &&
                       request.resource.data.name is string &&
                       request.resource.data.email is string &&
                       request.resource.data.message is string &&
                       request.resource.data.message.size() > 10;

      // Read/Update/Delete: Admin only
      allow read, update, delete: if request.auth != null && isAdmin();
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
  }
}
```

## Test Mode (Development Only)

**⚠️ WARNING:** Gunakan ini HANYA untuk development/testing. Jangan deploy ke production!

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < Timestamp.date(2024, 12, 31);
    }
  }
}
```

## Deployment Steps

### Via Firebase Console (Recommended)

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Pilih project **x-ppdb**
3. Klik **Firestore Database** di sidebar
4. Klik tab **Rules**
5. Copy-paste rules di atas
6. Click **Publish**

### Via Firebase CLI

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init Firestore rules
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## Storage Rules

Deploy ke Firebase Console → Storage → Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Student documents (max 2MB)
    match /students/{studentId}/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                      request.resource.size < 2 * 1024 * 1024 && // 2MB
                      request.resource.contentType.matches('image/.*|application/pdf');
    }
    
    // Public files (logos, etc)
    match /public/{file} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }
    
    // Temp uploads (cleanup via Cloud Function)
    match /temp/{file} {
      allow read, write: if request.auth != null &&
                            request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

## Testing Rules

### Test 1: Create Student (Public)
```javascript
// Should SUCCEED during PPDB period
match /students/{studentId} {
  allow create: if request.time >= Timestamp.date(2024, 1, 1) &&
                   request.time < Timestamp.date(2025, 1, 1);
}
```

### Test 2: Update Student (Admin Only)
```javascript
// Should SUCCEED for admin, FAIL for others
match /students/{studentId} {
  allow update: if request.auth != null && isAdmin();
}
```

### Test 3: Read Settings (Public)
```javascript
// Should SUCCEED for anyone
match /settings/{settingId} {
  allow read: if true;
}
```

## Common Issues

### Issue: "Missing or insufficient permissions"
**Solution:** Check if:
- User is authenticated (if required)
- User has admin role (if required)
- Request time is within allowed period
- All required fields are present

### Issue: "Invalid argument"
**Solution:** Check data types match schema:
- String fields are strings
- Number fields are numbers
- Timestamp fields are timestamps

### Issue: "Exceeded maximum size"
**Solution:** Check file size < limit (2MB for documents)

---

**Last Updated:** 2024-03-28
**Project:** x-ppdb
**Status:** Ready for deployment ✅
