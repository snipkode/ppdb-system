# Phase 1: Core PPDB (MVP) - Implementation Plan

## 🎯 Goal
Membangun sistem PPDB online yang berfungsi penuh dengan:
- Landing page informatif
- Form pendaftaran lengkap
- Upload dokumen
- Status checker
- Admin dashboard untuk verifikasi

## 📅 Timeline: 14 Days (2 Weeks)

---

## Sprint 1.1: Landing Page (Days 1-3)

### Task 1.1.1: Setup Project Structure
```bash
cd frontend
npm install  # Ensure all deps installed
```

**Components to Create:**
- [ ] `src/components/layout/Header.jsx`
- [ ] `src/components/layout/Footer.jsx`
- [ ] `src/components/home/HeroSection.jsx`
- [ ] `src/components/home/StatsSection.jsx`
- [ ] `src/components/home/PrincipalWelcome.jsx`
- [ ] `src/components/home/FeaturesSection.jsx`
- [ ] `src/components/home/MajorSection.jsx`

**Files Structure:**
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── home/
│       ├── HeroSection.jsx
│       ├── StatsSection.jsx
│       ├── PrincipalWelcome.jsx
│       ├── FeaturesSection.jsx
│       └── MajorSection.jsx
├── pages/
│   └── Home.jsx (update existing)
└── services/
    ├── firebase.js (already exists)
    └── api.js (already exists)
