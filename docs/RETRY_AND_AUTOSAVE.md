# 🔄 Retry Mechanism & Auto-Save PPDB

Fitur retry dan auto-save untuk meningkatkan user experience pada form pendaftaran PPDB.

---

## ✨ Fitur Baru

### 1. **Auto-Save ke LocalStorage**
- ✅ Data tersimpan otomatis saat user mengetik
- ✅ Data tersimpan setiap pindah step
- ✅ Data otomatis restore saat refresh/reopen
- ✅ Indikator "Data tersimpan otomatis"

### 2. **Loading State yang Jelas**
- ✅ Tombol show loading spinner saat submit
- ✅ Progress bar di atas halaman
- ✅ Overlay dengan status "Mengirim..."
- ✅ Tombol tetap visible (tidak hilang)

### 3. **Retry Mechanism**
- ✅ Jika submit gagal, user bisa retry
- ✅ Error message jelas
- ✅ Loading state reset setelah error
- ✅ Data tetap tersimpan untuk retry

### 4. **Clear Draft**
- ✅ Button untuk hapus data tersimpan
- ✅ Konfirmasi sebelum hapus
- ✅ Reset form ke awal

---

## 🎯 User Flow

### Normal Flow (Success)

```
1. User isi form
   ↓
2. Data auto-save ke localStorage (debounce 300ms)
   ↓
3. User klik "Periksa & Kirim"
   ↓
4. Halaman konfirmasi muncul
   ↓
5. User klik "Ya, Kirim Pendaftaran"
   ↓
6. Loading state aktif:
   - Tombol show "Mengirim..." + spinner
   - Progress bar di atas
   - Overlay "Sedang mengirim data..."
   ↓
7. Submit ke Firestore
   ↓
8. Upload dokumen
   ↓
9. Success → Clear localStorage → Navigate ke success page
```

### Error Flow (Retry)

```
1. User isi form
   ↓
2. Data auto-save
   ↓
3. User klik submit
   ↓
4. Loading state aktif
   ↓
5. Error terjadi (network/Firestore)
   ↓
6. Error message muncul
   ↓
7. Loading state reset
   ↓
8. Tombol kembali clickable
   ↓
9. User bisa retry klik submit
   ↓
10. Data masih ada (tidak hilang)
```

---

## 📝 Implementation Details

### Auto-Save Implementation

```javascript
// Load saved data on mount
const [formData, setFormData] = useState(() => {
  const saved = localStorage.getItem('ppdb_draft');
  return saved ? JSON.parse(saved) : defaultData;
});

// Save on input change (debounced)
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  setTimeout(() => {
    const newData = { ...formData, [name]: value };
    localStorage.setItem('ppdb_draft', JSON.stringify(newData));
  }, 300);
};

// Save on step change
useEffect(() => {
  localStorage.setItem('ppdb_draft', JSON.stringify(formData));
}, [currentStep]);
```

### Loading State

```javascript
const handleSubmit = async () => {
  setLoading(true);  // Show loading on button
  setError(null);
  
  try {
    // Submit to Firestore
    const result = await studentApi.create(submissionData);
    
    if (!result.success) {
      throw new Error(result.error);
    }
    
    // Upload documents
    // Update Firestore
    
    // Success: clear draft & navigate
    localStorage.removeItem('ppdb_draft');
    navigate('/success');
    
  } catch (err) {
    // Error: show message but keep data
    setError(err.message);
    // Loading reset, user can retry
  } finally {
    setLoading(false);  // Hide loading
  }
};
```

### Button with Loading State

```javascript
<button
  onClick={handleSubmit}
  disabled={loading}
  className="..."
>
  {loading ? (
    <>
      <FiLoader className="w-4 h-4 animate-spin" />
      <span>Mengirim...</span>
    </>
  ) : (
    <>
      <span>Ya, Kirim Pendaftaran</span>
      <FiCheck className="w-4 h-4" />
    </>
  )}
</button>
```

### Progress Bar

```javascript
{loading && (
  <div className="fixed top-0 left-0 right-0 z-50">
    <div className="h-1 bg-gray-200">
      <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-progress"></div>
    </div>
    <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-3 text-center">
      <div className="flex items-center justify-center gap-2">
        <FiLoader className="w-4 h-4 animate-spin" />
        <span>Sedang mengirim data ke Firestore...</span>
      </div>
      <p className="text-xs text-white/70 mt-1">Mohon tunggu, jangan tutup halaman ini</p>
    </div>
  </div>
)}
```

### Auto-Save Indicator

```javascript
<div className="fixed bottom-4 right-4 z-40">
  <div className="bg-white shadow-lg rounded-lg px-3 py-2 text-xs text-gray-600 border">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${submitAttempted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      <span>Data tersimpan otomatis</span>
    </div>
  </div>
</div>
```

---

## 🔍 Visual Indicators

### 1. Loading States

**Button:**
- Normal: "Ya, Kirim Pendaftaran" ✓
- Loading: "Mengirim..." ⏳ (spinner)

**Progress Bar:**
- Animated gradient bar di atas halaman
- Overlay dengan message

**Auto-Save:**
- Badge di bottom-right
- Green dot jika sudah pernah submit
- Gray dot jika belum

