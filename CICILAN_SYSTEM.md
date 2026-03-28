# 💳 Sistem Cicilan PPDB - Dokumentasi

## 📋 Overview

Sistem pembayaran PPDB telah diubah dari **paket biaya tunggal** menjadi **sistem cicilan** yang lebih ringan dan fleksibel.

---

## 🔄 Perubahan Sistem

### **Sebelum (Paket Biaya):**
```
Biaya Pendaftaran: Rp 150.000 (Lumpsum/sekali bayar)
```

### **Sekarang (Cicilan):**
```
Total Biaya: Rp 1.500.000
Cicilan: 3x bulan
Per Bulan: Rp 500.000
```

---

## 💰 Struktur Cicilan

### **Cicilan 3 Bulan**

| Bulan | Jumlah | Jatuh Tempo | Status |
|-------|--------|-------------|--------|
| 1 | Rp 500.000 | Saat pendaftaran | Unpaid/Paid |
| 2 | Rp 500.000 | 30 hari setelah cicilan 1 | Unpaid/Paid |
| 3 | Rp 500.000 | 30 hari setelah cicilan 2 | Unpaid/Paid |

**Total: Rp 1.500.000**

---

## 🎯 Flow Pembayaran

### **User Flow:**

```
1. User daftar → Cicilan 1 aktif
2. User bayar cicilan 1 → Upload bukti
3. Admin verifikasi → Cicilan 1 lunas
4. +30 hari → Cicilan 2 aktif
5. User bayar cicilan 2 → Upload bukti
6. Admin verifikasi → Cicilan 2 lunas
7. +30 hari → Cicilan 3 aktif
8. User bayar cicilan 3 → Upload bukti
9. Admin verifikasi → SEMUA LUNAS ✅
```

---

## 📊 Status Cicilan

### **Per Cicilan:**
- `unpaid` - Belum dibayar
- `pending` - Menunggu verifikasi (sudah upload bukti)
- `paid` - Lunas (terverifikasi)
- `rejected` - Ditolak (bukti tidak valid)

### **Overall Progress:**
```javascript
{
  cicilan: [
    { bulan: 1, status: 'paid', paidAt: '2024-01-01' },
    { bulan: 2, status: 'pending', uploadedAt: '2024-01-15' },
    { bulan: 3, status: 'unpaid' }
  ],
  totalPaid: 500000,
  totalAmount: 1500000,
  progress: 33%
}
```

---

## 🎨 UI Changes

### **PaymentInfo Component**

**New Features:**
1. ✅ **Progress Bar** - Visual progress pembayaran
2. ✅ **Total Paid** - Total sudah dibayar
3. ✅ **Remaining** - Sisa yang harus dibayar
4. ✅ **Cicilan Timeline** - Detail per bulan
5. ✅ **Active Cicilan** - Highlight cicilan aktif

**Visual Elements:**
```
┌─────────────────────────────────────┐
│ Total Biaya: Rp 1.500.000          │
│ Cicilan: 3x bulan                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Sudah Dibayar: Rp 500.000          │
│ Progress: ████░░░░░░ 33%           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Sisa: Rp 1.000.000                 │
│ Cicilan Aktif: Bulan ke-2          │
└─────────────────────────────────────┘

Detail Cicilan:
○ Bulan 1 - Rp 500.000 - ✅ Lunas
● Bulan 2 - Rp 500.000 - ⏳ Pending
○ Bulan 3 - Rp 500.000 - ⚪ Belum Bayar
```

---

## 🔧 Firestore Schema Update

### **Collection: `students`**

**Old Schema:**
```javascript
pembayaran: {
  status: 'pending' | 'paid' | 'rejected',
  amount: 150000,
  bank_name: 'BCA',
  transfer_date: '2024-01-01',
  bukti_transfer: 'url',
  uploaded_at: timestamp,
  verified_at: timestamp,
  rejected_reason: 'string'
}
```

