# 🔄 Migrasi: Firebase Functions → Express.js Backend

Dokumen ini menjelaskan proses migrasi dari Firebase Cloud Functions ke Express.js backend dengan Firebase Admin SDK.

## 📋 Ringkasan Perubahan

### Sebelum (Firebase Functions)
- ⚡ Serverless architecture
- 🔥 Firebase-native integration
- 📦 Terikat dengan Firebase ecosystem
- 💰 Pay-per-use pricing
- 🚀 Auto-scaling
- 📝 Terbatas pada Node.js runtime versi Firebase

### Sesudah (Express.js + Firebase Admin)
- 🖥️ Full control atas server
- 🔧 Customizable middleware
- 📦 Flexible deployment options
- 💰 Fixed server costs
- 🚀 Manual scaling (atau auto dengan container orchestration)
- 📝 Full Node.js ecosystem

## 🏗️ Arsitektur Hybrid

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
│                     http://localhost:5173                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │ (Axios + Firebase Auth Token)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Express.js)                         │
│                    http://localhost:5000                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes:                                              │   │
│  │  - /api/payments      (Payment handling)             │   │
│  │  - /api/notifications (Email & notifications)        │   │
│  │  - /api/documents     (File uploads)                 │   │
│  │  - /api/students      (Student management)           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware:                                          │   │
│  │  - Multer (File uploads)                             │   │
│  │  - CORS                                               │   │
│  │  - Helmet (Security)                                  │   │
│  │  - Rate Limiting                                      │   │
│  │  - JWT Verification (Firebase Auth)                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Firebase Admin SDK
                              │ (gRPC/REST)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  FIREBASE (Backend Services)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Firestore   │  │   Storage    │  │     Auth     │      │
│  │  (Database)  │  │  (Files)     │  │  (Users)     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Komponen Backend

### 1. Express Server (`src/server.js`)
- Main server entry point
- Middleware configuration
- Route mounting
- Error handling

### 2. Firebase Config (`src/config/firebase.js`)
- Firebase Admin SDK initialization
- Service account authentication
- Exports: `db`, `storage`, `auth`

### 3. Multer Config (`src/config/multer.js`)
- File upload handling
- Storage destination
- File type filtering
- Size limits

### 4. Email Service (`src/config/email.js`)
- Nodemailer (SMTP) integration
- SendGrid integration
- Email templates
- Universal send method

### 5. Routes

#### Payments (`src/routes/payments.js`)
```javascript
POST   /api/payments/upload          // Upload bukti transfer
POST   /api/payments/:id/verify      // Verify payment (Admin)
GET    /api/payments/pending         // Get pending payments (Admin)
```

#### Notifications (`src/routes/notifications.js`)
```javascript
POST   /api/notifications/test-email  // Send test email
POST   /api/notifications/send        // Send notification
GET    /api/notifications/settings    // Get settings
PUT    /api/notifications/settings    // Update settings
GET    /api/notifications             // Get user notifications
PUT    /api/notifications/:id/read    // Mark as read
```

#### Documents (`src/routes/documents.js`)
```javascript
POST   /api/documents/upload         // Upload document
GET    /api/documents/:studentId     // Get documents
```

#### Students (`src/routes/students.js`)
```javascript
GET    /api/students                 // Get all students (Admin)
GET    /api/students/:id             // Get student by ID
PUT    /api/students/:id             // Update student
GET    /api/students/stats/overview  // Get statistics (Admin)
```

## 🔐 Authentication Flow

1. **Login di Frontend** → Firebase Auth
2. **Dapatkan ID Token** → `firebase.auth().currentUser.getIdToken()`
3. **Simpan Token** → `localStorage`
4. **Setiap Request** → Attach token di header: `Authorization: Bearer <token>`
5. **Backend Verify** → `admin.auth().verifyIdToken(token)`
6. **Access User Info** → `req.user.uid`, `req.user.admin`

## 📤 File Upload Process

### Firebase Functions (Old)
```javascript
// Frontend langsung upload ke Firebase Storage
const fileRef = ref(storage, `payments/${file.name}`);
await uploadBytes(fileRef, file);
const url = await getDownloadURL(fileRef);
```

### Express + Multer (New)
```javascript
// Frontend upload ke Express backend
const formData = new FormData();
formData.append('bukti_transfer', file);
formData.append('studentId', studentId);
await api.post('/payments/upload', formData);

// Backend handle dengan Multer
// File disimpan di: uploads/payments/<timestamp>_<filename>
// Path disimpan ke Firestore
```

## 📧 Email Notification Process

### Firebase Functions (Old)
```javascript
// Trigger Firestore document changes
exports.onPaymentStatusChanged = functions.firestore
  .document('students/{studentId}')
  .onUpdate(async (change, context) => {
    // Send email
  });
```

### Express Backend (New)
```javascript
// API call dari frontend setelah update Firestore
await paymentAPI.verifyPayment(studentId, 'paid');
// Backend send email via Nodemailer/SendGrid
```

