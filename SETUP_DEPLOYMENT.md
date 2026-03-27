# ⚠️ SETUP DEPLOYMENT - WAJIB DILAKUKAN

## 📋 Masalah

API mengembalikan error 404 "Halaman Tidak Ditemukan" karena **access settings** belum dikonfigurasi dengan benar.

## ✅ Solusi - Setup Manual (5 Menit)

### Langkah 1: Buka Apps Script Editor

Klik link ini:
**https://script.google.com/d/1FlpC--CP6QoARcbRSymd2cVhRUkoboGrIbDx9Mh-CmR4TPPIVg7x7ydb/edit**

### Langkah 2: Verify Script Properties

1. Klik ikon ⚙️ **Settings** di sidebar kiri
2. Scroll ke **Script Properties**
3. Pastikan ada:
   - **Key:** `SHEET_ID`
   - **Value:** `1wKNxDoTTe4ZhRWHugHsVjUEO5hUDipQp8-gMuaquKvU`

### Langkah 3: Setup Web App Deployment

1. Klik tombol biru **Deploy** di pojok kanan atas
2. Pilih **Manage deployments**
3. Klik ikon ✏️ (Edit) pada deployment yang ada
4. Atau klik **Create new deployment** jika belum ada

### Langkah 4: Konfigurasi Access (PENTING!)

Di dialog deployment, pastikan:

| Setting | Value |
|---------|-------|
| **Description** | `Production v2` |
| **Execute as** | `Me (dwisuliwa0019@gmail.com)` |
| **Who has access** | `Anyone` ⚠️ |

**⚠️ PENTING:** Pilih **Anyone**, BUKAN "Anyone with Google Account"

### Langkah 5: Authorize

Jika muncul popup authorization:

1. Klik **Authorize access**
2. Pilih account Google Anda
3. Klik **Advanced**
4. Klik **Go to PPDB System Production (unsafe)**
5. Klik **Allow**

### Langkah 6: Copy Web App URL

Setelah deploy berhasil, copy URL yang muncul:
```
https://script.google.com/macros/s/AKfycbxM-ToTf0WIWgEAs5-z8GnDFzeGgguJEzBqPnJe7WRlwAO1WINfV1maYMS-6L0MPFdgYg/exec
```

### Langkah 7: Test API

Buka di browser:
```
https://script.google.com/macros/s/AKfycbxM-ToTf0WIWgEAs5-z8GnDFzeGgguJEzBqPnJe7WRlwAO1WINfV1maYMS-6L0MPFdgYg/exec?action=ping
```

**Harus muncul:**
```json
{
  "success": true,
  "message": "API is running!",
  "timestamp": "2024-..."
}
```

---

## 🧪 Test dengan cURL

```bash
cd /data/data/com.termux/files/home/ppdb-system
chmod +x test-api.sh
./test-api.sh
```

Atau manual:

```bash
# Ping test
curl "https://script.google.com/macros/s/AKfycbxM-ToTf0WIWgEAs5-z8GnDFzeGgguJEzBqPnJe7WRlwAO1WINfV1maYMS-6L0MPFdgYg/exec?action=ping"

# Get stats
curl "https://script.google.com/macros/s/AKfycbxM-ToTf0WIWgEAs5-z8GnDFzeGgguJEzBqPnJe7WRlwAO1WINfV1maYMS-6L0MPFdgYg/exec?action=getStats"

# Create student
curl -X POST "https://script.google.com/macros/s/AKfycbxM-ToTf0WIWgEAs5-z8GnDFzeGgguJEzBqPnJe7WRlwAO1WINfV1maYMS-6L0MPFdgYg/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createStudent",
    "nama_lengkap": "Test Student",
    "nisn": "1234567890",
    "tanggal_lahir": "2005-01-01",
    "jenis_kelamin": "L",
    "agama": "Islam",
    "alamat": "Test Address",
    "kota": "Jakarta",
    "provinsi": "DKI Jakarta",
    "kode_pos": "12345",
    "nama_ortu": "Parent Name",
    "no_telp_ortu": "08123456789",
    "email_ortu": "parent@example.com",
    "asal_sekolah": "SMP Test",
    "jurusan_dipilih": "IPA"
  }'
```

---

## 🔍 Troubleshooting

### Error: "Halaman Tidak Ditemukan" / 404

**Penyebab:** Access settings salah

**Solusi:**
1. Pastikan **Who has access** = `Anyone` (bukan "Anyone with Google Account")
2. Make sure deployment sudah aktif
3. Clear browser cache dan coba lagi

### Error: "Permission denied" / 403

**Penyebab:** Script properties belum di-set

**Solusi:**
1. Setup `SHEET_ID` di Script Properties
2. Jalankan fungsi `doGet` sekali dari editor untuk authorize

### Error: "Internal server error" / 500

**Penyebab:** Sheet ID tidak valid atau tidak ada

**Solusi:**
1. Pastikan Sheet ID benar: `1wKNxDoTTe4ZhRWHugHsVjUEO5hUDipQp8-gMuaquKvU`
2. Buka Google Sheet untuk verify akses
3. Check **Executions** di Apps Script untuk detail error

---

## ✅ Checklist

- [ ] Script Properties `SHEET_ID` sudah di-set
- [ ] Deploy sebagai Web app
- [ ] Execute as: `Me (dwisuliwa0019@gmail.com)`
- [ ] Who has access: `Anyone`
- [ ] Sudah authorize access
- [ ] Test endpoint `?action=ping` berhasil return JSON
- [ ] Frontend API URL sudah update

---

**Setelah semua checklist ✅, sistem PPDB siap digunakan! 🎉**
