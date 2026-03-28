# 🎓 PPDB Online & School Website - Roadmap

> Roadmap lengkap pengembangan Website Sekolah dengan sistem PPDB Online production-ready

---

## 📅 Timeline Overview

```
Phase 1 (Week 1-2): Core PPDB - MVP
Phase 2 (Week 3-4): School Website
Phase 3 (Week 5-6): Advanced Features
Phase 4 (Week 7+):  Polish & Optimization
```

---

## 🎯 Phase 1: Core PPDB (MVP) - Week 1-2

### ✅ Sprint 1.1: Landing Page PPDB (Days 1-3)

#### Frontend Components
- [ ] `src/pages/Home.jsx` - Homepage dengan sections:
  - [ ] Hero Section (Welcome + CTA Daftar)
  - [ ] Quick Stats (Total Siswa, Guru, Jurusan, Akreditasi)
  - [ ] Sambutan Kepala Sekolah (Foto + Sambutan)
  - [ ] Keunggulan Sekolah (Fasilitas, Prestasi, Program)
  - [ ] Jurusan Tersedia (Card grid dengan link detail)
  - [ ] Footer (Kontak, Social Media, Quick Links)

- [ ] `src/components/layout/Header.jsx`
  - [ ] Logo Sekolah
  - [ ] Navigation Menu (Home, PPDB, Profil, Jurusan, Berita, Kontak)
  - [ ] Mobile Hamburger Menu
  - [ ] CTA Button "Daftar PPDB"

- [ ] `src/components/layout/Footer.jsx`
  - [ ] Informasi Sekolah
  - [ ] Quick Links
  - [ ] Contact Info
  - [ ] Social Media Icons
  - [ ] Copyright

#### Design Requirements
- [ ] Responsive: Mobile (320px), Tablet (768px), Desktop (1024px+)
- [ ] Color scheme sesuai logo sekolah
- [ ] Font: Inter/Poppins
- [ ] Animations: Smooth transitions, hover effects
- [ ] Loading states & skeleton screens

---

### ✅ Sprint 1.2: Form PPDB Lengkap (Days 4-7)

#### Frontend - Registration Form
- [ ] `src/pages/Register.jsx` - Main registration page
- [ ] `src/components/ppdb/PPDBInfo.jsx` - Info PPDB (syarat, alur, biaya, timeline)
- [ ] `src/components/ppdb/FormStepper.jsx` - Multi-step form indicator
- [ ] `src/components/ppdb/StudentForm.jsx` - Data pribadi siswa
- [ ] `src/components/ppdb/ParentForm.jsx` - Data orang tua/wali
- [ ] `src/components/ppdb/SchoolForm.jsx` - Data sekolah asal
- [ ] `src/components/ppdb/MajorForm.jsx` - Pilihan jurusan
- [ ] `src/components/ppdb/DocumentUpload.jsx` - Upload dokumen
- [ ] `src/components/ppdb/ConfirmationPage.jsx` - Review & submit
- [ ] `src/components/ppdb/SuccessPage.jsx` - Success dengan no. pendaftaran

#### Form Fields

**Data Siswa:**
```javascript
{
  nama_lengkap: string (required, max 100 chars)
  nisn: string (required, 10 digits)
  nik: string (required, 16 digits)
  tempat_lahir: string (required)
  tanggal_lahir: date (required)
  jenis_kelamin: 'L' | 'P' (required)
  agama: string (required)
  alamat: string (required, min 20 chars)
  rt_rw: string (optional)
  kelurahan: string (required)
  kecamatan: string (required)
  kota: string (required)
  provinsi: string (required)
  kode_pos: string (required, 5 digits)
  telepon: string (required, valid phone)
  email: string (optional, valid email)
  foto_3x4: File (required, max 2MB, jpg/png)
}
```

**Data Orang Tua:**
```javascript
{
  nama_ayah: string (required)
  pendidikan_ayah: string (required)
  pekerjaan_ayah: string (required)
  penghasilan_ayah: string (required)
  nama_ibu: string (required)
  pendidikan_ibu: string (required)
  pekerjaan_ibu: string (required)
  penghasilan_ibu: string (required)
  nama_wali: string (optional)
  telepon_ortu: string (required)
  email_ortu: string (optional)
}
```