### 2. Error States

**Error Alert:**
```
┌─────────────────────────────────────┐
│ ⚠️ Terjadi Kesalahan                │
│ Gagal menyimpan data. Silakan coba  │
│ lagi.                               │
└─────────────────────────────────────┘
```

**Button:**
- Kembali ke state normal
-Clickable untuk retry
- Data tetap ada

---

## 📊 LocalStorage Structure

```javascript
// Key: 'ppdb_draft'
{
  // Data Siswa
  nama_lengkap: "John Doe",
  nisn: "1234567890",
  nik: "1234567890123456",
  tempat_lahir: "Jakarta",
  tanggal_lahir: "2008-01-01",
  jenis_kelamin: "L",
  agama: "Islam",
  alamat: "Jl. Contoh No. 123",
  rt_rw: "001/02",
  kelurahan: "kelurahan-id",
  kecamatan: "kecamatan-id",
  kota: "kabupaten-id",
  provinsi: "provinsi-id",
  kode_pos: "12345",
  telepon: "081234567890",
  email: "john@example.com",
  
  // Data Ortu
  nama_ayah: "Father Name",
  pendidikan_ayah: "S1",
  pekerjaan_ayah: "Employee",
  penghasilan_ayah: "5-10jt",
  nama_ibu: "Mother Name",
  // ... etc
  
  // Data Sekolah
  npsn: "12345678",
  nama_sekolah: "SMP Example",
  alamat_sekolah: "...",
  tahun_lulus: 2024,
  nilai_bahasa_indonesia: "85",
  nilai_matematika: "90",
  nilai_ipa: "88",
  nilai_bahasa_inggris: "92",
  
  // Pilihan Jurusan
  pilihan_1: "RPL",
  pilihan_2: "TKJ",
  
  // Files (stored as File objects, will be null on restore)
  foto_3x4: null,  // Will be null after page reload
  kk_file: null,
  // ... etc
}
```

**Note:** File objects tidak bisa disimpan di localStorage. Setelah refresh, user perlu upload ulang file.

---

## 🛠️ Clear Draft Feature

### Button Location
- Di bawah header form
- Text: "🗑️ Hapus Data Tersimpan"
- Color: Red (danger)

### Behavior
```javascript
const handleClearDraft = () => {
  if (confirm('Hapus data yang tersimpan? Anda harus mengisi form dari awal.')) {
    localStorage.removeItem('ppdb_draft');
    setFormData(defaultData);
    setCurrentStep(1);
    setError(null);
    setSubmitAttempted(false);
    window.scrollTo(0, 0);
  }
};
```

### Use Cases
- User ingin mulai dari awal
- Data corrupt/error
- Testing purpose
- Wrong data entered

---

## ✅ Checklist Features

### Auto-Save
- [x] Load data on mount
- [x] Save on input change (debounced)
- [x] Save on step change
- [x] Restore data on refresh
- [x] Indicator badge
- [x] Clear on success

### Loading State
- [x] Button loading spinner
- [x] Progress bar animation
- [x] Overlay message
- [x] Disable button saat loading
- [x] Reset after error

### Retry Mechanism
- [x] Keep data on error
- [x] Clear error message
- [x] Reset loading state
- [x] Button clickable untuk retry
- [x] Console logging untuk debug

### UX Improvements
- [x] Clear draft button
- [x] Confirmation before clear
- [x] Auto-scroll on error
- [x] Success navigation
- [x] Clear localStorage on success

---

## 🎯 Benefits

### For Users:
1. **No Data Loss** - Data tersimpan otomatis
2. **Can Retry** - Jika error, bisa coba lagi
3. **Clear Status** - Tahu kapan loading/success/error
4. **Fresh Start** - Bisa clear data jika mau

### For Admin:
1. **Less Support Tickets** - User tidak panik saat error
2. **Better UX** - Professional appearance
3. **Debuggable** - Console logs untuk troubleshooting
4. **Higher Completion Rate** - User tidak menyerah saat error

---

## 📝 Testing Scenarios

### Test 1: Auto-Save
1. Isi form sebagian
2. Refresh halaman
3. ✅ Data harus masih ada (kecuali file)

### Test 2: Submit Success
1. Isi form lengkap
2. Upload semua dokumen
3. Submit
4. ✅ Navigate ke success page
5. ✅ LocalStorage cleared
6. ✅ Data ada di Firestore

### Test 3: Submit Error & Retry
1. Isi form lengkap
2. Disconnect internet
3. Submit
4. ✅ Error message muncul
5. ✅ Loading reset
6. ✅ Data masih ada
7. Connect internet
8. Submit lagi
9. ✅ Success

### Test 4: Clear Draft
1. Isi form
2. Klik "Hapus Data Tersimpan"
3. Confirm
4. ✅ Form reset ke awal
5. ✅ LocalStorage cleared

---

## 🔗 Related Files

- `/frontend/src/pages/Register.jsx` - Main form component
- `/frontend/src/index.css` - Progress bar animation
- `/frontend/src/services/api.js` - Firestore API
- `/docs/FIRESTORE_SUBMIT_DEBUG.md` - Debug guide

---

**Last Updated:** 2024-03-28
**Version:** 1.1
