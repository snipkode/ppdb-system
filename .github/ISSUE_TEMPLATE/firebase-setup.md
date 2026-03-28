## Task: Setup Firebase Project

Ini adalah task **PERTAMA** yang harus dilakukan sebelum mulai development.

### Checklist

#### 1. Buat Firebase Project (15 menit)
- [ ] Buka https://console.firebase.google.com
- [ ] Click "Add project" atau "Create a project"
- [ ] Nama: `PPDB Online`
- [ ] Enable Google Analytics (optional)
- [ ] Create project

#### 2. Enable Firestore Database
- [ ] Buka Firestore Database di sidebar
- [ ] Click "Create database"
- [ ] Pilih **Start in test mode** (untuk development)
- [ ] Location: **asia-southeast2 (Singapore)** ← Recommended untuk Indonesia
- [ ] Click **Enable**

#### 3. Enable Firebase Storage
- [ ] Buka Storage di sidebar
- [ ] Click "Get started"
- [ ] Pilih **Start in test mode**
- [ ] Location: Same as Firestore (asia-southeast2)
- [ ] Click **Done**

#### 4. Dapatkan Firebase Config
- [ ] Project Settings (⚙️ icon)
- [ ] Scroll ke **Your apps**
- [ ] Click **Web** icon (`</>`)
- [ ] App nickname: `PPDB Frontend`
- [ ] Register app
- [ ] Copy `firebaseConfig` object

#### 5. Update Code
- [ ] Paste config ke `frontend/src/services/firebase.js`
- [ ] Verify imports di `frontend/src/services/api.js`
- [ ] Test: `npm run dev`

#### 6. Setup Security Rules (Optional untuk development)
- [ ] Update Firestore Rules (lihat FIREBASE_SCHEMA.md)
- [ ] Update Storage Rules (lihat FIREBASE_SCHEMA.md)

### Files to Update

**frontend/src/services/firebase.js:**
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Acceptance Criteria
- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Storage enabled
- [ ] Config pasted ke firebase.js
- [ ] App dapat connect ke Firebase (no errors di console)

### Resources
- FIREBASE_SETUP.md - Panduan lengkap
- FIREBASE_SCHEMA.md - Security rules
- https://console.firebase.google.com

### Next Steps
Setelah Firebase setup, lanjut ke development Phase 1 Sprint 1.1 (Landing Page)