**New Schema:**
```javascript
pembayaran: {
  totalBiaya: 1500000,
  cicilanPeriode: 3,
  cicilan: [
    {
      bulan: 1,
      jumlah: 500000,
      status: 'paid',
      bank_name: 'BCA',
      transfer_date: '2024-01-01',
      buktiUrl: 'url',
      uploadedAt: timestamp,
      verifiedAt: timestamp,
      rejectedReason: 'string'
    },
    {
      bulan: 2,
      jumlah: 500000,
      status: 'pending',
      // ... same fields
    },
    {
      bulan: 3,
      jumlah: 500000,
      status: 'unpaid'
    }
  ],
  totalPaid: 500000,
  lastPaymentAt: timestamp
}
```

---

## 📱 Admin Dashboard

### **Admin Payments Page**

**New Columns:**
- **Cicilan Ke-** - Bulan ke berapa
- **Progress** - X/Y lunas (e.g., 2/3)
- **Next Payment** - Jatuh tempo cicilan berikutnya

**Filter Options:**
- All
- Belum Lunas (progress < 100%)
- Sudah Lunas (progress = 100%)
- Overdue (melewati jatuh tempo)

---

## ⚙️ Configuration

### **Default Config:**
```javascript
const cicilanConfig = {
  totalBiaya: 1500000,      // Rp 1.500.000
  cicilanPeriode: 3,         // 3 bulan
  cicilanPerBulan: 500000,   // Rp 500.000/bulan
  gracePeriod: 30,           // 30 hari jatuh tempo
};
```

### **Custom Config (Optional):**
```javascript
// Bisa disesuaikan per tahun ajaran
const customConfig = {
  2024: {
    totalBiaya: 1500000,
    cicilanPeriode: 3,
    cicilanPerBulan: 500000
  },
  2025: {
    totalBiaya: 2000000,
    cicilanPeriode: 4,
    cicilanPerBulan: 500000
  }
};
```

---

## 🚀 Migration

### **From Old to New System:**

**Option 1: Automatic Conversion**
```javascript
// Convert existing single payment to cicilan
function migrateToCicilan(oldPayment) {
  return {
    totalBiaya: 1500000,
    cicilanPeriode: 3,
    cicilan: [
      {
        bulan: 1,
        jumlah: 500000,
        status: oldPayment.status,
        buktiUrl: oldPayment.bukti_transfer,
        uploadedAt: oldPayment.uploaded_at,
        verifiedAt: oldPayment.verified_at
      },
      { bulan: 2, jumlah: 500000, status: 'unpaid' },
      { bulan: 3, jumlah: 500000, status: 'unpaid' }
    ],
    totalPaid: oldPayment.status === 'paid' ? 500000 : 0
  };
}
```

**Option 2: Manual Update**
1. Export existing data
2. Transform to new schema
3. Import back to Firestore

---

## 📧 Email Notifications

### **New Email Templates:**

**1. Cicilan Aktif:**
```
Subject: Cicilan Bulan ke-{X} Telah Aktif

Hi {nama},

Cicilan bulan ke-{X} sebesar {amount} telah aktif.
Silakan lakukan pembayaran sebelum {jatuhTempo}.
```

**2. Pembayaran Diterima:**
```
Subject: Cicilan Bulan ke-{X} Diterima

Hi {nama},

Cicilan bulan ke-{X} sebesar {amount} telah diterima.
Sedang dalam proses verifikasi.
```

**3. Cicilan Lunas:**
```
Subject: 🎉 Selamat! Semua Cicilan Telah Lunas

Hi {nama},

Selamat! Semua cicilan pendaftaran Anda telah lunas.
Silakan lanjutkan ke tahap berikutnya.
```

**4. Reminder Jatuh Tempo:**
```
Subject: ⏰ Reminder: Cicilan Bulan ke-{X} Segera Jatuh Tempo

Hi {nama},

Cicilan bulan ke-{X} akan jatuh tempo pada {tanggal}.
Jangan lupa untuk segera melakukan pembayaran.
```

