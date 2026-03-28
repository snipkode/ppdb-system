# Firebase Firestore Schema - PPDB Online

Complete database schema untuk sistem PPDB Online & School Website.

---

## 📊 Collections Overview

```
ppdb-online/
├── students              # Pendaftaran siswa
├── settings              # Konfigurasi PPDB
├── announcements         # Berita & pengumuman
├── gallery               # Galeri foto & video
├── exams                 # Data ujian
├── admin_logs            # Log aktivitas admin
├── contacts              # Kontak dari form
└── users                 # Data admin (optional)
```

---

## 📁 Collection: `students`

Data pendaftaran siswa baru.

### Document Structure

```javascript
students/{studentId} = {
  // Auto-generated
  id: string,              // Firestore auto-ID
  nomor_pendaftaran: string, // Format: "PPDB-2024-0001"
  
  // Data Siswa
  data_siswa: {
    nama_lengkap: string,      // required, max 100 chars
    nisn: string,              // required, 10 digits
    nik: string,               // required, 16 digits
    tempat_lahir: string,      // required
    tanggal_lahir: timestamp,  // required
    jenis_kelamin: string,     // "L" | "P"
    agama: string,             // required
    alamat: string,            // required, min 20 chars
    rt_rw: string,             // optional, format: "001/02"
    kelurahan: string,         // required
    kecamatan: string,         // required
    kota: string,              // required
    provinsi: string,          // required
    kode_pos: string,          // required, 5 digits
    telepon: string,           // required, valid phone
    email: string,             // optional, valid email
    foto_3x4: string           // Storage URL
  },
  
  // Data Orang Tua
  data_ortu: {
    nama_ayah: string,         // required
    pendidikan_ayah: string,   // required: "SD"|"SMP"|"SMA"|"D3"|"S1"|"S2"|"S3"
    pekerjaan_ayah: string,    // required
    penghasilan_ayah: string,  // required: "<1jt"|"1-3jt"|"3-5jt"|"5-10jt"|">10jt"
    nama_ibu: string,          // required
    pendidikan_ibu: string,    // required
    pekerjaan_ibu: string,     // required
    penghasilan_ibu: string,   // required
    nama_wali: string,         // optional
    telepon_ortu: string,      // required
    email_ortu: string         // optional
  },
  
  // Data Sekolah Asal
  data_sekolah: {
    npsn: string,              // required, 8 digits
    nama_sekolah: string,      // required
    alamat_sekolah: string,    // required
    tahun_lulus: number,       // required, YYYY
    nilai_rapor: [             // required, semester 1-5
      {
        semester: number,      // 1-5
        rata_rata: number,     // 0-100
        nilai_matematika: number,
        nilai_bahasa: number,
        nilai_ipa: number,
        nilai_ips: number,
        nilai_inggris: number
      }
    ],
    ijazah_file: string        // Storage URL (optional if belum lulus)
  },
  
  // Pilihan Jurusan
  pilihan_jurusan: {
    pilihan_1: string,         // required, reference to jurusan
    pilihan_2: string,         // required
    diterima_di: string | null // admin set, nullable
  },
  
  // Upload Dokumen
  dokumen: {
    foto_3x4: string,          // Storage URL
    kk_file: string,           // Storage URL
    akta_kelahiran: string,    // Storage URL
    ktp_ortu: string,          // Storage URL
    ijazah_skl: string,        // Storage URL (optional)
    transkrip_nilai: string,   // Storage URL
    surat_prestasi: string     // Storage URL (optional)
  },
  
  // Status Pendaftaran
  status: string,              // "pending"|"verified"|"ujian"|"accepted"|"rejected"
  
  // Detail Status
  status_detail: {
    submitted_at: timestamp,   // Auto-set on create
    verified_at: timestamp | null,
    verified_by: string | null,    // admin ID
    ujian_at: timestamp | null,
    pengumuman_at: timestamp | null,
    notes: string                // Catatan admin
  },
  
  // Pembayaran
  pembayaran: {
    status: string,              // "unpaid"|"pending"|"paid"|"rejected"
    amount: number,              // Amount in IDR
    bank_name: string,           // "BCA"|"BNI"|"BRI"|"MANDIRI"
    transfer_date: timestamp,    // Date of transfer
    bukti_transfer: string | null, // Storage URL
    verified_at: timestamp | null,
    verified_by: string | null,
    notes: string | null,
    rejected_reason: string | null
  },
  
  // Metadata
  created_at: timestamp,       // Server timestamp
  updated_at: timestamp,       // Server timestamp
  created_by: string | null,   // User ID (if authenticated)
  ip_address: string | null,   // User IP (for audit)
  user_agent: string | null    // User browser info
}
```