```

---

### Task 1.1.2: Header Component
**File:** `src/components/layout/Header.jsx`

**Features:**
- Logo sekolah (text/icon)
- Navigation menu (responsive)
- Mobile hamburger menu
- CTA button "Daftar PPDB"
- Sticky header on scroll

**Design:**
- Transparent → Solid on scroll
- Mobile: Hamburger menu
- Desktop: Horizontal menu

---

### Task 1.1.3: Footer Component
**File:** `src/components/layout/Footer.jsx`

**Sections:**
1. **School Info**
   - Logo
   - Alamat
   - Kontak (Telp, Email, WA)

2. **Quick Links**
   - Beranda
   - PPDB
   - Profil
   - Jurusan
   - Kontak

3. **Social Media**
   - Facebook icon
   - Instagram icon
   - YouTube icon
   - Twitter icon

4. **Newsletter** (optional)
   - Email subscription form

---

### Task 1.1.4: Hero Section
**File:** `src/components/home/HeroSection.jsx`

**Content:**
- Background: Slider/gambar sekolah
- Headline: "Selamat Datang di SMK [Nama Sekolah]"
- Subheadline: "Mencetak Generasi Unggul, Kompeten, dan Berkarakter"
- CTA Buttons:
  - "Daftar PPDB Online" (primary)
  - "Explore School" (secondary)
- Stats badge (Total Siswa, Guru, Jurusan)

**Features:**
- Auto-slide carousel (optional)
- Fade/slide animation
- Mobile responsive

---

### Task 1.1.5: Stats Section
**File:** `src/components/home/StatsSection.jsx`

**Stats to Display:**
```javascript
const stats = [
  { label: 'Siswa Aktif', value: '1200+', icon: FiUsers },
  { label: 'Guru & Staff', value: '85', icon: FiUsers },
  { label: 'Jurusan', value: '8', icon: FiBook },
  { label: 'Akreditasi', value: 'A', icon: FiAward },
];
```

**Design:**
- Grid layout (2x2 mobile, 4x1 desktop)
- Animated counter (optional)
- Icon + Label + Value

---

### Task 1.1.6: Principal Welcome
**File:** `src/components/home/PrincipalWelcome.jsx`

**Content:**
- Foto kepala sekolah (rounded/circle)
- Nama kepala sekolah
- Jabatan
- Sambutan singkat (2-3 paragraph)
- Signature (optional)

**Layout:**
- Desktop: Foto kiri, teks kanan
- Mobile: Foto atas, teks bawah

---

### Task 1.1.7: Features Section
**File:** `src/components/home/FeaturesSection.jsx`

**Features:**
```javascript
const features = [
  {
    icon: FiAward,
    title: 'Akreditasi A',
    description: 'Terakreditasi A dengan standar pendidikan tinggi'
  },
  {
    icon: FiBriefcase,
    title: 'Siap Kerja',
    description: 'Lulusan kompeten dan siap kerja di industri'
  },
  {
    icon: FiGlobe,
    title: 'Fasilitas Modern',
    description: 'Lab dan fasilitas pembelajaran terkini'
  },
  {
    icon: FiUsers,
    title: 'Ekstrakurikuler',
    description: 'Berbagai kegiatan untuk pengembangan diri'
  },
];
```

---

### Task 1.1.8: Major Section
**File:** `src/components/home/MajorSection.jsx`

**Content:**
List jurusan dengan card:
```javascript
const majors = [
  {
    name: 'RPL',
    fullName: 'Rekayasa Perangkat Lunak',
    description: 'Belajar coding, web, mobile, dan software development',
    icon: '💻',
    quota: 100
  },
  {
    name: 'TKJ',
    fullName: 'Teknik Komputer & Jaringan',
    description: 'Hardware, networking, dan sistem komputer',
    icon: '🖥️',
    quota: 80
  },
  // ... more majors
];
```

---

## Sprint 1.2: Form PPDB (Days 4-7)

### Task 1.2.1: PPDB Info Page
**File:** `src/pages/PPDBInfo.jsx`

**Sections:**
1. **Persyaratan Pendaftaran**
   - Usia maksimal 21 tahun
   - Lulus SMP/MTs/sederajat
   - Nilai rapor minimal 7.0
   - Sehat jasmani rohani

2. **Alur Pendaftaran**
   - Step 1: Isi formulir online
   - Step 2: Upload dokumen
   - Step 3: Verifikasi berkas
   - Step 4: Ujian seleksi
   - Step 5: Pengumuman

3. **Biaya Pendaftaran**
   - Gratis (atau sebutkan biaya)
   - Pembayaran via transfer

4. **Timeline**
   - Pendaftaran: Jan - Jun 2024
   - Ujian: Jul 2024
   - Pengumuman: Jul 2024
   - Daftar ulang: Aug 2024

---

### Task 1.2.2: Registration Form - Step 1 (Data Siswa)
**File:** `src/components/ppdb/StudentForm.jsx`

**Fields:**
```javascript
{
  nama_lengkap: string (required, min 3, max 100)
  nisn: string (required, exact 10 digits)
  nik: string (required, exact 16 digits)
  tempat_lahir: string (required)
  tanggal_lahir: date (required)
  jenis_kelamin: 'L' | 'P' (required)
  agama: string (required)
  alamat: string (required, min 20)
  rt_rw: string (optional, pattern: 000/00)
  kelurahan: string (required)
  kecamatan: string (required)
  kota: string (required)
  provinsi: string (required)
  kode_pos: string (required, exact 5)
  telepon: string (required, valid phone)
  email: string (optional, valid email)
}
```

**Features:**
- Real-time validation
- Auto-format NISN/NIK (spaces every 4 digits)
- Province/Kota dropdown (optional API)
- File upload: Foto 3x4

---

### Task 1.2.3: Registration Form - Step 2 (Data Orang Tua)
**File:** `src/components/ppdb/ParentForm.jsx`

**Fields:**
```javascript
{
  nama_ayah: string (required)
  pendidikan_ayah: enum (required)
  pekerjaan_ayah: string (required)
  penghasilan_ayah: enum (required)
  nama_ibu: string (required)
  pendidikan_ibu: enum (required)
  pekerjaan_ibu: string (required)
  penghasilan_ibu: enum (required)
  nama_wali: string (optional)
  telepon_ortu: string (required)
  email_ortu: string (optional)
}
```

**Dropdown Options:**
```javascript
const pendidikanOptions = [
  'SD', 'SMP', 'SMA', 'SMK', 'D3', 'S1', 'S2', 'S3'
];

const pekerjaanOptions = [
  'Wiraswasta', 'PNS', 'TNI/Polri', 'Petani', 'Nelayan',
  'Karyawan Swasta', 'Buruh', 'Guru', 'Dokter', 'Lainnya'
];