## 🚀 Deployment Options

### Option 1: VPS (Virtual Private Server)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone <your-repo>
cd ppdb-system/backend

# Install dependencies
npm install

# Setup .env
cp .env.example .env
# Edit .env dengan credentials

# Run with PM2
npm install -g pm2
pm2 start src/server.js --name ppdb-backend
pm2 save
pm2 startup
```

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

```bash
docker build -t ppdb-backend .
docker run -p 5000:5000 --env-file .env ppdb-backend
```

### Option 3: Cloud Run (GCP)
```bash
# Build container
gcloud builds submit --tag gcr.io/PROJECT_ID/ppdb-backend

# Deploy
gcloud run deploy ppdb-backend \
  --image gcr.io/PROJECT_ID/ppdb-backend \
  --platform managed \
  --region asia-southeast2 \
  --allow-unauthenticated
```

### Option 4: Railway/Render/Heroku
```bash
# Connect GitHub repo
# Platform akan auto-detect Node.js
# Setup environment variables di dashboard
# Auto deploy on push
```

## 🔧 Setup Guide

### 1. Firebase Admin SDK Setup

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project `x-ppdb`
3. Settings ⚙️ > Service Accounts
4. Click "Generate New Private Key"
5. Download JSON file
6. Extract values ke `.env`:

```env
FIREBASE_PROJECT_ID=x-ppdb
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@x-ppdb.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 2. Email Setup (SMTP - Gmail)

1. Login Gmail
2. Enable 2-Factor Authentication
3. Generate App Password:
   - myaccount.google.com/apppasswords
   - Select "Mail" dan "Other (Custom name)"
   - Copy 16-character password
4. Update `.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop  # 16-char app password
```

### 3. Email Setup (SendGrid)

1. Sign up [SendGrid](https://sendgrid.com/)
2. Verify sender email
3. Create API Key:
   - Settings > API Keys
   - Create API Key > Full Access
   - Copy API key
4. Update `.env`:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
```

### 4. Frontend Setup

Update `.env` di frontend:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=AIzaSyAjsr4LTeWcc0CwLo2pWRVGpcqY2dR2Uks
VITE_FIREBASE_PROJECT_ID=x-ppdb
```

## 🧪 Testing

### Start Backend
```bash
cd backend
npm run dev
```

### Test Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get students (requires auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/students

# Upload payment proof
curl -X POST http://localhost:5000/api/payments/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "bukti_transfer=@/path/to/file.jpg" \
  -F "studentId=STUDENT_ID"
```

## 📊 Comparison Table

| Feature | Firebase Functions | Express.js Backend |
|---------|-------------------|-------------------|
| **Setup Time** | ⚡ Fast (minutes) | 🔧 Medium (hours) |
| **Cost (Low Traffic)** | 💰 Free tier | 💰 Fixed ($5-10/mo VPS) |
| **Cost (High Traffic)** | 💰💰💰 Expensive | 💰 Predictable |
| **Cold Starts** | ❌ Yes (2-5s) | ✅ No |
| **Custom Libraries** | ⚠️ Limited | ✅ Full npm |
| **File Upload** | Direct to Storage | Via Multer |
| **Email Service** | Via 3rd party | Nodemailer/SendGrid |
| **Debugging** | ⚠️ Cloud Logs | ✅ Local + Remote |
| **Control** | ⚠️ Limited | ✅ Full |
| **Scaling** | ✅ Auto | 🔧 Manual/Config |

## ⚠️ Breaking Changes

### Frontend Changes Required

1. **API Calls** - Ganti dari Firebase Functions call ke REST API
   ```javascript
   // OLD
   const fn = httpsCallable(functions, 'sendTestEmail');
   await fn({ email });

   // NEW
   await api.post('/notifications/test-email', { email });
   ```

2. **File Upload** - Ganti dari Firebase Storage ke Multer upload
   ```javascript
   // OLD
   await uploadBytes(ref(storage, path), file);

   // NEW
   const formData = new FormData();
   formData.append('bukti_transfer', file);
   await api.post('/payments/upload', formData);
   ```

3. **Authentication** - Token tetap Firebase Auth
   ```javascript
   // Tidak berubah - masih gunakan Firebase Auth
   const token = await currentUser.getIdToken();
   headers.Authorization = `Bearer ${token}`;
   ```

## 🎯 Next Steps

1. ✅ Setup Firebase Admin SDK credentials
2. ✅ Install backend dependencies
3. ✅ Configure `.env`
4. ✅ Test local development
5. 🔄 Update semua frontend API calls
6. 🔄 Deploy backend ke VPS/Cloud
7. 🔄 Setup production environment
8. 🔄 Monitor dan test production

## 📞 Support

Jika ada pertanyaan atau issue:
- Check backend logs: `pm2 logs ppdb-backend`
- Test API dengan Postman
- Check Firebase Console untuk errors
- Review `.env` configuration