### Indexes

```javascript
// Composite indexes
students:
  - status ASC, created_at DESC
  - pilihan_jurusan.pilihan_1 ASC, status ASC
  - pembayaran.status ASC, updated_at DESC
  - data_siswa.kota ASC, status ASC
  - nomor_pendaftaran ASC (single field)
  - data_siswa.nisn ASC (single field)
```

### Security Rules

```javascript
match /students/{studentId} {
  // Read: Owner or Admin
  allow read: if request.auth != null && 
                 (request.auth.token.admin == true || 
                  request.auth.token.studentId == resource.data.id);
  
  // Create: Anyone (during PPDB period)
  allow create: if request.time >= Timestamp.date(2024, 1, 1) &&
                   request.time < Timestamp.date(2024, 12, 31) &&
                   request.resource.data.keys().hasAll(['data_siswa', 'data_ortu']) &&
                   request.resource.data.data_siswa.nama_lengkap is string &&
                   request.resource.data.data_siswa.nisn is string;
  
  // Update: Admin only
  allow update: if request.auth != null && 
                   request.auth.token.admin == true;
  
  // Delete: Admin only
  allow delete: if request.auth != null && 
                   request.auth.token.admin == true;
}
```

---

## 📁 Collection: `settings`

Konfigurasi sistem PPDB.

### Document Structure

```javascript
settings/{settingId} = {
  // PPDB Configuration
  ppdb_open: boolean,                    // Is PPDB currently open?
  ppdb_start_date: timestamp,            // Registration start
  ppdb_end_date: timestamp,              // Registration end
  
  // Biaya
  biaya_pendaftaran: number,             // In IDR
  
  // Kuota per Jurusan
  kuota_per_jurusan: {
    RPL: {
      total: number,                     // Total quota
      terdaftar: number,                 // Current registrations
      diterima: number                   // Accepted students
    },
    TKJ: { ... },
    AKL: { ... },
    // ... more majors
  },
  
  // Bank Information
  bank_info: {
    bca: {
      bank_name: string,
      account_number: string,
      account_name: string
    },
    bni: { ... },
    bri: { ... }
  },
  
  // Contact Information
  contact_info: {
    address: string,
    phone: string,
    email: string,
    whatsapp: string,
    facebook: string,
    instagram: string,
    youtube: string
  },
  
  // Additional Info
  info_tambahan: string,                 // HTML/Markdown
  faq: [                                 // FAQ list
    {
      question: string,
      answer: string
    }
  ],
  
  // Metadata
  updated_at: timestamp,
  updated_by: string                     // admin ID
}
```

### Security Rules

```javascript
match /settings/{settingId} {
  // Read: Public
  allow read: if true;
  
  // Write: Admin only
  allow write: if request.auth != null && 
                  request.auth.token.admin == true;
}
```

---

## 📁 Collection: `announcements`

Berita, pengumuman, dan artikel.

### Document Structure

```javascript
announcements/{announcementId} = {
  // Basic Info
  title: string,                       // required
  slug: string,                        // unique, URL-friendly
  excerpt: string,                     // Short description (max 200 chars)
  content: string,                     // HTML/Markdown content
  
  // Categorization
  category: string,                    // "news"|"announcement"|"event"
  tags: string[],                      // Array of tags
  
  // Media
  image: string,                       // Storage URL
  image_caption: string,               // Image caption
  
  // Publishing
  published: boolean,                  // Is published?
  published_at: timestamp | null,      // Publish date
  featured: boolean,                   // Featured article?
  
  // Author
  author: {
    name: string,
    avatar: string | null,
    role: string                       // "admin"|"teacher"|"staff"
  },
  
  // Engagement
  views: number,                       // View counter
  shares: number,                      // Share counter
  
  // SEO
  meta_title: string,                  // SEO title
  meta_description: string,            // SEO description
  meta_keywords: string[],             // SEO keywords
  
  // Metadata
  created_by: string,                  // admin ID
  created_at: timestamp,
  updated_at: timestamp
}
```

### Indexes

```javascript
announcements:
  - category ASC, published_at DESC
  - published ASC, published_at DESC
  - featured ASC, published_at DESC
  - tags (array-contains)
```

