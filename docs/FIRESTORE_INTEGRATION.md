# 📘 Panduan Integrasi Firestore - PPDB Online

Panduan lengkap integrasi Firebase Firestore untuk sistem PPDB Online.

---

## 🚀 Fitur yang Diintegrasikan

### 1. **Registrasi Siswa Baru**
- ✅ Create student record dengan data lengkap
- ✅ Upload dokumen ke Firebase Storage
- ✅ Auto-generate nomor pendaftaran
- ✅ Update status pendaftaran

### 2. **Manajemen Dokumen**
- ✅ Upload foto 3x4, KK, Akta, KTP, Ijazah, Transkrip
- ✅ Simpan URL dokumen di Firestore
- ✅ Delete dan replace dokumen

### 3. **Pembayaran**
- ✅ Upload bukti transfer
- ✅ Verifikasi pembayaran (admin)
- ✅ Update status pembayaran

### 4. **Statistik & Reporting**
- ✅ Get PPDB statistics
- ✅ Quota status per jurusan
- ✅ Filter students by status/jurusan

---

## 📁 Struktur Data Firestore

### Collection: `students`

```javascript
{
  // Auto-generated
  id: string,
  nomor_pendaftaran: "PPDB-2024-0001",
  
  // Data Siswa
  data_siswa: {
    nama_lengkap: string,
    nisn: string,
    nik: string,
    tempat_lahir: string,
    tanggal_lahir: timestamp,
    jenis_kelamin: "L" | "P",
    agama: string,
    alamat: string,
    rt_rw: string,
    kelurahan: string,
    kecamatan: string,
    kota: string,
    provinsi: string,
    kode_pos: string,
    telepon: string,
    email: string
  },
  
  // Data Orang Tua
  data_ortu: {
    nama_ayah: string,
    pendidikan_ayah: string,
    pekerjaan_ayah: string,
    penghasilan_ayah: string,
    nama_ibu: string,
    pendidikan_ibu: string,
    pekerjaan_ibu: string,
    penghasilan_ibu: string,
    nama_wali: string,
    telepon_ortu: string,
    email_ortu: string
  },
  
  // Data Sekolah
  data_sekolah: {
    npsn: string,
    nama_sekolah: string,
    alamat_sekolah: string,
    tahun_lulus: number,
    nilai_rapor: array
  },
  
  // Pilihan Jurusan
  pilihan_jurusan: {
    pilihan_1: string,
    pilihan_2: string,
    diterima_di: string | null
  },
  
  // Dokumen
  dokumen: {
    foto_3x4: string (URL),
    kk_file: string (URL),
    akta_kelahiran: string (URL),
    ktp_ortu: string (URL),
    ijazah_skl: string (URL),
    transkrip_nilai: string (URL),
    surat_prestasi: string (URL)
  },
  
  // Status
  status: "pending" | "verified" | "ujian" | "accepted" | "rejected",
  status_detail: {
    submitted_at: timestamp,
    verified_at: timestamp | null,
    verified_by: string | null,
    ujian_at: timestamp | null,
    pengumuman_at: timestamp | null,
    notes: string | null
  },
  
  // Pembayaran
  pembayaran: {
    status: "unpaid" | "pending" | "paid" | "rejected",
    amount: number,
    bank_name: string,
    transfer_date: timestamp,
    bukti_transfer: string (URL),
    verified_at: timestamp | null,
    verified_by: string | null,
    notes: string | null
  },
  
  // Metadata
  created_at: timestamp,
  updated_at: timestamp
}
```

---

## 🔧 Cara Penggunaan

### 1. **Import Service**

```javascript
import ppdbFirestore from '@/services/ppdbFirestore';

// Or import specific functions
import { 
  createStudent, 
  uploadStudentDocument,
  getPPDBStats 
} from '@/services/ppdbFirestore';
```

### 2. **Registrasi Siswa Baru**

```javascript
const handleRegister = async (formData) => {
  // Step 1: Prepare data
  const studentData = {
    data_siswa: {
      nama_lengkap: formData.nama_lengkap,
      nisn: formData.nisn,
      // ... other fields
    },
    data_ortu: {
      nama_ayah: formData.nama_ayah,
      // ... other fields
    },
    data_sekolah: {
      npsn: formData.npsn,
      nama_sekolah: formData.nama_sekolah
    },
    pilihan_jurusan: {
      pilihan_1: formData.pilihan_1,
      pilihan_2: formData.pilihan_2
    },
    dokumen: {},
    status: 'pending',
    pembayaran: {
      status: 'unpaid',
      amount: 150000
    }
  };
  
  // Step 2: Create student record
  const result = await ppdbFirestore.createStudent(studentData);
  
  if (result.success) {
    const studentId = result.id;
    
    // Step 3: Upload documents
    const documents = {
      foto_3x4: formData.foto_3x4,
      kk_file: formData.kk_file,
      // ... other documents
    };
    
    await ppdbFirestore.uploadMultipleDocuments(documents, studentId);
    
    // Success!
    navigate('/success', { state: { studentId } });
  }
};
```

### 3. **Upload Dokumen**

```javascript
// Single document
const uploadFile = async (file, studentId, docType) => {
  const result = await ppdbFirestore.uploadStudentDocument(
    file,
    studentId,
    docType // e.g., 'foto_3x4', 'kk_file'
  );
  
  if (result.success) {
    console.log('Upload success:', result.url);
  }
};

// Multiple documents
const uploadAll = async (documents, studentId) => {
  const result = await ppdbFirestore.uploadMultipleDocuments(
    documents,
    studentId
  );
  
  if (result.success) {
    console.log('All documents uploaded');
  }
};
```

