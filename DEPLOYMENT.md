# 🎉 PPDB System - Production Deployment

## ✅ Deployment Status

**Project berhasil di-deploy ke Google Apps Script!**

### 📋 Deployment Info

| Item | Value |
|------|-------|
| **Project Name** | PPDB System Production |
| **Script ID** | `1FlpC--CP6QoARcbRSymd2cVhRUkoboGrIbDx9Mh-CmR4TPPIVg7x7ydb` |
| **Deployment ID** | `AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA` |
| **Version** | @1 |
| **Status** | ✅ Deployed |

### 🔗 URLs

**Web App URL:**
```
https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec
```

**Apps Script Editor:**
```
https://script.google.com/d/1FlpC--CP6QoARcbRSymd2cVhRUkoboGrIbDx9Mh-CmR4TPPIVg7x7ydb/edit
```

**Google Sheet Database:**
```
https://docs.google.com/spreadsheets/d/1wKNxDoTTe4ZhRWHugHsVjUEO5hUDipQp8-gMuaquKvU/edit
```

---

## ⚙️ Setup Script Properties

1. Buka [Apps Script Editor](https://script.google.com/d/1FlpC--CP6QoARcbRSymd2cVhRUkoboGrIbDx9Mh-CmR4TPPIVg7x7ydb/edit)
2. Klik ⚙️ **Project Settings** (Settings gear icon)
3. Scroll ke **Script Properties**
4. Klik **Add a script property**
5. **Key:** `SHEET_ID`
6. **Value:** `1wKNxDoTTe4ZhRWHugHsVjUEO5hUDipQp8-gMuaquKvU`
7. Klik **Add**

---

## 🔗 Update Frontend API URL

Edit file: `frontend/src/services/api.js`

```javascript
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec';
```

---

## 🧪 Test API

### Test 1: Ping (Health Check)
```bash
curl "https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec?action=ping"
```

### Test 2: Get Statistics
```bash
curl "https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec?action=getStats"
```

### Test 3: Get All Students
```bash
curl "https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec?action=getStudents"
```

### Test 4: Create Student
```bash
curl -X POST "https://script.google.com/macros/s/AKfycbxEv_OduYOJVoHiWkmLeYUHJqJaeKPmDV2tULIJENPc4V6kgZqle6xegtqvASxrYzcFgA/exec" \
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

## 🚀 Re-Deploy (After Changes)

```bash
cd /data/data/com.termux/files/home/ppdb-system

# Push changes
clasp push

# Deploy new version
clasp deploy --description "Updated deployment"
```

---

## 📊 Manage Deployments

```bash
# List all deployments
clasp deployments

# View logs
clasp logs

# Open script in browser (manual)
# Visit: https://script.google.com/d/1FlpC--CP6QoARcbRSymd2cVhRUkoboGrIbDx9Mh-CmR4TPPIVg7x7ydb/edit
```

---

## ⚠️ Important Notes

1. **First Run:** Setelah setup Script Properties, jalankan fungsi `doGet` sekali dari Apps Script Editor untuk authorize akses
2. **Access:** Web App sudah diset ke "Anyone with the link"
3. **Quota:** Google Apps Script memiliki daily quota limits
4. **Logs:** Check execution logs di Apps Script Editor jika ada error

---

## 🎯 Next Steps

1. ✅ Setup Script Properties (lihat di atas)
2. ✅ Update frontend API URL
3. ✅ Test API endpoints
4. ✅ Build frontend: `cd frontend && npm run build`
5. ✅ Deploy frontend ke hosting (Vercel, Netlify, dll)

---

**Deployed with ❤️ using CLASP**
