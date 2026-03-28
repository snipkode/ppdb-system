# 🔍 Debug Guide - Firestore Submission PPDB

Panduan untuk memastikan tombol "Periksa & Kirim" benar-benar submit ke Firestore.

---

## ✅ Flow Submit ke Firestore

### 1. User mengisi form (5 steps)
```
Step 1: Data Siswa
Step 2: Data Orang Tua
Step 3: Data Sekolah
Step 4: Pilihan Jurusan
Step 5: Upload Dokumen
```

### 2. Klik "Periksa & Kirim" (Step 5)
```javascript
// File: Register.jsx line ~496
<button onClick={handleConfirm}>
  Periksa & Kirim
</button>
```

### 3. Halaman Konfirmasi muncul
```javascript
// File: Register.jsx line ~525
const ConfirmationPage = ({ formData, onConfirm, onBack }) => {
  // Shows summary of data
  // Button: "Ya, Kirim Pendaftaran" -> calls onConfirm -> handleSubmit()
}
```

### 4. Klik "Ya, Kirim Pendaftaran"
```javascript
// This calls handleSubmit() which:
// 1. Validates all data
// 2. Creates student record in Firestore
// 3. Uploads documents to Firebase Storage
// 4. Updates Firestore with document URLs
// 5. Navigates to success page
```

---

## 🔍 Console Logs untuk Debug

Ketika submit berhasil, Anda akan melihat console logs berikut:

```
🔥 Starting submission to Firestore...
📝 Submitting data to Firestore: {data_siswa: {...}, ...}
📦 [studentApi.create] Received data: {...}
📦 [studentApi.create] Saving to Firestore: {...}
✅ [studentApi.create] Successfully saved with ID: abc123xyz
✅ Student created: {studentId: "abc123xyz", nomorPendaftaran: "PPDB-1711234567890"}
📤 Starting document upload... 7 files
⬆️ Uploading foto_3x4...
⬆️ Uploading kk_file...
...
✅ Documents uploaded: 7 files
🔄 Updating Firestore with document URLs...
✅ Firestore updated with document URLs
🎉 Registration complete!
```

---

## 🛠️ Cara Debug

### 1. Buka Browser Console

**Chrome/Edge:**
- Tekan `F12` atau `Ctrl+Shift+J` (Windows)
- Atau klik kanan → Inspect → Console

**Firefox:**
- Tekan `F12` atau `Ctrl+Shift+K` (Windows)

**Mobile:**
- Chrome Remote Debugging via USB

### 2. Cek Console Logs

Saat klik "Ya, Kirim Pendaftaran", pastikan muncul logs:

```javascript
// ✅ GOOD - Submission started
🔥 Starting submission to Firestore...

// ✅ GOOD - Data being saved
📝 Submitting data to Firestore: {...}

// ✅ GOOD - Firestore API called
📦 [studentApi.create] Received data: {...}
📦 [studentApi.create] Saving to Firestore: {...}

// ✅ GOOD - Successfully saved
✅ [studentApi.create] Successfully saved with ID: ...

// ✅ GOOD - Documents uploading
📤 Starting document upload... 7 files
⬆️ Uploading foto_3x4...

// ✅ GOOD - All done
✅ Documents uploaded: 7 files
🔄 Updating Firestore with document URLs...
✅ Firestore updated with document URLs
🎉 Registration complete!
```

### 3. Cek Errors

Jika ada error, akan muncul:

```javascript
// ❌ BAD - Validation failed
Terjadi Kesalahan: Mohon lengkapi data yang wajib diisi

// ❌ BAD - Firestore error
❌ [studentApi.create] Error: FirebaseError: ...
❌ Registration error: Error: ...

// ❌ BAD - Upload error
❌ Registration error: Error: Gagal upload foto_3x4: ...
```

---

## 🔥 Common Issues & Solutions

### Issue 1: Tidak ada console logs muncul

**Penyebab:**
- JavaScript error sebelum submit
- Component tidak ter-render dengan benar

**Solusi:**
```javascript
// Cek di console:
console.log('Register component loaded');

// Pastikan button ada:
document.querySelector('button:contains("Periksa & Kirim")');
```

### Issue 2: Submit tapi data tidak masuk Firestore

**Penyebab:**
- Firebase tidak ter-initialize
- Security rules menolak write
- Network error

**Solusi:**
```javascript
// Cek Firebase connection
import { db } from '@/services/firebase';
console.log('Firebase app:', db.app);

// Cek manual write
import { collection, addDoc } from 'firebase/firestore';
await addDoc(collection(db, 'students'), { test: true });
```

