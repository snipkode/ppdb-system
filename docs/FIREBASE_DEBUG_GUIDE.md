# 🔧 Firebase Debug & Development Guide

## Debug Features yang Ditambahkan

### 1. Debug Mode (Otomatis Aktif di Development)

**File:** `src/services/firebase.js`

**Features:**
- ✅ Console logging saat Firebase initialize
- ✅ Auth persistence check
- ✅ Firestore multi-tab persistence
- ✅ Error handling dengan emoji indicators

**Console Output (Development):**
```
🔥 Firebase initialized
📝 Config: { projectId: 'x-ppdb', authDomain: 'x-ppdb.firebaseapp.com' }
✅ Auth persistence enabled (LOCAL)
✅ Firestore multi-tab persistence enabled
```

---

### 2. Firebase Debug Tools

**File:** `src/services/firebaseDebug.js`

**Helper Functions (Bisa dipake di browser console):**

#### `firebaseDebug.getCurrentUser()`
Cek user yang sedang login
```javascript
// Di browser console
firebaseDebug.getCurrentUser()

// Output:
👤 Current User: {
  uid: "abc123",
  displayName: "John Doe",
  email: "john@gmail.com",
  photoURL: "https://...",
  providerData: [...]
}
```

#### `firebaseDebug.checkAuthState()`
Cek status authentication
```javascript
// Di browser console
await firebaseDebug.checkAuthState()

// Output:
🔐 Auth State: LOGGED IN
  - UID: abc123
  - Email: john@gmail.com
  - Name: John Doe
  - Provider: google.com
```

#### `firebaseDebug.testFirestore()`
Test koneksi Firestore
```javascript
// Di browser console
await firebaseDebug.testFirestore()

// Output:
✅ Firestore connection: OK
   Documents in "test" collection: 0
```

#### `firebaseDebug.listCollections()`
List semua collection di Firestore
```javascript
// Di browser console
await firebaseDebug.listCollections()

// Output:
📁 Firestore Collections:
   - students
   - settings
   - exams
   - payments
```

#### `firebaseDebug.clearLocalData()`
Clear data lokal (hanya untuk emulators)
```javascript
// Di browser console
await firebaseDebug.clearLocalData()

// Output:
✅ Local data cleared
```

---

### 3. Firebase Emulator Support

**Setup Emulators:**

1. **Install Firebase Tools:**
```bash
npm install -g firebase-tools
```

2. **Login Firebase:**
```bash
firebase login
```

3. **Start Emulators:**
```bash
cd /data/data/com.termux/files/home/ppdb-system
firebase emulators:start
```

4. **Enable Emulators di App:**

Buat file `.env` (copy dari `.env.example`):
```env
VITE_USE_FIREBASE_EMULATORS=true
```

5. **Access Emulator UI:**
```
http://127.0.0.1:4000
```

**Emulator Ports:**
- Auth: `http://127.0.0.1:9099`
- Firestore: `http://127.0.0.1:8080`
- Storage: `http://127.0.0.1:9199`
- Emulator UI: `http://127.0.0.1:4000`

---

### 4. Debug di Browser Console

**Variables yang tersedia:**
```javascript
// Firebase instances
window.firebase // (if using CDN)

// Debug helpers (otomatis load di development)
firebaseDebug.getCurrentUser()
firebaseDebug.checkAuthState()
firebaseDebug.testFirestore()
firebaseDebug.listCollections()
firebaseDebug.clearLocalData()
```

---

### 5. Environment Variables

**File:** `.env.example` (sudah dibuat)

**Copy ke `.env`:**
```bash
cd frontend
cp .env.example .env
```

**Edit `.env` sesuai kebutuhan:**
```env
# Firebase Config (dari Firebase Console)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=x-ppdb
...

# Emulators (true untuk development)
VITE_USE_FIREBASE_EMULATORS=false

# EmailJS (optional)
VITE_EMAILJS_PUBLIC_KEY=...
```

