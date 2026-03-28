# 🎯 Sprint 3: Advanced Features - 2 Weeks

## Overview
Building advanced features on top of the core PPDB system:
- Payment verification system
- Email & notifications
- Exam management
- Reports & analytics

---

## 📅 Timeline

```
Sprint 3.1: Payment Verification (Days 1-3)
Sprint 3.2: Email & Notifications (Days 4-6)
Sprint 3.3: Exam Management (Days 7-9)
Sprint 3.4: Reports & Analytics (Days 10-12)
```

---

## ✅ Sprint 3.1: Payment Verification (Days 1-3)

### Goal
Implement manual payment verification flow with upload and admin approval.

### Components to Create

#### Frontend - Student Side
- [ ] `src/components/ppdb/PaymentInfo.jsx` - Payment information display
- [ ] `src/components/ppdb/PaymentUpload.jsx` - Upload proof of transfer
- [ ] `src/pages/PaymentStatus.jsx` - Payment status page

#### Frontend - Admin Side
- [ ] `src/pages/admin/Payments.jsx` - Payment verification dashboard
- [ ] `src/components/admin/PaymentTable.jsx` - Pending payments list
- [ ] `src/components/admin/PaymentDetail.jsx` - Detail view with verify actions

### Firestore Schema Update

```javascript
students/{id}/pembayaran: {
  status: "unpaid" | "pending" | "paid" | "rejected",
  amount: 150000, // Biaya pendaftaran
  bank_name: "BCA",
  account_number: "1234567890",
  transfer_date: "2024-03-28",
  bukti_transfer: "https://firebasestorage...",
  verified_at: timestamp | null,
  verified_by: string | null, // admin ID
  notes: string | null,
  rejected_reason: string | null,
  created_at: timestamp,
  updated_at: timestamp
}
```

### Features

**Student Flow:**
1. View bank account info (BCA, BNI, BRI, etc.)
2. Upload proof of transfer (max 2MB)
3. View payment status
4. Receive notification when verified/rejected

**Admin Flow:**
1. View all pending payments
2. Zoom/view proof of transfer
3. Approve or Reject with notes
4. Update payment status
5. Filter by status, bank, date

### API Functions

```javascript
// src/services/api.js
export const paymentApi = {
  createPayment: async (studentId, data) => {},
  updatePayment: async (studentId, data) => {},
  getPaymentStatus: async (studentId) => {},
  verifyPayment: async (studentId, adminId, status, notes) => {},
  getAllPayments: async (filters) => {}
};
```

### Acceptance Criteria
- [ ] Student can upload payment proof
- [ ] File validation (size, type)
- [ ] Admin can view all pending payments
- [ ] Admin can approve/reject with notes
- [ ] Status updates correctly
- [ ] Responsive design

---

## ✅ Sprint 3.2: Email & Notifications (Days 4-6)

### Goal
Implement email notifications for key events in the PPDB process.

### Options

#### Option A: Firebase Extensions (Recommended)
- Use Firebase Extension: "Trigger Email"
- Free tier: 10,000 emails/month
- Setup: 5 minutes

#### Option B: EmailJS (Frontend-only)
- Free tier: 200 emails/month
- No backend needed
- Setup: 10 minutes

#### Option C: Firebase Cloud Functions + SendGrid
- More control
- Free tier: 100 emails/day (SendGrid)
- Setup: 30 minutes

### Email Templates

**1. Registration Confirmation**
```
Subject: Pendaftaran PPDB Berhasil - {nomor_pendaftaran}

Yth. {nama_siswa},

Pendaftaran Anda telah berhasil dikirim.

Nomor Pendaftaran: {nomor_pendaftaran}
Tanggal: {tanggal}

Silakan cek status pendaftaran Anda di:
{link_status}

Terima kasih.
```

