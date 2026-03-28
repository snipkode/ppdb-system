# PPDB Online - Sistem Penerimaan Peserta Didik Baru

Sistem PPDB modern dengan React + Firebase Firestore.

## 🚀 Tech Stack

- **Frontend:**
  - React 18
  - Vite
  - Tailwind CSS
  - Zustand (State Management)
  - React Router DOM
  - React Icons

- **Backend:**
  - Firebase Firestore (Database)
  - Firebase Authentication (Optional)
  - Firebase Hosting (Optional)

## 📁 Struktur Project

```
ppdb-system/
├── README.md              # Dokumentasi ini
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── services/      # API & Firebase services
    │   ├── stores/        # Zustand stores
    │   ├── App.jsx        # Main app
    │   └── main.jsx       # Entry point
    └── package.json
```

## 🔧 Setup & Instalasi

### 1. Setup Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Create new project: `PPDB Online`
3. Enable **Firestore Database** (Test mode untuk development)
4. Dapatkan Firebase Config dari Project Settings

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Setup Firebase Config

Buat file `frontend/src/services/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
```

### 4. Run Development

```bash
cd frontend
npm run dev
```

## 📱 Features

- ✅ Responsive Design (Mobile & Desktop)
- ✅ Live Statistics Dashboard
- ✅ Online Registration Form
- ✅ Status Check by ID
- ✅ SVG Animations
- ✅ Modern UI with Tailwind CSS

## 📊 Firestore Schema

Collection: `students`

| Field | Type | Description |
|-------|------|-------------|
| nama_lengkap | String | Student name |
| nisn | String | Student ID |
| tanggal_lahir | String | Birth date |
| jenis_kelamin | String | L/P |
| agama | String | Religion |
| alamat | String | Address |
| kota | String | City |
| provinsi | String | Province |
| kode_pos | String | Postal code |
| nama_ortu | String | Parent name |
| no_telp_ortu | String | Phone |
| email_ortu | String | Email |
| asal_sekolah | String | Previous school |
| jurusan_dipilih | String | Major |
| tanggal_daftar | String | Registration date |
| status | String | pending/accepted/rejected |
| keterangan | String | Notes |

## 🔐 Firestore Security Rules

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

## 🚀 Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📝 License

MIT License

---

**Built with ❤️ using React, Tailwind CSS, and Firebase**