**Data Sekolah Asal:**
```javascript
{
  npsn: string (required, 8 digits)
  nama_sekolah: string (required)
  alamat_sekolah: string (required)
  tahun_lulus: number (required)
  nilai_rapor: Array (required, semester 1-5)
  ijazah_file: File (optional, untuk yang sudah lulus)
}
```

**Pilihan Jurusan:**
```javascript
{
  pilihan_1: string (required)
  pilihan_2: string (required)
  info_kuota: object (read-only)
}
```

**Upload Dokumen:**
```javascript
{
  foto_3x4: File (required, max 2MB)
  kk_file: File (required, max 2MB)
  akta_kelahiran: File (required, max 2MB)
  ktp_ortu: File (required, max 2MB)
  ijazah_skl: File (optional, max 2MB)
  transkrip_nilai: File (required, max 2MB)
  surat_prestasi: File (optional, max 2MB)
}
```

#### Validation Rules
- [ ] Required fields validation
- [ ] Email format validation
- [ ] Phone number validation (Indonesian format)
- [ ] NISN validation (10 digits)
- [ ] NIK validation (16 digits)
- [ ] File size validation (max 2MB per file)
- [ ] File type validation (jpg, png, pdf only)
- [ ] Real-time validation on blur
- [ ] Submit validation with error messages

#### UI/UX Features
- [ ] Progress stepper (Step 1-5)
- [ ] Auto-save draft (localStorage)
- [ ] File upload preview
- [ ] File upload progress bar
- [ ] Ability to go back/forward between steps
- [ ] Review page before submit
- [ ] Print/Copy nomor pendaftaran
- [ ] Download PDF bukti pendaftaran

---

### ✅ Sprint 1.3: Status Checker (Days 8-9)

#### Frontend
- [ ] `src/pages/Status.jsx` - Status check page
- [ ] `src/components/ppdb/StatusSearch.jsx` - Search form
- [ ] `src/components/ppdb/StatusResult.jsx` - Result display
- [ ] `src/components/ppdb/StatusTimeline.jsx` - Status timeline

#### Status Flow
```
1. Submitted ✓ (Terkirim)
   └─ "Pendaftaran berhasil dikirim"

2. Verification 📋 (Verifikasi Berkas)
   └─ "Berkas sedang diverifikasi oleh admin"

3. Exam 📝 (Ujian/Pengujian)
   └─ "Jadwal ujian: [tanggal]"
   └─ "Download kartu ujian"

4. Announcement 📢 (Pengumuman)
   └─ "Hasil seleksi telah diumumkan"

5a. Accepted ✅ (Diterima)
   └─ "Selamat! Anda diterima di [jurusan]"
   └─ "Download surat diterima"
   └─ "Lakukan daftar ulang"

5b. Rejected ❌ (Ditolak)
   └─ "Maaf, Anda belum diterima"
   └─ "Informasi lebih lanjut hubungi admin"
```

#### Features
- [ ] Search by No. Pendaftaran + NISN
- [ ] Search by No. Pendaftaran + Email
- [ ] Status badge dengan warna
- [ ] Timeline visual dengan icons
- [ ] Download kartu ujian (jika status = ujian)
- [ ] Download surat diterima (jika status = accepted)
- [ ] Print status page

---

### ✅ Sprint 1.4: Firebase Backend (Days 10-12)

#### Firebase Setup
- [ ] Create Firebase Project
- [ ] Enable Firestore Database
- [ ] Enable Firebase Storage
- [ ] Enable Firebase Authentication (untuk admin)
- [ ] Setup Firestore Security Rules
- [ ] Setup Storage Security Rules

#### Firestore Collections