**2. Payment Verified**
```
Subject: Pembayaran Terverifikasi - {nomor_pendaftaran}

Yth. {nama_siswa},

Pembayaran Anda telah terverifikasi.

Status: ✅ LUNAS
Tanggal Verifikasi: {tanggal}

Langkah selanjutnya: Tunggu jadwal ujian.
```

**3. Payment Rejected**
```
Subject: Pembayaran Ditolak - {nomor_pendaftaran}

Yth. {nama_siswa},

Pembayaran Anda ditolak dengan alasan:
{alasan}

Silakan upload bukti transfer yang benar.
```

**4. Exam Schedule**
```
Subject: Jadwal Ujian - {nomor_peserta}

Yth. {nama_siswa},

Ujian seleksi akan dilaksanakan pada:

Tanggal: {tanggal}
Waktu: {waktu}
Lokasi: {lokasi}
Ruangan: {ruangan}

Download kartu ujian: {link}
```

**5. Announcement Result**
```
Subject: Hasil Seleksi PPDB - {nomor_pendaftaran}

Yth. {nama_siswa},

Selamat! Anda DITERIMA di:
{jurusan}

Lakukan daftar ulang sebelum: {tanggal}
```

### Implementation

#### Using Firebase Extension (Recommended)

**Step 1: Install Extension**
```bash
# Firebase Console → Extensions → Trigger Email
# Install and configure
```

**Step 2: Create Cloud Function**
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.onStudentRegistered = functions.firestore
  .document('students/{studentId}')
  .onCreate(async (snap, context) => {
    const student = snap.data();
    
    await db.collection('mail').add({
      to: student.data_siswa.email || student.data_ortu.email_ortu,
      message: {
        subject: `Pendaftaran PPDB Berhasil - ${student.nomor_pendaftaran}`,
        html: `...email template...`
      }
    });
  });
```

### Features
- [ ] Email on registration
- [ ] Email on payment verified/rejected
- [ ] Email on exam schedule
- [ ] Email on acceptance/rejection
- [ ] WhatsApp notification (optional, using Fonnte)
- [ ] In-app notifications

### Acceptance Criteria
- [ ] Email sent on registration
- [ ] Email sent on payment status change
- [ ] Email templates are professional
- [ ] Emails are mobile-friendly
- [ ] Error handling for failed sends

---

## ✅ Sprint 3.3: Exam Management (Days 7-9)

### Goal
Manage exam schedules, generate exam cards, and record exam results.

### Components to Create

#### Frontend - Student Side
- [ ] `src/pages/ExamSchedule.jsx` - Public exam schedule
- [ ] `src/pages/DownloadExamCard.jsx` - Download exam card

#### Frontend - Admin Side
- [ ] `src/pages/admin/ExamSchedule.jsx` - Set exam schedule
- [ ] `src/pages/admin/ExamResults.jsx` - Input exam results
- [ ] `src/components/admin/ExamCardGenerator.jsx` - Generate PDF cards

### Firestore Schema

```javascript
// Collection: exams
exams/
  ├── id: auto-generated
  ├── student_id: string (reference to students)
  ├── nomor_peserta: "EXAM-2024-0001" (unique)
  ├── tanggal_ujian: timestamp
  ├── waktu_ujian: "08:00 - 12:00"
  ├── ruangan: "R.101"
  ├── lokasi: "Gedung A"
  ├── mata_ujian: ["TPQ", "Akademik", "Wawancara"]
  ├── status: "scheduled" | "completed" | "absent"
  ├── nilai: {
  │   ├── tpq: 85
  │   ├── akademik: 90
  │   ├── wawancara: 88
  │   └── total: 263
  │   }
  ├── keterangan: "Lulus" | "Tidak Lulus"
  ├── created_at: timestamp
  └── updated_at: timestamp