### Security Rules

```javascript
match /announcements/{announcementId} {
  // Read: Published articles are public
  allow read: if resource.data.published == true ||
                 (request.auth != null && request.auth.token.admin == true);
  
  // Write: Admin only
  allow write: if request.auth != null && 
                  request.auth.token.admin == true;
}
```

---

## 📁 Collection: `gallery`

Foto dan video galeri.

### Document Structure

```javascript
gallery/{galleryId} = {
  // Basic Info
  title: string,                       // required
  description: string,                 // optional
  
  // Type
  type: string,                        // "photo"|"video"
  
  // For Photos
  images: string[] | null,             // Array of Storage URLs
  image_captions: string[] | null,     // Captions for each image
  
  // For Videos
  video_url: string | null,            // YouTube embed URL
  video_thumbnail: string | null,      // Thumbnail URL
  
  // Categorization
  category: string,                    // "school"|"ppdb"|"exam"|"achievement"
  event_date: timestamp | null,        // When the event happened
  
  // Publishing
  published: boolean,                  // Is visible to public?
  featured: boolean,                   // Featured in homepage?
  
  // Metadata
  created_by: string,                  // admin ID
  created_at: timestamp,
  updated_at: timestamp
}
```

### Security Rules

```javascript
match /gallery/{galleryId} {
  // Read: Published galleries are public
  allow read: if resource.data.published == true;
  
  // Write: Admin only
  allow write: if request.auth != null && 
                  request.auth.token.admin == true;
}
```

---

## 📁 Collection: `exams`

Data ujian dan hasil seleksi.

### Document Structure

```javascript
exams/{examId} = {
  // Student Reference
  student_id: string,                  // Reference to students collection
  nomor_peserta: string,               // Unique exam number (e.g., "UJIAN-2024-0001")
  
  // Exam Schedule
  tanggal_ujian: timestamp,            // Exam date
  waktu_ujian: string,                 // Time (e.g., "08:00 - 10:00")
  ruangan: string,                     // Room number
  lokasi: string,                      // Location (e.g., "Gedung A, Lt. 2")
  
  // Subjects
  mata_ujian: [
    {
      nama: string,                    // Subject name
      kode: string,                    // Subject code
      durasi: number                   // Duration in minutes
    }
  ],
  
  // Results
  status: string,                      // "scheduled"|"completed"|"absent"
  nilai: {
    tpq: number | null,                // Nilai TPQ (0-100)
    akademik: number | null,           // Nilai Akademik (0-100)
    wawancara: number | null,          // Nilai Wawancara (0-100)
    total: number | null,              // Total average
    rata_rata: number | null           // Final average
  },
  keterangan: string | null,           // Pass/fail remarks
  
  // Attendance
  kehadiran: {
    hadir: boolean,
    hadir_at: timestamp | null,
    keterangan: string | null
  },
  
  // Metadata
  created_by: string,                  // admin ID
  created_at: timestamp,
  updated_at: timestamp
}
```

### Indexes

```javascript
exams:
  - student_id ASC
  - tanggal_ujian ASC
  - status ASC, tanggal_ujian ASC
```

### Security Rules

```javascript
match /exams/{examId} {
  // Read: Owner or Admin
  allow read: if request.auth != null && 
                 (request.auth.token.admin == true || 
                  request.auth.token.studentId == resource.data.student_id);
  
  // Write: Admin only
  allow write: if request.auth != null && 
                  request.auth.token.admin == true;
}
```

---

## 📁 Collection: `admin_logs`

Audit log untuk aktivitas admin.

### Document Structure

```javascript
admin_logs/{logId} = {
  // Action Info
  action: string,                      // "create"|"update"|"delete"|"verify"|"export"
  collection: string,                  // Affected collection
  document_id: string,                 // Affected document ID
  
  // Admin Info
  admin_id: string,                    // Admin who performed action
  admin_email: string,
  admin_name: string,
  
  // Details
  changes: {                           // Before/after snapshot
    before: map | null,
    after: map | null
  },
  notes: string | null,
  
  // Request Info
  ip_address: string,
  user_agent: string,
  timestamp: timestamp
}
```

### Security Rules

```javascript
match /admin_logs/{logId} {
  // Read: Admin only
  allow read: if request.auth != null && 
                 request.auth.token.admin == true;
  
  // Create: System only (via Cloud Functions)
  allow create: if request.auth != null;
  
  // Write/Delete: No one (immutable logs)
  allow update, delete: if false;
}
```

