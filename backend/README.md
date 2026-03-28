# PPDB Online - Backend API

Express.js backend untuk sistem PPDB Online dengan Firebase Admin SDK dan Multer untuk file uploads.

## 🚀 Fitur

- **REST API** dengan Express.js
- **Firebase Admin SDK** untuk Firestore dan Authentication
- **Multer** untuk handling file uploads
- **Email Notifications** dengan Nodemailer/SendGrid
- **CORS** dan **Helmet** untuk security
- **Rate Limiting** untuk proteksi API
- **JWT Authentication** via Firebase Auth

## 📁 Struktur Folder

```
backend/
├── src/
│   ├── config/
│   │   ├── firebase.js      # Firebase Admin configuration
│   │   ├── multer.js        # Multer upload configuration
│   │   └── email.js         # Email service configuration
│   ├── routes/
│   │   ├── payments.js      # Payment endpoints
│   │   ├── notifications.js # Notification endpoints
│   │   ├── documents.js     # Document upload endpoints
│   │   └── students.js      # Student management endpoints
│   └── server.js            # Main Express server
├── uploads/                 # Uploaded files (auto-created)
├── .env                     # Environment variables
├── .env.example             # Example environment variables
└── package.json
```

## 🛠️ Instalasi

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` ke `.env` dan sesuaikan:

```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi Anda:

```env
# Server
PORT=5000
NODE_ENV=development

# Firebase Admin SDK
# Download dari: Firebase Console > Project Settings > Service Accounts > Generate New Private Key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Email (Pilih salah satu)
# Option 1: SMTP
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Option 2: SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

EMAIL_FROM="PPDB Online <noreply@yourdomain.com>"

# Frontend URL (untuk CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. Jalankan Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/payments/upload` | Upload bukti transfer | Student |
| POST | `/api/payments/:id/verify` | Verify payment (Admin) | Admin |
| GET | `/api/payments/pending` | Get pending payments | Admin |

### Notifications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/notifications/test-email` | Send test email | Admin |
| POST | `/api/notifications/send` | Send notification | Admin |
| GET | `/api/notifications/settings` | Get settings | Admin |
| PUT | `/api/notifications/settings` | Update settings | Admin |
| GET | `/api/notifications` | Get user notifications | User |
| PUT | `/api/notifications/:id/read` | Mark as read | User |

### Documents

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/documents/upload` | Upload document | Student |
| GET | `/api/documents/:studentId` | Get documents | Student |

### Students

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/students` | Get all students (with filters) | Admin |
| GET | `/api/students/:id` | Get student by ID | Owner/Admin |
| PUT | `/api/students/:id` | Update student | Owner/Admin |
| GET | `/api/students/stats/overview` | Get statistics | Admin |

## 🔐 Authentication

API menggunakan Firebase Authentication JWT Token.

**Header:**
```
Authorization: Bearer <firebase-id-token>
```

## 📤 File Upload

File uploads menggunakan Multer dengan konfigurasi:

- **Max file size:** 2MB
- **Allowed formats:** JPG, PNG, PDF
- **Storage location:** `uploads/` folder
- **Auto-organized by type:** payments/, documents/, students/, misc/

## 📧 Email Service

Support 2 email service:

### 1. SMTP (Gmail)
- Setup App Password di Gmail
- Gunakan untuk volume email rendah

### 2. SendGrid
- Lebih reliable untuk production
- Free tier: 100 emails/hari

## 🔒 Security Features

- **Helmet.js** - HTTP security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent DDoS/brute force
- **JWT Validation** - Firebase Auth token verification
- **Role-based Access** - Admin vs User endpoints
- **File Type Validation** - Prevent malicious uploads

## 🧪 Testing API

### Upload Bukti Transfer
```bash
curl -X POST http://localhost:5000/api/payments/upload \
  -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
  -F "bukti_transfer=@/path/to/file.jpg" \
  -F "studentId=STUDENT_ID"
```

### Verify Payment (Admin)
```bash
curl -X POST http://localhost:5000/api/payments/STUDENT_ID/verify \
  -H "Authorization: Bearer ADMIN_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"paid","rejected_reason":""}'
```

### Send Test Email (Admin)
```bash
curl -X POST http://localhost:5000/api/notifications/test-email \
  -H "Authorization: Bearer ADMIN_FIREBASE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📝 Firebase Admin Setup

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Settings > Service Accounts
4. Generate New Private Key
5. Simpan file JSON
6. Extract values ke `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

## 🚨 Troubleshooting

### Error: "File size too large"
- Check `MAX_FILE_SIZE` di `.env`
- Default: 2MB

### Error: "Email transporter not initialized"
- Check `.env` email configuration
- Pastikan EMAIL_USER dan EMAIL_PASSWORD terisi

### Error: "Invalid token"
- Token Firebase expired
- Re-login dari frontend

### CORS Error
- Check `FRONTEND_URL` di `.env`
- Pastikan sesuai dengan URL frontend

## 📄 License

ISC
