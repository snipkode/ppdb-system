# PPDB Online - Sistem Penerimaan Peserta Didik Baru

Sistem PPDB modern dengan React + Firebase Firestore + Express Backend.

[![Status](https://img.shields.io/badge/status-production%20ready-green)]()
[![Version](https://img.shields.io/badge/version-2.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-yellow)]()

## 🚀 Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Zustand** - State Management
- **React Router DOM** - Routing
- **React Icons** - Icons
- **Firebase SDK** - Database & Storage

### Backend
- **Node.js + Express** - REST API
- **Firebase Admin SDK** - Authentication & Database
- **Multer** - File Upload
- **Nodemailer** - Email Service
- **Helmet + CORS** - Security

### Database
- **Firebase Firestore** - NoSQL Database
- **Firebase Storage** - File Storage

## 📁 Project Structure

```
ppdb-system/
├── README.md              # This file
├── docs/                  # Documentation
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── admin/     # Admin components
│   │   │   ├── home/      # Home components
│   │   │   ├── layout/    # Layout components
│   │   │   └── ppdb/      # PPDB components
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin pages
│   │   │   └── ...
│   │   ├── services/      # API & Firebase services
│   │   ├── stores/        # Zustand stores
│   │   └── App.jsx        # Main app
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Express backend
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── routes/        # API routes
│   │   └── server.js      # Entry point
│   └── package.json
└── functions/             # Firebase Cloud Functions
```

## ✨ Features

### Public Features
- ✅ **Home Page** - Modern landing page with animations
- ✅ **PPDB Information** - Complete registration info
- ✅ **Online Registration** - Multi-step form (7 steps)
- ✅ **Status Checker** - Check application status
- ✅ **Payment Upload** - Upload payment proof
- ✅ **Exam Card** - Download exam card

### Admin Features
- ✅ **Payment Management** - Verify/reject payments
- ✅ **Exam Schedule** - Create and manage exams
- ✅ **Exam Results** - Enter and manage scores
- ✅ **Notifications** - Email notifications
- ✅ **Reports & Analytics** - Charts and exports (XLSX, PDF)

### Student Flow
```
Register → Payment → Exam → Results → Acceptance
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase Project

### 1. Clone Repository

```bash
git clone <repository-url>
cd ppdb-system
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/src/services/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
export const storage = getStorage(app);
export default app;
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Server
PORT=5000
NODE_ENV=development

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. Run Development

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
npm run dev
```

### 5. Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 📋 API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Payments
- `POST /api/payments/upload` - Upload payment proof
- `POST /api/payments/:id/verify` - Verify payment
- `GET /api/payments/pending` - Get pending payments

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/:studentId` - Get student documents

### Notifications
- `POST /api/notifications/send` - Send notification
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read

## 🎨 Design Features

- **Modern Glassmorphism** - Frosted glass effects
- **Gradient Backgrounds** - Vibrant color gradients
- **SVG Animations** - Smooth animated illustrations
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Theme support

## 📊 Database Schema

### Collections

**students**
```javascript
{
  nomor_pendaftaran: "PPDB-1234567890",
  data_siswa: { ... },
  data_orang_tua: { ... },
  data_sekolah: { ... },
  pilihan_jurusan: [...],
  dokumen: [...],
  pembayaran: {
    status: "pending|paid|rejected",
    bukti_url: "...",
    uploaded_at: timestamp
  },
  status: "submitted|verified|exam|accepted|rejected",
  created_at: timestamp,
  updated_at: timestamp
}
```

**exams**
```javascript
{
  student_id: "...",
  nomor_peserta: "EXAM-1234567890",
  tanggal_ujian: "2024-01-15",
  waktu_ujian: "08:00",
  ruangan: "R.101",
  lokasi: "Gedung Utama",
  mata_ujian: ["TPQ", "Akademik", "Wawancara"],
  nilai: {
    tpq: 85,
    akademik: 90,
    wawancara: 88,
    total: 87.67
  },
  status: "scheduled|completed",
  created_at: timestamp
}
```

**notifications**
```javascript
{
  user_id: "...",
  title: "Payment Verified",
  message: "Your payment has been verified",
  type: "payment|exam|general",
  read: false,
  created_at: timestamp
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Connect repository
2. Build command: `npm run build`
3. Output directory: `dist`

### Backend (Railway/Render)

1. Connect repository
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📝 Documentation

- [Navigation Report](frontend/NAVIGATION_REPORT.md)
- [API Fix Summary](frontend/API_FIX_SUMMARY.md)
- [Backend Import Fix](backend/IMPORT_FIX.md)
- [Migration Guide](MIGRATION_GUIDE.md)
- [Phase 3 Complete](PHASE_3_COMPLETE.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Developed for SMK Nusantara PPDB System.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Contact: info@smknusantara.sch.id

---

**Last Updated:** March 28, 2026
**Version:** 2.0.0
**Status:** ✅ Production Ready