---

## 📁 Collection: `contacts`

Pesan dari form kontak.

### Document Structure

```javascript
contacts/{contactId} = {
  // Sender Info
  name: string,                        // required
  email: string,                       // required
  phone: string | null,
  subject: string,                     // required
  
  // Message
  message: string,                     // required, min 10 chars
  
  // Status
  status: string,                      // "new"|"read"|"replied"|"archived"
  replied_at: timestamp | null,
  replied_by: string | null,           // admin ID
  
  // Metadata
  ip_address: string,
  user_agent: string,
  created_at: timestamp
}
```

### Security Rules

```javascript
match /contacts/{contactId} {
  // Create: Anyone
  allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message']) &&
                   request.resource.data.name is string &&
                   request.resource.data.email is string &&
                   request.resource.data.message is string;
  
  // Read/Update/Delete: Admin only
  allow read, update, delete: if request.auth != null && 
                                 request.auth.token.admin == true;
}
```

---

## 📁 Collection: `users` (Optional)

Data admin/staff jika menggunakan custom user management.

### Document Structure

```javascript
users/{userId} = {
  // Auth Info
  email: string,                       // unique
  name: string,
  avatar: string | null,
  
  // Role
  role: string,                        // "super_admin"|"admin"|"staff"
  permissions: string[],               // ["manage_students", "manage_news", ...]
  
  // Profile
  phone: string | null,
  department: string | null,           // "academic"|"administration"|"it"
  
  // Status
  active: boolean,
  last_login: timestamp | null,
  
  // Metadata
  created_at: timestamp,
  updated_at: timestamp
}
```

### Security Rules

```javascript
match /users/{userId} {
  // Read: Authenticated users
  allow read: if request.auth != null;
  
  // Write: Only self or super admin
  allow update: if request.auth != null && 
                   (request.auth.uid == resource.data.id || 
                    request.auth.token.super_admin == true);
}
```

---

## 🔥 Firebase Storage Structure

```
Storage Bucket
├── students/
│   └── {studentId}/
│       ├── foto_3x4.jpg
│       ├── kk.jpg
│       ├── akta_kelahiran.jpg
│       ├── ktp_ortu.jpg
│       ├── ijazah.jpg
│       ├── transkrip_nilai.jpg
│       └── surat_prestasi.jpg
│
├── announcements/
│   └── {announcementId}/
│       └── featured_image.jpg
│
├── gallery/
│   └── {galleryId}/
│       ├── image_1.jpg
│       ├── image_2.jpg
│       └── ...
│
├── public/
│   ├── logo_school.png
│   ├── favicon.ico
│   └── ...
│
└── temp/
    └── (temporary uploads)
```

### Storage Rules

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
    
    // Announcement images
    match /announcements/{announcementId}/{file} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true &&
                      request.resource.size < 5 * 1024 * 1024; // 5MB
    }
    
    // Gallery images
    match /gallery/{galleryId}/{file} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }
    
    // Public files
    match /public/{file} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }
    
    // Temp uploads (24h expiry via Cloud Function)
    match /temp/{file} {
      allow read, write: if request.auth != null &&
                            request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

---

## 📊 Data Relationships

```
students (1) ──→ (1) exams
           (via student_id)

announcements (M) ──→ (1) users
                (via created_by)

gallery (M) ──→ (1) users
          (via created_by)

admin_logs (M) ──→ (1) users
             (via admin_id)

contacts (M) ──→ (1) users
           (via replied_by, optional)
```

---

## 🎯 Common Queries

### Get all pending students
```javascript
const q = query(
  collection(db, "students"),
  where("status", "==", "pending"),
  orderBy("created_at", "desc")
);
```

### Get students by major
```javascript
const q = query(
  collection(db, "students"),
  where("pilihan_jurusan.pilihan_1", "==", "RPL"),
  where("status", "in", ["verified", "ujian"])
);
```

### Get published news
```javascript
const q = query(
  collection(db, "announcements"),
  where("published", "==", true),
  where("category", "==", "news"),
  orderBy("published_at", "desc"),
  limit(10)
);
```

### Get payment pending verification
```javascript
const q = query(
  collection(db, "students"),
  where("pembayaran.status", "==", "pending"),
  orderBy("updated_at", "desc")
);
```

---

**Last Updated:** 2024-03-28
**Version:** 1.0