### Issue 3: Upload dokumen gagal

**Penyebab:**
- Firebase Storage tidak enabled
- File size terlalu besar (>2MB)
- Security rules menolak

**Solusi:**
```javascript
// Check file size
console.log('File size:', file.size, 'bytes');
// Must be < 2MB = 2097152 bytes

// Check file type
console.log('File type:', file.type);
// Must be image/* or application/pdf
```

### Issue 4: Error "Permission denied"

**Penyebab:**
- Firestore security rules terlalu ketat
- User tidak authenticated (jika required)

**Solusi:**

Update Firestore Rules (Firebase Console):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      // Allow anyone to create during PPDB period
      allow create: if request.time >= Timestamp.date(2024, 1, 1) &&
                       request.time < Timestamp.date(2025, 12, 31);
      
      // Allow read for owner and admin
      allow read: if true;  // For testing, restrict later
      
      // Allow update for admin only
      allow update: if true;  // For testing, restrict later
    }
  }
}
```

---

## 📊 Verify Data di Firestore

### 1. Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project `x-ppdb`
3. Klik **Firestore Database**
4. Cek collection `students`
5. Document baru harus muncul dengan field:
   - `data_siswa`
   - `data_ortu`
   - `data_sekolah`
   - `pilihan_jurusan`
   - `dokumen` (URL setelah upload)
   - `status`: "pending"
   - `nomor_pendaftaran`: "PPDB-..."

### 2. Firebase Storage

1. Buka **Storage** di Firebase Console
2. Cek folder `students/{studentId}/`
3. File dokumen harus ada:
   - `foto_3x4_{timestamp}_{filename}`
   - `kk_file_{timestamp}_{filename}`
   - `akta_kelahiran_{timestamp}_{filename}`
   - dll.

---

## 🧪 Test Submission Manual

Test via browser console:

```javascript
// 1. Import functions
import { db, storage } from './services/firebase.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// 2. Test create document
const testData = {
  data_siswa: {
    nama_lengkap: 'Test User',
    nisn: '1234567890',
    nik: '1234567890123456'
  },
  status: 'pending',
  created_at: serverTimestamp(),
  updated_at: serverTimestamp()
};

const result = await addDoc(collection(db, 'students'), testData);
console.log('Test create success:', result.id);

// 3. Check if document exists
import { doc, getDoc } from 'firebase/firestore';
const docRef = doc(db, 'students', result.id);
const docSnap = await getDoc(docRef);
console.log('Document exists:', docSnap.exists());
console.log('Document data:', docSnap.data());
```

---

## 📝 Checklist Debugging

### Frontend Check
- [ ] Console logs muncul saat klik "Ya, Kirim Pendaftaran"
- [ ] Tidak ada JavaScript errors di console
- [ ] Loading overlay muncul saat submit
- [ ] Navigate ke halaman success setelah submit berhasil

### Firebase Check
- [ ] Firebase initialized (check console logs)
- [ ] Firestore collection `students` ada
- [ ] Document baru muncul di Firestore
- [ ] Document memiliki field yang lengkap
- [ ] `created_at` dan `updated_at` adalah server timestamps

### Storage Check
- [ ] Firebase Storage enabled
- [ ] Folder `students/{studentId}/` dibuat
- [ ] File dokumen ter-upload
- [ ] File URLs tersimpan di Firestore

### Network Check
- [ ] Tidak ada network errors
- [ ] Firebase API accessible
- [ ] No CORS errors

---

## 🎯 Expected Behavior

### Success Flow:
1. User klik "Periksa & Kirim" → Halaman konfirmasi muncul
2. User klik "Ya, Kirim Pendaftaran" → Loading overlay muncul
3. Console logs muncul (🔥 📝 📦 ✅)
4. Data tersimpan di Firestore
5. Dokumen ter-upload ke Storage
6. Navigate ke halaman success
7. User melihat nomor pendaftaran

### Error Flow:
1. User klik submit
2. Validation error → Error alert muncul
3. Atau Firestore error → Error alert dengan pesan error
4. Console log error (❌)
5. User tetap di halaman form

---

## 📞 Support

Jika masih ada masalah:

1. **Screenshot** console logs (termasuk errors)
2. **Screenshot** Firebase Console (Firestore & Storage)
3. **Copy-paste** error message lengkap
4. **Test** manual submission via console

---

**Last Updated:** 2024-03-28
**Version:** 1.0