const penghasilanOptions = [
  '< 1 Juta', '1-3 Juta', '3-5 Juta', '5-10 Juta', '> 10 Juta'
];
```

---

### Task 1.2.4: Registration Form - Step 3 (Data Sekolah)
**File:** `src/components/ppdb/SchoolForm.jsx`

**Fields:**
```javascript
{
  npsn: string (required, exact 8 digits)
  nama_sekolah: string (required)
  alamat_sekolah: string (required)
  tahun_lulus: number (required, min 2020)
  nilai_rapor: [  // Semester 1-5
    {
      semester: number,
      matematika: number,
      bahasa_indonesia: number,
      bahasa_inggris: number,
      ipa: number,
      ips: number
    }
  ]
}
```

**Features:**
- Auto-calculate rata-rata
- Input nilai per semester (1-5)
- Upload: Ijazah/SKL (jika sudah lulus)

---

### Task 1.2.5: Registration Form - Step 4 (Pilihan Jurusan)
**File:** `src/components/ppdb/MajorForm.jsx`

**Fields:**
```javascript
{
  pilihan_1: string (required)
  pilihan_2: string (required)
}
```

**Features:**
- Display kuota per jurusan
- Show available seats (from Firestore)
- Cannot select same major for pilihan 1 & 2
- Info jurusan (tooltip/modal)

---

### Task 1.2.6: Registration Form - Step 5 (Upload Dokumen)
**File:** `src/components/ppdb/DocumentUpload.jsx`

**Documents:**
```javascript
const documents = [
  {
    id: 'foto_3x4',
    label: 'Foto 3x4',
    maxSize: 2, // MB
    format: ['jpg', 'png'],
    required: true
  },
  {
    id: 'kk_file',
    label: 'Kartu Keluarga',
    maxSize: 2,
    format: ['jpg', 'png', 'pdf'],
    required: true
  },
  {
    id: 'akta_kelahiran',
    label: 'Akta Kelahiran',
    maxSize: 2,
    format: ['jpg', 'png', 'pdf'],
    required: true
  },
  {
    id: 'ktp_ortu',
    label: 'KTP Orang Tua',
    maxSize: 2,
    format: ['jpg', 'png', 'pdf'],
    required: true
  },
  {
    id: 'ijazah_skl',
    label: 'Ijazah/SKL',
    maxSize: 2,
    format: ['jpg', 'png', 'pdf'],
    required: false, // Optional if belum lulus
    note: 'Boleh dikosongkan jika belum lulus'
  },
  {
    id: 'transkrip_nilai',
    label: 'Transkrip Nilai Rapor',
    maxSize: 2,
    format: ['jpg', 'png', 'pdf'],
    required: true
  },
  {
    id: 'surat_prestasi',
    label: 'Surat Prestasi (Optional)',
    maxSize: 2,
    format: ['jpg', 'png', 'pdf'],
    required: false
  }
];
```

**Features:**
- Drag & drop upload
- File preview (image)
- Progress bar
- Validation (size, type)
- Remove uploaded file

---

### Task 1.2.7: Confirmation & Submit
**File:** `src/components/ppdb/ConfirmationPage.jsx`

**Features:**
- Review semua data yang diisi
- Edit button per section
- Checkbox "Saya menyatakan data benar"
- Submit button
- Loading state saat submit
- Success page dengan nomor pendaftaran

**Success Page:**
- Nomor pendaftaran (besar)
- QR code (optional)
- Download PDF bukti
- Copy button
- Next steps info

---

## Sprint 1.3: Status Checker (Days 8-9)

### Task 1.3.1: Status Search Form
**File:** `src/components/ppdb/StatusSearch.jsx`

**Search Options:**
1. No. Pendaftaran + NISN
2. No. Pendaftaran + Email

**Features:**
- Tab switch between search types
- Validation
- Loading state
- Error handling

---

### Task 1.3.2: Status Result Display
**File:** `src/components/ppdb/StatusResult.jsx`

**Display:**
- Student info (nama, foto, jurusan)
- Status badge dengan warna
- Timeline vertical/horizontal
- Download buttons (kartu ujian, surat diterima)

**Status Colors:**
```javascript
const statusColors = {
  pending: 'yellow',
  verified: 'blue',
  ujian: 'purple',
  accepted: 'green',
  rejected: 'red'
};
```

---

### Task 1.3.3: Status Timeline
**File:** `src/components/ppdb/StatusTimeline.jsx`

**Timeline Steps:**
```
1. ✓ Submitted
   "Pendaftaran berhasil dikirim"