**Collection: `students`**
```javascript
students/
  ├── id: auto-generated (Firestore ID)
  ├── nomor_pendaftaran: "PPDB-2024-0001" (unique)
  ├── data_siswa: { ... }
  ├── data_ortu: { ... }
  ├── data_sekolah: { ... }
  ├── pilihan_jurusan: { ... }
  ├── dokumen: {
  │   ├── foto_3x4: "https://firebasestorage..."
  │   ├── kk_file: "https://firebasestorage..."
  │   └── ...
  │   }
  ├── status: "pending" | "verified" | "ujian" | "accepted" | "rejected"
  ├── status_detail: {
  │   ├── submitted_at: timestamp
  │   ├── verified_at: timestamp | null
  │   ├── verified_by: string | null
  │   ├── ujian_at: timestamp | null
  │   ├── pengumuman_at: timestamp | null
  │   └── notes: string
  │   }
  ├── pembayaran: {
  │   ├── status: "unpaid" | "pending" | "paid"
  │   ├── bukti_transfer: string | null
  │   ├── verified_at: timestamp | null
  │   └── verified_by: string | null
  │   }
  ├── created_at: timestamp
  └── updated_at: timestamp
```

**Collection: `settings`**
```javascript
settings/
  ├── ppdb_open: boolean
  ├── ppdb_start_date: timestamp
  ├── ppdb_end_date: timestamp
  ├── biaya_pendaftaran: number
  ├── kuota_per_jurusan: {
  │   ├── RPL: 100
  │   ├── TKJ: 80
  │   ├── AKL: 60
  │   └── ...
  │   }
  ├── info_tambahan: string
  └── updated_at: timestamp
```

#### API Functions (`src/services/api.js`)
- [ ] `studentApi.create(data)` - Create new registration
- [ ] `studentApi.getById(id)` - Get student by ID
- [ ] `studentApi.getByNomorPendaftaran(nomor)` - Get by nomor pendaftaran
- [ ] `studentApi.update(id, data)` - Update student data
- [ ] `studentApi.uploadFile(file, path)` - Upload file to Storage
- [ ] `studentApi.getFileUrl(path)` - Get file URL from Storage
- [ ] `statsApi.getStats()` - Get registration statistics
- [ ] `settingsApi.getSettings()` - Get PPDB settings
- [ ] `settingsApi.checkAvailability()` - Check if PPDB is open

