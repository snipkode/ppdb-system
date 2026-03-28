# Firebase Setup Guide - PPDB Online

## 📋 Prerequisites

1. Google Account (untuk Firebase)
2. Node.js & npm
3. Code editor

## 🚀 Langkah 1: Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** atau **"Create a project"**
3. Nama project: `PPDB Online`
4. Click **Continue**
5. (Optional) Enable Google Analytics
6. Click **Create project** → **Continue**

## 🔥 Langkah 2: Enable Firestore Database

1. Di Firebase Console, pilih project Anda
2. Left sidebar → **Firestore Database**
3. Click **Create database**
4. Pilih **Start in test mode** (untuk development)
5. Location: **asia-southeast2 (Singapore)** ← Recommended untuk Indonesia
6. Click **Enable**

## ⚙️ Langkah 3: Dapatkan Firebase Config

1. Project Settings (⚙️ icon)
2. Scroll ke **Your apps**
3. Click **Web** icon (`</>`)
4. Register app:
   - App nickname: `PPDB Frontend`
   - Click **Register app**
5. Copy `firebaseConfig` object

## 💻 Langkah 4: Update Firebase Config

Edit file `frontend/src/services/firebase.js`:

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

Paste config dari Firebase Console.

## 🧪 Langkah 5: Test Aplikasi

```bash
cd frontend
npm run dev
```

Buka browser: `http://localhost:5173`

Test fitur:
1. ✅ Lihat statistik di homepage
2. ✅ Daftar siswa baru
3. ✅ Cek Firestore di Firebase Console

## 🔐 Langkah 6: Update Security Rules (Production)

Di Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

Click **Publish**.

## 🚀 Deploy ke Firebase Hosting (Optional)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init
firebase init hosting

# Setup:
# - Public directory: dist
# - SPA: Yes
# - GitHub: No

# Build & Deploy
npm run build
firebase deploy
```

## 📊 Firestore Data Structure

Collection: `students`

```
students/
├── {auto-id}/
│   ├── nama_lengkap: "John Doe"
│   ├── nisn: "1234567890"
│   ├── tanggal_lahir: "2005-01-01"
│   ├── jenis_kelamin: "L"
│   ├── agama: "Islam"
│   ├── alamat: "Jl. Contoh"
│   ├── kota: "Jakarta"
│   ├── provinsi: "DKI Jakarta"
│   ├── kode_pos: "12345"
│   ├── nama_ortu: "Jane Doe"
│   ├── no_telp_ortu: "081234567890"
│   ├── email_ortu: "parent@example.com"
│   ├── asal_sekolah: "SMP 1"
│   ├── jurusan_dipilih: "RPL"
│   ├── tanggal_daftar: "2024-01-15"
│   ├── status: "pending"
│   └── keterangan: ""
```

## ✅ Checklist

- [ ] Buat Firebase Project
- [ ] Enable Firestore
- [ ] Copy Firebase Config
- [ ] Update `firebase.js`
- [ ] Test di browser
- [ ] Update Security Rules
- [ ] Deploy (optional)

---

**Happy Coding! 🎉**