2. 📋 Verifikasi Berkas
   "Berkas sedang diverifikasi"

3. 📝 Ujian
   "Jadwal ujian: [date]"

4. 📢 Pengumuman
   "Hasil seleksi diumumkan"

5. ✅ Diterima / ❌ Ditolak
```

---

## Sprint 1.4: Firebase Backend (Days 10-12)

### Task 1.4.1: Setup Firebase Project
- [ ] Create project di Firebase Console
- [ ] Enable Firestore
- [ ] Enable Storage
- [ ] Copy config ke `firebase.js`

### Task 1.4.2: Firestore Security Rules
Deploy rules dari `FIREBASE_SCHEMA.md`

### Task 1.4.3: Storage Security Rules
Deploy rules dari `FIREBASE_SCHEMA.md`

### Task 1.4.4: API Functions Testing
Test semua functions di `api.js`:
- [ ] `studentApi.create()`
- [ ] `studentApi.getById()`
- [ ] `studentApi.uploadFile()`
- [ ] `statsApi.getStats()`

---

## Sprint 1.5: Admin Dashboard (Days 13-14)

### Task 1.5.1: Admin Login
**File:** `src/pages/admin/Login.jsx`

**Features:**
- Email + Password form
- Firebase Authentication
- Protected route
- Remember me

---

### Task 1.5.2: Admin Dashboard
**File:** `src/pages/admin/Dashboard.jsx`

**Stats Cards:**
- Total Pendaftaran (hari ini, minggu ini)
- Status breakdown (pending, verified, dll)
- Jurusan breakdown
- Pembayaran breakdown

**Recent Registrations:**
- Table last 10 pendaftaran
- Quick actions (view, verify)

---

### Task 1.5.3: Student Management
**File:** `src/pages/admin/Students.jsx`

**Features:**
- List semua pendaftaran
- Pagination
- Search (nama, nomor, NISN)
- Filter (status, jurusan, tanggal)
- Sort (tanggal, nama, status)
- View detail
- Download dokumen
- Update status
- Add notes

---

### Task 1.5.4: Payment Verification
**File:** `src/pages/admin/Payments.jsx`

**Features:**
- List pembayaran pending
- View bukti transfer (zoom)
- Approve/Reject button
- Add notes
- Status update

---

## 🎯 Deliverables

### Frontend Pages
- [ ] Home (Landing Page)
- [ ] PPDB Info
- [ ] Registration Form (5 steps)
- [ ] Success Page
- [ ] Status Checker
- [ ] Admin Login
- [ ] Admin Dashboard
- [ ] Admin Students
- [ ] Admin Payments

### Components
- [ ] Header
- [ ] Footer
- [ ] Hero Section
- [ ] Stats Section
- [ ] Principal Welcome
- [ ] Features Section
- [ ] Major Section
- [ ] Form Stepper
- [ ] File Upload
- [ ] Status Timeline
- [ ] Student Table
- [ ] Stat Cards

### Backend
- [ ] Firebase Project
- [ ] Firestore Collections
- [ ] Storage Buckets
- [ ] Security Rules
- [ ] API Functions

### Documentation
- [ ] User manual (student)
- [ ] Admin guide
- [ ] API documentation

---

## ✅ Acceptance Criteria

### Functional
- [ ] Student dapat daftar PPDB online
- [ ] Upload dokumen berfungsi
- [ ] Dapat cek status pendaftaran
- [ ] Admin dapat verifikasi berkas
- [ ] Admin dapat verifikasi pembayaran
- [ ] Data tersimpan di Firestore

### Non-Functional
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Loading states ada
- [ ] Error handling ada
- [ ] Form validation lengkap
- [ ] File upload validation
- [ ] Secure (Firestore rules)

### Performance
- [ ] Lighthouse > 80
- [ ] FCP < 2s
- [ ] Upload max 2MB/file
- [ ] No console errors

---

## 📝 Daily Standup Template

```markdown
## Day X - [Date]

### Yesterday
- [What was done]

### Today
- [What will be done]

### Blockers
- [Any issues]

### Progress
- Sprint X.X: XX% complete
```

---

**Let's build this! 🚀**