#### Security Rules

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Students collection
    match /students/{studentId} {
      // Allow read for owner (via custom claim or token)
      allow read: if request.auth != null && 
                     (request.auth.token.admin == true || 
                      request.auth.token.studentId == resource.data.id);
      
      // Allow create for anyone (public registration)
      allow create: if request.time < Timestamp.date(2024, 12, 31) &&
                       request.resource.data.data() is Map;
      
      // Allow update only for admin
      allow update: if request.auth != null && 
                       request.auth.token.admin == true;
      
      // Allow delete only for admin
      allow delete: if request.auth != null && 
                       request.auth.token.admin == true;
    }
    
    // Settings collection - read public, write admin only
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
    
    // Announcements collection
    match /announcements/{announcementId} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Student documents
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
  }
}
```

---

### ✅ Sprint 1.5: Admin Dashboard - Part 1 (Days 13-14)

#### Frontend - Admin Panel
- [ ] `src/pages/admin/Login.jsx` - Admin login page
- [ ] `src/pages/admin/Dashboard.jsx` - Main dashboard
- [ ] `src/components/admin/StatCards.jsx` - Statistics cards
- [ ] `src/components/admin/StudentTable.jsx` - Data pendaftaran table
- [ ] `src/components/admin/StudentDetail.jsx` - Detail view
- [ ] `src/components/admin/VerificationForm.jsx` - Verifikasi form
- [ ] `src/components/admin/PaymentVerification.jsx` - Verifikasi pembayaran

#### Dashboard Features
- [ ] Total Pendaftaran (hari ini, minggu ini, total)
- [ ] Status Breakdown (pending, verified, ujian, accepted, rejected)
- [ ] Jurusan Breakdown (kuota vs terdaftar)
- [ ] Pembayaran Breakdown (unpaid, pending, paid)
- [ ] Recent Registrations (last 10)
- [ ] Chart/Graph (optional, pakai recharts)

#### Student Management
- [ ] List semua pendaftaran dengan pagination
- [ ] Search by nama, nomor pendaftaran, NISN
- [ ] Filter by status, jurusan, tanggal
- [ ] Sort by tanggal, nama, status
- [ ] View detail pendaftaran
- [ ] Download semua dokumen
- [ ] Update status (verify, ujian, accept, reject)
- [ ] Add notes/catatan
- [ ] Export to Excel/CSV

#### Verifikasi Pembayaran
- [ ] List pembayaran pending
- [ ] View bukti transfer
- [ ] Approve/Reject pembayaran
- [ ] Add notes
- [ ] Notify student (manual WA/email)

---

## 🎯 Phase 2: School Website - Week 3-4

### ✅ Sprint 2.1: Profil Sekolah (Days 15-17)

#### Pages
- [ ] `src/pages/About.jsx` - Halaman profil
- [ ] `src/pages/History.jsx` - Sejarah sekolah
- [ ] `src/pages/VisionMission.jsx` - Visi & Misi
- [ ] `src/pages/Staff.jsx` - Data guru & staff
- [ ] `src/pages/Facilities.jsx` - Fasilitas sekolah

#### Components
- [ ] `src/components/about/HistoryTimeline.jsx`
- [ ] `src/components/about/VisionMissionCard.jsx`
- [ ] `src/components/about/TeacherGrid.jsx`
- [ ] `src/components/about/FacilityGallery.jsx`
- [ ] `src/components/about/OrganizationChart.jsx`

#### Content
- [ ] Sejarah sekolah (timeline format)
- [ ] Visi, Misi, Tujuan
- [ ] Struktur organisasi
- [ ] Data guru (foto, nama, mapel, kualifikasi)
- [ ] Data staff (foto, nama, jabatan)
- [ ] Fasilitas (foto, nama, deskripsi)

---

### ✅ Sprint 2.2: Akademik & Jurusan (Days 18-20)

#### Pages
- [ ] `src/pages/Academics.jsx` - Halaman akademik
- [ ] `src/pages/Majors.jsx` - Daftar jurusan
- [ ] `src/pages/MajorDetail.jsx` - Detail jurusan
- [ ] `src/pages/Curriculum.jsx` - Kurikulum
- [ ] `src/pages/Extracurricular.jsx` - Ekstrakurikuler

#### Components
- [ ] `src/components/academics/MajorCard.jsx`
- [ ] `src/components/academics/CurriculumTimeline.jsx`
- [ ] `src/components/academics/SubjectList.jsx`
- [ ] `src/components/academics/ExtracurricularGrid.jsx`
- [ ] `src/components/academics/CareerProspects.jsx`

#### Jurusan Content (per jurusan)
- [ ] Deskripsi jurusan
- [ ] Kompetensi yang dipelajari
- [ ] Mata pelajaran kejuruan
- [ ] Prospek karir
- [ ] Foto kegiatan
- [ ] Daftar guru pengampu

#### Ekstrakurikuler
- [ ] Pramuka
- [ ] PMR
- [ ] PKS
- [ ] Olahraga (Basket, Futsal, Badminton)
- [ ] Seni (Musik, Tari, Teater)
- [ ] Rohis
- [ ] Jurnalistik
- [ ] Coding Club
- [ ] English Club

---

### ✅ Sprint 2.3: Berita & Pengumuman (Days 21-23)

#### Pages
- [ ] `src/pages/News.jsx` - List berita
- [ ] `src/pages/NewsDetail.jsx` - Detail berita
- [ ] `src/pages/Announcements.jsx` - List pengumuman
- [ ] `src/pages/Events.jsx` - Agenda kegiatan

#### Components
- [ ] `src/components/news/NewsCard.jsx`
- [ ] `src/components/news/NewsList.jsx`
- [ ] `src/components/news/NewsFilter.jsx`
- [ ] `src/components/announcements/AnnouncementCard.jsx`
- [ ] `src/components/events/EventCalendar.jsx`
- [ ] `src/components/events/EventCard.jsx`

#### Firestore Collection: `announcements`
```javascript
announcements/
  ├── id: auto-generated
  ├── title: string
  ├── slug: string (unique)
  ├── content: string (HTML/Markdown)
  ├── excerpt: string
  ├── category: "news" | "announcement" | "event"
  ├── image: string (URL)
  ├── published: boolean
  ├── published_at: timestamp
  ├── author: {
  │   ├── name: string
  │   └── avatar: string
  │   }
  ├── tags: string[]
  ├── views: number
  ├── created_by: string (admin ID)
  ├── created_at: timestamp
  └── updated_at: timestamp