---

## 🔍 Debug Scenarios

### Scenario 1: Cek Kenapa Login Gagal

```javascript
// 1. Cek auth state
firebaseDebug.checkAuthState()

// 2. Cek current user
firebaseDebug.getCurrentUser()

// 3. Lihat console untuk error details
// Error akan muncul dengan emoji ❌
```

### Scenario 2: Cek Firestore Connection

```javascript
// 1. Test koneksi
firebaseDebug.testFirestore()

// 2. List collections
firebaseDebug.listCollections()

// 3. Cek console untuk error
```

### Scenario 3: Development dengan Emulators

```bash
# Terminal 1: Start emulators
firebase emulators:start

# Terminal 2: Run app
cd frontend
npm run dev

# Set VITE_USE_FIREBASE_EMULATORS=true di .env
```

---

## 📊 Console Log Reference

### Success Logs
```
🔥 Firebase initialized
✅ Auth persistence enabled (LOCAL)
✅ Firestore multi-tab persistence enabled
🔧 Firebase: Using Emulators for development
✅ Auth Emulator: http://127.0.0.1:9099
✅ Firestore Emulator: http://127.0.0.1:8080
✅ Storage Emulator: http://127.0.0.1:9199
```

### Warning Logs
```
⚠️ Firestore persistence: Multiple tabs open
⚠️ Firestore persistence: Browser doesn't support
⚠️ This function only works with emulators enabled
```

### Error Logs
```
❌ Auth persistence error: ...
❌ Firestore persistence error: ...
❌ Failed to connect to Firebase Emulators: ...
❌ Failed to list collections: ...
```

---

## 🛠️ Troubleshooting

### Problem: "Firebase not initialized"

**Solution:**
```javascript
// Cek apakah Firebase sudah initialize
import app from '@/services/firebase'
console.log('Firebase app:', app)
console.log('Firebase options:', app.options)
```

### Problem: "Auth persistence not working"

**Solution:**
```javascript
// Cek persistence setting
import { auth } from '@/services/firebase'
import { getAuth } from 'firebase/auth'
console.log('Auth instance:', auth)
console.log('Current user:', auth.currentUser)
```

### Problem: "Emulators not connecting"

**Solution:**
```bash
# 1. Pastikan emulators running
firebase emulators:start

# 2. Cek .env
VITE_USE_FIREBASE_EMULATORS=true

# 3. Restart dev server
npm run dev
```

---

## 📝 Best Practices

### Development Mode
- ✅ Enable debug logging
- ✅ Use emulators untuk testing
- ✅ Clear local data setelah testing
- ✅ Check console untuk errors

### Production Mode
- ❌ Disable debug logging
- ❌ Jangan use emulators
- ❌ Jangan clear data
- ✅ Monitor errors dengan Sentry/Firebase Crashlytics

---

## 🎯 Quick Commands

### Development
```bash
# Start dev server
npm run dev

# Start emulators
firebase emulators:start

# Build for production
npm run build

# Preview production build
npm run preview
```

### Debug Commands (Browser Console)
```javascript
// Auth
firebaseDebug.getCurrentUser()
firebaseDebug.checkAuthState()

// Firestore
firebaseDebug.testFirestore()
firebaseDebug.listCollections()

// Cleanup
firebaseDebug.clearLocalData()
```

---

## 📚 Resources

- [Firebase Debug Guide](https://firebase.google.com/docs/reference/js)
- [Firebase Emulators](https://firebase.google.com/docs/emulator-suite)
- [Firestore Debug](https://firebase.google.com/docs/firestore/manage-data/debugging)
- [Auth Debug](https://firebase.google.com/docs/auth/web/manage-users)

---

**Status:** ✅ Debug Tools Ready  
**Mode:** Development (Auto) / Production (Manual)  
**Emulators:** Optional (via .env)

Happy Debugging! 🐛🔍