```

### Features

**Admin:**
1. Set exam schedule per major
2. Auto-generate exam number (nomor peserta)
3. Generate exam cards (PDF)
4. Input exam scores
5. Mark as pass/fail

**Student:**
1. View exam schedule
2. Download exam card (PDF)
3. View exam results

### Exam Card PDF Template

```javascript
// Using jsPDF or react-pdf
const ExamCardPDF = ({ student, exam }) => `
  ====================================
         KARTU PESERTA UJIAN
         PPDB SMK TAHUN 2024
  ====================================
  
  Nomor Peserta: {exam.nomor_peserta}
  Nama: {student.data_siswa.nama_lengkap}
  NISN: {student.data_siswa.nisn}
  
  Tanggal Ujian: {exam.tanggal_ujian}
  Waktu: {exam.waktu_ujian}
  Lokasi: {exam.lokasi}
  Ruangan: {exam.ruangan}
  
  Mata Ujian:
  1. TPQ (Tahfidz Al-Qur'an)
  2. Akademik (Matematika, IPA, IPS)
  3. Wawancara
  
  ====================================
  Harap membawa:
  - Kartu Tanda Peserta
  - KTP/KK Asli
  - Alat Tulis
  ====================================
`;
```

### API Functions

```javascript
export const examApi = {
  createExam: async (studentId, data) => {},
  getExamByStudentId: async (studentId) => {},
  updateExamSchedule: async (examId, data) => {},
  generateExamNumber: async (major) => {},
  inputExamResults: async (examId, scores) => {},
  getAllExams: async (filters) => {}
};
```

### Acceptance Criteria
- [ ] Admin can set exam schedule
- [ ] Auto-generate exam numbers
- [ ] Generate exam card PDF
- [ ] Student can download exam card
- [ ] Admin can input scores
- [ ] Calculate total score
- [ ] Mark pass/fail

---

## ✅ Sprint 3.4: Reports & Analytics (Days 10-12)

### Goal
Create comprehensive reports and analytics dashboard for admin.

### Components to Create

#### Frontend - Admin Side
- [ ] `src/pages/admin/Reports.jsx` - Reports dashboard
- [ ] `src/components/admin/RegistrationReport.jsx` - Registration report
- [ ] `src/components/admin/PaymentReport.jsx` - Payment report
- [ ] `src/components/admin/ExamReport.jsx` - Exam report
- [ ] `src/components/admin/ExportData.jsx` - Export to Excel/CSV/PDF

### Report Types

**1. Registration Report**
- Total registrations (daily, weekly, monthly)
- Registrations by status
- Registrations by major
- Registrations by gender
- Registrations by school origin

**2. Payment Report**
- Total paid vs unpaid
- Payment by bank
- Payment by date range
- Outstanding payments

**3. Exam Report**
- Exam participants
- Pass/fail rate
- Average scores per subject
- Score distribution

**4. Analytics Charts**
- Registration trend (line chart)
- Major distribution (pie chart)
- Status breakdown (bar chart)
- Gender distribution (pie chart)

### Libraries

```bash
npm install recharts xlsx jspdf jspdf-autotable
```

**Recharts** - For charts
```javascript
import { LineChart, BarChart, PieChart } from 'recharts';
```

**XLSX** - For Excel export
```javascript
import * as XLSX from 'xlsx';
```

**jsPDF** - For PDF export
```javascript
import jsPDF from 'jspdf';
import 'jspdf-autotable';
```

### Dashboard Layout

```
┌─────────────────────────────────────────────┐
│  📊 Reports Dashboard                       │
├─────────────────────────────────────────────┤
│                                             │
│  📈 Quick Stats                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ Total│ │ Paid │ │ Exam │ │ Pass │      │
│  │ 1250 │ │ 980  │ │ 1100 │ │ 95%  │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
│                                             │
│  📊 Registration Trend                      │
│  ┌─────────────────────────────────┐       │
│  │     Line Chart (Last 30 days)   │       │
│  └─────────────────────────────────┘       │
│                                             │
│  🎯 Major Distribution                      │
│  ┌─────────────┐ ┌────────────────┐        │
│  │  Pie Chart  │ │  Data Table    │        │
│  │             │ │  RPL: 350      │        │
│  │             │ │  TKJ: 280      │        │
│  │             │ │  AKL: 200      │        │
│  └─────────────┘ └────────────────┘        │
│                                             │
│  📥 Export Options                          │
│  [Export Excel] [Export PDF] [Print]       │
│                                             │
└─────────────────────────────────────────────┘
```

### Features

**Reports:**
1. Filter by date range
2. Filter by major
3. Filter by status
4. Group by school origin
5. Compare year-over-year

**Export:**
1. Export to Excel (all data)
2. Export to PDF (summary)
3. Print-friendly view
4. Scheduled reports (optional)

### API Functions

```javascript
export const reportApi = {
  getRegistrationStats: async (dateRange) => {},
  getPaymentStats: async (dateRange) => {},
  getExamStats: async () => {},
  getMajorDistribution: async () => {},
  getSchoolOriginStats: async () => {},
  exportToExcel: async (type, filters) => {},
  exportToPDF: async (type, filters) => {}
};
```

### Acceptance Criteria
- [ ] Dashboard shows accurate stats
- [ ] Charts render correctly
- [ ] Filter by date works
- [ ] Export to Excel works
- [ ] Export to PDF works
- [ ] Print view is clean
- [ ] Responsive on mobile

---

## 📦 Dependencies to Install

```bash
cd frontend
npm install recharts xlsx jspdf jspdf-autotable
```

---

## 🧪 Testing Checklist

### Payment Verification
- [ ] Upload payment proof
- [ ] Admin verify payment
- [ ] Admin reject payment
- [ ] Status updates correctly

### Email Notifications
- [ ] Registration email sent
- [ ] Payment email sent
- [ ] Exam email sent
- [ ] Result email sent

### Exam Management
- [ ] Set exam schedule
- [ ] Generate exam card
- [ ] Download exam card
- [ ] Input exam scores

### Reports
- [ ] View registration report
- [ ] View payment report
- [ ] View exam report
- [ ] Export to Excel
- [ ] Export to PDF

---

## 📊 Deliverables

### Pages
- [ ] PaymentStatus.jsx
- [ ] ExamSchedule.jsx
- [ ] DownloadExamCard.jsx
- [ ] admin/Payments.jsx
- [ ] admin/ExamSchedule.jsx
- [ ] admin/ExamResults.jsx
- [ ] admin/Reports.jsx

### Components
- [ ] PaymentInfo.jsx
- [ ] PaymentUpload.jsx
- [ ] PaymentTable.jsx
- [ ] PaymentDetail.jsx
- [ ] ExamCardGenerator.jsx
- [ ] RegistrationReport.jsx
- [ ] PaymentReport.jsx
- [ ] ExamReport.jsx
- [ ] ExportData.jsx

### API Functions
- [ ] paymentApi.*
- [ ] examApi.*
- [ ] reportApi.*

### Documentation
- [ ] Payment flow diagram
- [ ] Email templates
- [ ] Exam card template
- [ ] Report examples

---

## 🎯 Success Metrics

- **Payment**: 100% of payments tracked and verified
- **Email**: 95% email delivery rate
- **Exam**: All exam data managed digitally
- **Reports**: Real-time analytics available

---

## 📝 Daily Standup Template

```markdown
## Sprint 3 - Day X

### Completed Yesterday
- 

### Planning Today
- 

### Blockers
- 

### Progress
- Sprint 3.1: XX%
- Sprint 3.2: XX%
- Sprint 3.3: XX%
- Sprint 3.4: XX%
```

---

## 🔗 Related Documents

- [ROADMAP.md](./ROADMAP.md) - Full roadmap
- [FIREBASE_SCHEMA.md](./FIREBASE_SCHEMA.md) - Database schema
- [PHASE_1_PLAN.md](./PHASE_1_PLAN.md) - Phase 1 reference

---

**Let's build Sprint 3! 🚀**