```

#### Features
- [ ] List dengan pagination
- [ ] Search by keyword
- [ ] Filter by category
- [ ] Filter by date range
- [ ] Tag system
- [ ] View counter
- [ ] Share to social media
- [ ] Related posts
- [ ] RSS Feed (optional)

---

### ✅ Sprint 2.4: Galeri (Days 24-25)

#### Pages
- [ ] `src/pages/Gallery.jsx` - Galeri foto
- [ ] `src/pages/VideoGallery.jsx` - Galeri video

#### Components
- [ ] `src/components/gallery/PhotoAlbum.jsx`
- [ ] `src/components/gallery/PhotoGrid.jsx`
- [ ] `src/components/gallery/Lightbox.jsx`
- [ ] `src/components/gallery/VideoCard.jsx`
- [ ] `src/components/gallery/VideoPlayer.jsx`

#### Firestore Collection: `gallery`
```javascript
gallery/
  ├── id: auto-generated
  ├── title: string
  ├── description: string
  ├── type: "photo" | "video"
  ├── images: string[] (URLs, for photo album)
  ├── video_url: string (YouTube embed, for video)
  ├── thumbnail: string (URL)
  ├── category: string
  ├── event_date: timestamp (optional)
  ├── published: boolean
  ├── created_by: string
  ├── created_at: timestamp
  └── updated_at: timestamp
```

#### Features
- [ ] Album view (group by event/category)
- [ ] Grid view dengan lazy loading
- [ ] Lightbox untuk foto full-size
- [ ] Zoom functionality
- [ ] Next/Prev navigation
- [ ] Video embed dari YouTube
- [ ] Filter by category
- [ ] Download photo (admin only)

---

### ✅ Sprint 2.5: Kontak & Lokasi (Day 26)

#### Pages
- [ ] `src/pages/Contact.jsx` - Halaman kontak

#### Components
- [ ] `src/components/contact/ContactForm.jsx`
- [ ] `src/components/contact/ContactInfo.jsx`
- [ ] `src/components/contact/GoogleMaps.jsx`
- [ ] `src/components/contact/SocialMediaLinks.jsx`
- [ ] `src/components/contact/FAQ.jsx`

#### Features
- [ ] Form kontak dengan validasi
- [ ] Email notification (Firebase Functions)
- [ ] Google Maps embed
- [ ] Contact information (alamat, telepon, email)
- [ ] Opening hours
- [ ] FAQ section
- [ ] Social media links
- [ ] WhatsApp floating button

---

### ✅ Sprint 2.6: Admin Dashboard - Part 2 (Days 27-28)

#### Content Management
- [ ] `src/pages/admin/NewsManagement.jsx` - CRUD berita
- [ ] `src/pages/admin/AnnouncementManagement.jsx` - CRUD pengumuman
- [ ] `src/pages/admin/GalleryManagement.jsx` - CRUD galeri
- [ ] `src/pages/admin/SettingsManagement.jsx` - Settings

#### Features
- [ ] Rich Text Editor (untuk konten berita)
- [ ] Image upload dengan preview
- [ ] Drag & drop file upload
- [ ] Schedule publish (tanggal publikasi)
- [ ] Draft/Auto-save
- [ ] Preview before publish
- [ ] Bulk delete
- [ ] Update PPDB settings (kuota, biaya, tanggal)

---

## 🎯 Phase 3: Advanced Features - Week 5-6

### ✅ Sprint 3.1: Payment Verification (Manual) (Days 29-31)

#### Payment Flow
```
1. Student submit registration
   └─ Status: pending_payment

