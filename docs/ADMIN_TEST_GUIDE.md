# 📋 Cara Test Admin Panel - PPDB System

## 🔐 Akses Admin

### Email Admin yang Didukung
Sistem admin hanya dapat diakses dengan email domain **`@smk.sch.id`**

**Test Email:**
```
admin@smk.sch.id
test@smk.sch.id
kepala.sekolah@smk.sch.id
```

---

## 🚀 Cara Login Admin

### 1. Via Header (Desktop)
- Klik tombol **"Admin"** di header (border ungu)
- Atau langsung akses: `http://localhost:5173/admin/login`

### 2. Via Mobile Menu
- Buka hamburger menu
- Scroll ke bawah
- Klik **"Admin Login"**

### 3. Direct URL
```
http://localhost:5173/admin/login
```

---

## 📱 Flow Login Admin

```
1. Buka halaman /admin/login
2. Klik "Masuk dengan Google"
3. Login dengan email @smk.sch.id
4. Sistem akan verifikasi email
5. Redirect ke /admin/payments (Dashboard)
```

---

## 🎯 Dashboard Admin

Setelah login, Anda akan diarahkan ke **Payment Management**:

### URL Dashboard Admin:
- **Payments**: `/admin/payments` - Kelola pembayaran
- **Notifications**: `/admin/notifications` - Kirim notifikasi
- **Exam Schedule**: `/admin/exams` - Jadwal ujian
- **Exam Results**: `/admin/exam-results` - Nilai ujian
- **Reports**: `/admin/reports` - Laporan

---

## 🔒 Keamanan

### Proteksi Halaman Admin:
1. ✅ **Harus login** - Redirect ke `/admin/login` jika belum
2. ✅ **Email validation** - Hanya `@smk.sch.id` yang diterima
3. ✅ **Auto redirect** - Jika sudah login, langsung ke dashboard
4. ✅ **Access denied** - Non-admin akan ditolak

### Jika Email Bukan Admin:
```
⛔ Akses ditolak!

Hanya email @smk.sch.id yang dapat login sebagai admin.
```

---

## 🧪 Testing Checklist

### Test Login:
- [ ] Login dengan email `@smk.sch.id` → ✅ Berhasil
- [ ] Login dengan email `@gmail.com` → ❌ Ditolak
- [ ] Login dengan email `@yahoo.com` → ❌ Ditolak
- [ ] Belum login akses `/admin/payments` → Redirect ke `/admin/login`
- [ ] Sudah login → Auto redirect ke `/admin/payments`

### Test Dashboard:
- [ ] Lihat daftar pembayaran
- [ ] Verifikasi pembayaran
- [ ] Kirim notifikasi
- [ ] Lihat jadwal ujian
- [ ] Input nilai
- [ ] Generate laporan

### Test UI:
- [ ] Header admin link muncul untuk admin
- [ ] Mobile menu admin link muncul
- [ ] Gradient purple/pink theme
- [ ] Responsive di mobile
- [ ] Loading states bekerja

---

## 🎨 Tampilan Admin

### Login Page:
- Background: Gradient gelap (slate/purple)
- Card: White dengan glassmorphism
- Header: Gradient purple-pink
- Icon: Shield (🛡️)
- Test email hint: Ditampilkan di card

### Dashboard:
- Modern table design
- Status badges (verified, pending, rejected)
- Action buttons
- Search & filter
- Responsive layout

---

## 💡 Tips Testing

### 1. Firebase Emulator
Jika menggunakan emulator, pastikan Firebase debug mode aktif:
```javascript
// src/services/firebaseDebug.js
setupFirebaseEmulators()
```

### 2. Clear Cache
Jika ada masalah login:
```
1. Clear browser cache
2. Clear cookies
3. Logout semua akun Google
4. Login ulang
```

### 3. Console Log
Cek console untuk debug:
```javascript
console.log('User:', user)
console.log('Is Admin:', isAdmin)
console.log('Email:', user?.email)
```

### 4. Eruda DevTools
Buka Eruda (icon gear ⚙️) untuk inspect:
- User state
- Auth context
- Network requests

---

## 🔧 Troubleshooting

### Problem: "Akses ditolak"
**Solusi:** Gunakan email `@smk.sch.id`

### Problem: Redirect loop
**Solusi:** 
1. Clear cookies
2. Logout
3. Login ulang

### Problem: Admin link tidak muncul
**Solusi:** Pastikan email user berakhir dengan `@smk.sch.id`

### Problem: Firebase error
**Solusi:** 
1. Cek Firebase config
2. Pastikan emulator running
3. Cek console untuk error detail

---

## 📊 Admin Features

| Feature | URL | Description |
|---------|-----|-------------|
| Payments | `/admin/payments` | Kelola & verifikasi pembayaran |
| Notifications | `/admin/notifications` | Kirim notifikasi ke siswa |
| Exam Schedule | `/admin/exams` | Atur jadwal ujian |
| Exam Results | `/admin/exam-results` | Input & kelola nilai |
| Reports | `/admin/reports` | Generate laporan & statistik |

---

## 🎯 Quick Start Test

```bash
# 1. Start development server
cd frontend
npm run dev

# 2. Buka browser
http://localhost:5173/admin/login

# 3. Login dengan Google
Email: admin@smk.sch.id

# 4. Explore dashboard
/admin/payments
/admin/notifications
/admin/exams
```

---

**Last Updated:** 2024
**Version:** 1.0.0