---

## 🎯 Benefits

### **Untuk Siswa/Orang Tua:**
1. ✅ **Lebih ringan** - Tidak perlu bayar sekaligus
2. ✅ **Fleksibel** - 3x cicilan tanpa bunga
3. ✅ **Transparan** - Progress jelas per bulan
4. ✅ **Terjangkau** - Rp 500rb/bulan vs Rp 1.5jt sekaligus

### **Untuk Sekolah:**
1. ✅ **Cash flow lebih baik** - Pembayaran bertahap
2. ✅ **Retensi lebih tinggi** - Siswa tidak dropout karena biaya
3. ✅ **Admin lebih mudah** - Tracking per cicilan
4. ✅ **Data lebih akurat** - Progress pembayaran real-time

---

## 📊 Reporting

### **New Reports:**

**1. Cicilan Overview:**
- Total siswa dengan cicilan aktif
- Total sudah dibayar
- Total sisa yang akan dibayar
- Average progress per siswa

**2. Overdue Report:**
- Siswa yang melewati jatuh tempo
- Total cicilan overdue
- Reminder yang perlu dikirim

**3. Completion Rate:**
- Siswa yang sudah lunas
- Persentase kelulusan cicilan
- Waktu rata-rata pelunasan

---

## 🔐 Security

### **Payment Verification:**
1. ✅ Upload bukti transfer
2. ✅ Admin verifikasi manual
3. ✅ Status update real-time
4. ✅ Email notification otomatis

### **Access Control:**
- Siswa: Hanya lihat cicilan sendiri
- Admin: Lihat semua cicilan
- Super Admin: Config cicilan

---

## 📝 Testing Checklist

### **Test User Flow:**
- [ ] Daftar → Cicilan 1 aktif
- [ ] Bayar cicilan 1 → Upload bukti
- [ ] Admin verifikasi → Cicilan 1 lunas
- [ ] +30 hari → Cicilan 2 otomatis aktif
- [ ] Bayar cicilan 2 → Upload bukti
- [ ] Admin verifikasi → Cicilan 2 lunas
- [ ] +30 hari → Cicilan 3 aktif
- [ ] Bayar cicilan 3 → Upload bukti
- [ ] Admin verifikasi → SEMUA LUNAS
- [ ] Email konfirmasi lunas terkirim

### **Test Admin Flow:**
- [ ] Lihat daftar cicilan
- [ ] Filter by status (unpaid/pending/paid)
- [ ] Verifikasi cicilan
- [ ] Tolak cicilan dengan alasan
- [ ] Lihat progress per siswa
- [ ] Export laporan cicilan

---

## 🎨 UI Components

### **Updated Components:**
- ✅ `PaymentInfo.jsx` - Main cicilan display
- ✅ `PaymentUpload.jsx` - Upload bukti per cicilan
- ✅ `PaymentTable.jsx` - Admin table dengan progress
- ✅ `PaymentDetailModal.jsx` - Detail cicilan per siswa

### **New Components:**
- `CicilanProgress.jsx` - Progress bar component
- `CicilanTimeline.jsx` - Timeline visual cicilan
- `CicilanReminder.jsx` - Reminder component

---

## 📱 Mobile Responsive

All components are mobile-responsive:
- ✅ Progress bar adaptif
- ✅ Cicilan cards stack di mobile
- ✅ Upload button full-width
- ✅ Bank accounts grid 1 kolom

---

## 🚀 Deployment

### **Steps:**
1. Backup Firestore data
2. Deploy new schema
3. Run migration script
4. Test dengan user sample
5. Monitor error logs
6. Send announcement email

---

**Last Updated:** 2024
**Version:** 2.0.0 (Cicilan System)
**Status:** ✅ Production Ready