2. Student upload bukti transfer
   └─ Status: payment_pending
   └─ Upload: bukti_transfer.jpg

3. Admin verify payment
   └─ Approve → Status: paid
   └─ Reject → Status: unpaid (with notes)

4. Student notified
   └─ Email/WA: Payment verified/rejected
```

#### Frontend Components
- [ ] `src/components/ppdb/PaymentInfo.jsx` - Info pembayaran
- [ ] `src/components/ppdb/PaymentUpload.jsx` - Upload bukti transfer
- [ ] `src/components/admin/PaymentTable.jsx` - List pembayaran pending
- [ ] `src/components/admin/PaymentDetail.jsx` - Detail + verify

#### Firestore Update
```javascript
students/{id}/pembayaran: {
  status: "unpaid" | "pending" | "paid" | "rejected"
  amount: number
  bank_name: string
  transfer_date: date
  bukti_transfer: string (URL)
  verified_at: timestamp | null
  verified_by: string | null
  notes: string | null
  rejected_reason: string | null
}
```

#### Features
- [ ] Display bank info (BCA, BNI, BRI, etc)
- [ ] Upload form dengan preview
- [ ] Admin verification UI
- [ ] Approve/Reject dengan notes
- [ ] Status update notification
- [ ] Payment history log

---

### ✅ Sprint 3.2: Email & Notification (Days 32-34)

#### Firebase Cloud Functions
- [ ] Setup Cloud Functions
- [ ] Email function (SendGrid/Mailgun)
- [ ] WA function (Twilio/Fonnte)
- [ ] Push notification (FCM)

#### Email Templates
- [ ] Registration confirmation
- [ ] Payment verification result
- [ ] Exam schedule
- [ ] Announcement result
- [ ] Accepted/Rejected notification
- [ ] Reminder (daftar ulang)

#### Notification Triggers
```javascript
// On student registration
onCreateStudent → Email confirmation

// On payment verification
onPaymentVerified → Email/WA "Pembayaran diverifikasi"
onPaymentRejected → Email/WA "Pembayaran ditolak"

// On status change
onStatusExam → Email "Jadwal ujian"
onStatusAccepted → Email "Selamat diterima"
onStatusRejected → Email "Maaf belum diterima"
```

#### Email Service Options
- [ ] SendGrid (Free 100 emails/day)
- [ ] Mailgun (Free 5000 emails/month)
- [ ] Nodemailer + Gmail (Free, limited)
- [ ] Firebase Extensions (SendGrid)

#### WA Service Options
- [ ] Fonnte (Indonesia, murah)
- [ ] Twilio (International)
- [ ] Wablas (Indonesia)
- [ ] Manual WA link (free alternative)

---

### ✅ Sprint 3.3: Exam Management (Days 35-37)

#### Features
- [ ] `src/pages/admin/ExamSchedule.jsx` - Set jadwal ujian
- [ ] `src/pages/admin/ExamCardGenerator.jsx` - Generate kartu ujian
- [ ] `src/pages/ExamSchedule.jsx` - Public exam schedule
- [ ] `src/pages/DownloadExamCard.jsx` - Download kartu ujian

#### Firestore Collection: `exams`
```javascript
exams/
  ├── id: auto-generated
  ├── student_id: string (reference)
  ├── nomor_peserta: string (unique)
  ├── tanggal_ujian: timestamp
  ├── waktu_ujian: string
  ├── ruangan: string
  ├── lokasi: string
  ├── mata_ujian: string[]
  ├── status: "scheduled" | "completed" | "absent"
  ├── nilai: {
  │   ├── tpq: number
  │   ├── akademik: number
  │   ├── wawancara: number
  │   └── total: number
  │   }
  ├── keterangan: string
  └── created_at: timestamp