### 4. **Get Student Data**

```javascript
// By ID
const getStudent = async (id) => {
  const result = await ppdbFirestore.getStudentById(id);
  
  if (result.success) {
    console.log('Student data:', result.data);
  }
};

// By nomor pendaftaran
const getByNomor = async (nomor) => {
  const result = await ppdbFirestore.getStudentByNomorPendaftaran(nomor);
  
  if (result.success) {
    console.log('Student data:', result.data);
  }
};
```

### 5. **Update Status**

```javascript
// Update student status
const updateStatus = async (studentId, newStatus, notes) => {
  const result = await ppdbFirestore.updateStudentStatus(
    studentId,
    newStatus, // 'verified', 'ujian', 'accepted', 'rejected'
    notes
  );
  
  if (result.success) {
    console.log('Status updated');
  }
};
```

### 6. **Payment Operations**

```javascript
// Upload payment proof
const uploadPayment = async (studentId, file) => {
  const result = await ppdbFirestore.uploadPaymentProof(
    studentId,
    file
  );
  
  if (result.success) {
    console.log('Payment proof uploaded');
  }
};

// Verify payment (admin)
const verifyPayment = async (studentId, status, notes) => {
  const result = await ppdbFirestore.verifyPayment(
    studentId,
    status, // 'paid', 'rejected'
    notes
  );
  
  if (result.success) {
    console.log('Payment verified');
  }
};
```

### 7. **Get Statistics**

```javascript
// Get PPDB stats
const getStats = async () => {
  const result = await ppdbFirestore.getPPDBStats();
  
  if (result.success) {
    console.log('Statistics:', result.data);
    // {
    //   total: 100,
    //   pending: 30,
    //   verified: 50,
    //   accepted: 15,
    //   rejected: 5,
    //   by_major: { RPL: 25, TKJ: 20, ... }
    // }
  }
};

// Get quota status
const getQuota = async () => {
  const result = await ppdbFirestore.getQuotaStatus();
  
  if (result.success) {
    console.log('Quota:', result.data);
  }
};
```

### 8. **Filter Students**

```javascript
// Get students by status
const getPendingStudents = async () => {
  const result = await ppdbFirestore.getStudentsByFilter({
    status: 'pending',
    orderBy: 'created_at',
    order: 'desc'
  });
  
  if (result.success) {
    console.log('Pending students:', result.data);
  }
};

// Get students by major
const getRPLStudents = async () => {
  const result = await ppdbFirestore.getStudentsByFilter({
    jurusan: 'RPL',
    status: 'verified'
  });
  
  if (result.success) {
    console.log('RPL students:', result.data);
  }
};
```

---

## 📊 Firebase Storage Structure

```
Storage Bucket
└── students/
    └── {studentId}/
        ├── foto_3x4_1711234567890_file.jpg
        ├── kk_file_1711234567891_file.jpg
        ├── akta_kelahiran_1711234567892_file.jpg
        ├── ktp_ortu_1711234567893_file.jpg
        ├── ijazah_skl_1711234567894_file.jpg
        ├── transkrip_nilai_1711234567895_file.jpg
        └── surat_prestasi_1711234567896_file.jpg

└── payments/
    └── {studentId}/
        └── bukti_1711234567897_file.jpg
```

---

## 🔐 Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Students collection
    match /students/{studentId} {
      // Read: Owner or Admin
      allow read: if request.auth != null &&
                     (request.auth.token.admin == true ||
                      request.auth.token.studentId == studentId);
      
      // Create: Anyone (during PPDB period)
      allow create: if request.time >= Timestamp.date(2024, 1, 1) &&
                       request.time < Timestamp.date(2024, 12, 31) &&
                       request.resource.data.keys().hasAll(['data_siswa', 'data_ortu']);
      
      // Update: Admin only
      allow update: if request.auth != null &&
                       request.auth.token.admin == true;
      
      // Delete: Admin only
      allow delete: if request.auth != null &&
                       request.auth.token.admin == true;
    }
    
    // Settings collection
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.admin == true;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Student documents
    match /students/{studentId}/{file} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                      request.resource.size < 2 * 1024 * 1024 && // 2MB
                      request.resource.contentType.matches('image/.*|application/pdf');
    }
    
    // Payment proofs
    match /payments/{studentId}/{file} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
                      request.resource.size < 2 * 1024 * 1024 &&
                      request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## ⚠️ Error Handling

```javascript
const handleOperation = async () => {
  try {
    const result = await ppdbFirestore.createStudent(data);
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    // Success
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan: ' + error.message);
  }
};
```

---

## 📝 Checklist Implementasi

### Frontend (Register.jsx)
- [x] Import Firebase services
- [x] Prepare student data structure
- [x] Create student record
- [x] Upload documents to Storage
- [x] Update student with document URLs
- [x] Navigate to success page

### Admin Features
- [ ] View all students
- [ ] Filter by status/jurusan
- [ ] Verify student data
- [ ] Verify payment
- [ ] Update status
- [ ] Export data

### Additional Features
- [ ] Email notification
- [ ] SMS notification
- [ ] Print kartu ujian
- [ ] Generate nomor peserta
- [ ] Schedule exam

---

## 🔗 Related Files

- `/services/ppdbFirestore.js` - Main Firestore service
- `/services/firebase.js` - Firebase configuration
- `/services/api.js` - Legacy API (wrapper)
- `/pages/Register.jsx` - Registration form
- `/pages/admin/ExamSchedule.jsx` - Admin exam page

---

**Last Updated:** 2024-03-28
**Version:** 1.0
