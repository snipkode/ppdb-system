# ⚠️ PENTING: Setup Manual Deployment

## 📋 Langkah Setup (WAJIB DILAKUKAN)

### 1. Buka Apps Script Editor

Klik link ini: https://script.google.com/d/1FlpC--CP6QoARcbRSymd2cVhRUkoboGrIbDx9Mh-CmR4TPPIVg7x7ydb/edit

### 2. Setup Script Properties

1. Klik ikon ⚙️ **Settings** di sidebar kiri
2. Scroll ke bagian **Script Properties**
3. Klik tombol **Add a script property**
4. Isi:
   - **Key:** `SHEET_ID`
   - **Value:** `1wKNxDoTTe4ZhRWHugHsVjUEO5hUDipQp8-gMuaquKvU`
5. Klik **Add**

### 3. Deploy Ulang dengan Access Settings yang Benar

1. Klik tombol biru **Deploy** di pojok kanan atas
2. Pilih **New deployment** (atau **Manage deployments** → Edit jika sudah ada)
3. Klik roda gigi ⚙️ di samping "Select type"
4. Pilih **Web app**
5. Konfigurasi:
   - **Description:** `Production v1`
   - **Execute as:** `Me (dwisuliwa0019@gmail.com)`
   - **Who has access:** `Anyone` ⚠️ (JANGAN pilih "Anyone with Google Account")
6. Klik **Deploy**
7. Jika muncul popup authorization:
   - Klik **Authorize access**
   - Pilih account Google Anda
   - Klik **Advanced** → **Go to PPDB System Production (unsafe)**
   - Klik **Allow**
8. Copy **Web app URL** yang muncul

### 4. Test API

Buka URL ini di browser:
```
https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec?action=ping
```

Harus muncul:
```json
{
  "success": true,
  "message": "API is running!",
  "timestamp": "2024-..."
}
```

### 5. Update URL di Frontend (jika URL berubah)

Jika Web app URL berbeda, update file:
`frontend/src/services/api.js`

```javascript
const API_BASE_URL = 'https://script.google.com/macros/s/YOUR_NEW_URL/exec';
```

---

## 🔍 Troubleshooting

### Error: "File not found" / 404

**Solusi:**
- Pastikan deployment sudah aktif
- Cek bahwa Web app URL benar
- Pastikan access = `Anyone` (bukan `Anyone with Google Account`)

### Error: "Permission denied" / 403

**Solusi:**
- Setup Script Properties dengan benar
- Jalankan fungsi `doGet` sekali dari editor untuk authorize
- Klik **Run** → Pilih `doGet` → Jalankan → Authorize

### Error: "Internal server error" / 500

**Solusi:**
- Buka **Executions** di sidebar Apps Script
- Lihat error detail
- Biasanya karena `SHEET_ID` belum di-set

---

## ✅ Checklist

- [ ] Script Properties `SHEET_ID` sudah di-set
- [ ] Deploy sebagai Web app
- [ ] Execute as: `Me`
- [ ] Who has access: `Anyone`
- [ ] Sudah authorize access
- [ ] Test endpoint `?action=ping` berhasil
- [ ] Frontend API URL sudah update

---

**Setelah semua checklist ✅, sistem PPDB siap digunakan! 🎉**