```

#### Features
- [ ] Auto-generate nomor peserta
- [ ] Set jadwal ujian per jurusan
- [ ] Generate kartu ujian (PDF)
- [ ] Download kartu ujian (student)
- [ ] Input nilai ujian
- [ ] Rekap nilai

---

### ✅ Sprint 3.4: Reports & Analytics (Days 38-40)

#### Admin Reports
- [ ] `src/pages/admin/Reports.jsx` - Reports dashboard
- [ ] `src/components/admin/RegistrationReport.jsx`
- [ ] `src/components/admin/PaymentReport.jsx`
- [ ] `src/components/admin/ExamReport.jsx`
- [ ] `src/components/admin/ExportData.jsx`

#### Report Types
- [ ] Laporan Pendaftaran (harian, mingguan, bulanan)
- [ ] Laporan Pembayaran
- [ ] Laporan Ujian
- [ ] Laporan per Jurusan
- [ ] Laporan per Sekolah Asal
- [ ] Statistik Gender
- [ ] Statistik Agama
- [ ] Grafik Tren Pendaftaran

#### Export Formats
- [ ] Excel/CSV (semua data)
- [ ] PDF (laporan summary)
- [ ] Print-friendly view

#### Charts (pakai recharts)
- [ ] Pendaftaran per hari/minggu/bulan
- [ ] Breakdown per jurusan
- [ ] Breakdown per status
- [ ] Breakdown per gender
- [ ] Breakdown per sekolah asal

---

## 🎯 Phase 4: Polish & Optimization - Week 7+

### ✅ Sprint 4.1: UI/UX Polish (Days 41-43)

#### Improvements
- [ ] Consistent spacing & typography
- [ ] Color scheme refinement
- [ ] Button states (hover, active, disabled)
- [ ] Form error messages
- [ ] Loading states
- [ ] Empty states
- [ ] Success/Error toasts
- [ ] Modal animations
- [ ] Page transitions
- [ ] Scroll animations

#### Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast
- [ ] Screen reader support
- [ ] Alt text for images

---

### ✅ Sprint 4.2: Performance Optimization (Days 44-46)

#### Goals
- [ ] Lighthouse score 90+
- [ ] FCP < 1.5s
- [ ] TTI < 3.5s
- [ ] Bundle size < 500KB

#### Optimizations
- [ ] Code splitting (React.lazy)
- [ ] Lazy loading images
- [ ] Image optimization (WebP)
- [ ] Compress images before upload
- [ ] CDN for static assets
- [ ] Minify CSS/JS
- [ ] Tree shaking
- [ ] Debounce search inputs
- [ ] Virtual scrolling for large lists
- [ ] Cache Firestore queries

#### Tools
- [ ] Lighthouse CI
- [ ] Webpack Bundle Analyzer
- [ ] Firebase Performance Monitoring

---

### ✅ Sprint 4.3: SEO & PWA (Days 47-49)

#### SEO
- [ ] Meta tags per page
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Structured data (JSON-LD)
- [ ] Canonical URLs
- [ ] 404 page

#### PWA
- [ ] Manifest.json
- [ ] Service Worker
- [ ] Offline support
- [ ] Add to home screen
- [ ] App icon
- [ ] Splash screen

---

### ✅ Sprint 4.4: Testing (Days 50-52)

#### Testing Types
- [ ] Unit tests (Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Manual testing checklist

#### Test Coverage
- [ ] Form validation
- [ ] API functions
- [ ] File upload
- [ ] Status checker
- [ ] Admin verification
- [ ] Payment flow

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

#### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667, 414x896)

---

### ✅ Sprint 4.5: Security Hardening (Days 53-55)

#### Security Checklist
- [ ] Input sanitization
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting (Cloud Functions)
- [ ] File upload validation
- [ ] Authentication for admin
- [ ] Authorization checks
- [ ] Secure Firestore rules
- [ ] Environment variables
- [ ] Error handling
- [ ] Logging & monitoring

#### Firebase Security
- [ ] Review Firestore rules
- [ ] Review Storage rules
- [ ] Enable App Check
- [ ] Enable 2FA for admin
- [ ] Audit logs

---

### ✅ Sprint 4.6: Deployment & Launch (Days 56-60)

#### Deployment
- [ ] Firebase Hosting setup
- [ ] Custom domain configuration
- [ ] SSL certificate
- [ ] Environment variables (production)
- [ ] Build optimization
- [ ] Deploy script

#### Pre-launch Checklist
- [ ] All features tested
- [ ] Content reviewed
- [ ] Broken links check
- [ ] Forms working
- [ ] Email notifications working
- [ ] Payment flow tested
- [ ] Admin dashboard tested
- [ ] Mobile responsive check
- [ ] Performance check
- [ ] SEO check

#### Launch
- [ ] Soft launch (internal testing)
- [ ] Beta launch (limited users)
- [ ] Full launch
- [ ] Monitor analytics
- [ ] Collect feedback
- [ ] Bug fixes

#### Post-launch
- [ ] Monitor errors (Sentry)
- [ ] Monitor performance
- [ ] User feedback
- [ ] Regular backups
- [ ] Update content
- [ ] Security updates

---

## 📊 Database Schema Reference

### Collections Overview

```
Firestore Database
├── students (PPDB registrations)
├── settings (PPDB configuration)
├── announcements (News & announcements)
├── gallery (Photos & videos)
├── exams (Exam schedules & results)
├── admin_logs (Activity logs)
└── contacts (Contact form submissions)
```

### Complete Schema

See: `FIREBASE_SCHEMA.md` (separate file for detailed schema)

---

## 🛠️ Tech Stack Summary

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "firebase": "^10.7.0",
  "tailwindcss": "^3.4.0",
  "react-icons": "^4.12.0",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.49.0",
  "yup": "^1.3.0",
  "framer-motion": "^10.16.0",
  "recharts": "^2.10.0",
  "react-toastify": "^9.1.0",
  "jspdf": "^2.5.0",
  "html2canvas": "^1.4.0"
}
```

### Backend (Firebase)
- Firestore Database
- Firebase Storage
- Firebase Authentication
- Firebase Cloud Functions
- Firebase Hosting
- Firebase Analytics
- Firebase Performance Monitoring

### Development Tools
- Vite (Build tool)
- ESLint + Prettier
- Husky (Git hooks)
- Vitest (Testing)
- Playwright (E2E)

---

## 📝 Notes

### Payment Verification (Manual)
- Student transfer via bank/ATM
- Student upload photo bukti transfer
- Admin verify manually di dashboard
- Approve/Reject dengan notes
- Notification via Email/WA

### Future Enhancements (Post-MVP)
- [ ] Online payment gateway (Midtrans/Xendit)
- [ ] Online exam (CBT)
- [ ] Alumni tracking
- [ ] Student portal (nilai, absensi)
- [ ] Parent portal (monitoring anak)
- [ ] Mobile app (React Native)
- [ ] WhatsApp chatbot
- [ ] SMS gateway

---

## ✅ Progress Tracking

### Phase 1: Core PPDB (MVP)
- [ ] Sprint 1.1: Landing Page PPDB
- [ ] Sprint 1.2: Form PPDB Lengkap
- [ ] Sprint 1.3: Status Checker
- [ ] Sprint 1.4: Firebase Backend
- [ ] Sprint 1.5: Admin Dashboard - Part 1

### Phase 2: School Website
- [ ] Sprint 2.1: Profil Sekolah
- [ ] Sprint 2.2: Akademik & Jurusan
- [ ] Sprint 2.3: Berita & Pengumuman
- [ ] Sprint 2.4: Galeri
- [ ] Sprint 2.5: Kontak & Lokasi
- [ ] Sprint 2.6: Admin Dashboard - Part 2

### Phase 3: Advanced Features
- [ ] Sprint 3.1: Payment Verification
- [ ] Sprint 3.2: Email & Notification
- [ ] Sprint 3.3: Exam Management
- [ ] Sprint 3.4: Reports & Analytics

### Phase 4: Polish & Optimization
- [ ] Sprint 4.1: UI/UX Polish
- [ ] Sprint 4.2: Performance Optimization
- [ ] Sprint 4.3: SEO & PWA
- [ ] Sprint 4.4: Testing
- [ ] Sprint 4.5: Security Hardening
- [ ] Sprint 4.6: Deployment & Launch

---

**Last Updated:** 2024-03-28
**Version:** 1.0

---

**Good luck! 🚀**
