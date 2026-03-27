# PPDB Online - Sistem Penerimaan Peserta Didik Baru

Sistem PPDB modern dan responsif dengan backend Google Apps Script.

## 🚀 Tech Stack

- **Frontend:**
  - React 18
  - Vite
  - Tailwind CSS
  - Zustand (State Management)
  - React Icons
  - React Router DOM
  - Axios

- **Backend:**
  - Google Apps Script
  - Google Sheets (Database)

## 📁 Struktur Project

```
ppdb-system/
├── Code.gs                 # Google Apps Script backend
├── README.md              # Dokumentasi ini
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── stores/        # Zustand stores
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    └── package.json
```

## 🔧 Setup & Instalasi

### 1. Setup Google Apps Script Backend dengan CLASP

```bash
cd ppdb-system

# Login ke Google Account
clasp login

# Buat project Google Apps Script baru
clasp create --title "PPDB API" --type sheets

# Atau gunakan project yang sudah ada
# clasp clone <SCRIPT_ID>

# Push code ke Google Apps Script
clasp push

# Deploy sebagai Web App
clasp deploy --title "PPDB API v1" --description "Production deployment"
```

**First time setup:**
1. Jalankan `clasp login` untuk authenticate dengan Google
2. Jalankan `clasp create --title "PPDB API" --type sheets`
3. Copy Script ID yang dihasilkan
4. Update `SHEET_ID` di Script Properties (lihat langkah berikut)

**Setup Script Properties:**
1. Buka https://script.google.com/
2. Pilih project "PPDB API"
3. Klik ⚙️ Project Settings → Script Properties
4. Add property: `SHEET_ID` (kosongkan dulu, akan auto-create saat pertama run)

**Update Web App URL:**
Setelah deploy, update URL di `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

**Re-deploy setelah update:**
```bash
clasp deploy --title "PPDB API v2"
```

```bash
cd frontend

# Install dependencies
npm install

# Update API URL di src/services/api.js
# Ganti 'YOUR_DEPLOYMENT_ID' dengan Web App URL dari langkah 2

# Run development server
npm run dev

# Build untuk production
npm run build
```

### 4. Update API Configuration

Edit file `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

Ganti `YOUR_DEPLOYMENT_ID` dengan URL Web App yang didapat dari deploy.

## 📱 Fitur

### Mobile Responsive
- Navigation menu dengan hamburger menu
- Form input yang optimal untuk touchscreen
- Card layout yang adaptif

### Desktop Modern
- Full navigation bar
- Dashboard dengan statistik lengkap
- Table view untuk data siswa

### Halaman
1. **Beranda** - Dashboard dengan statistik dan informasi
2. **Pendaftaran** - Form pendaftaran siswa baru
3. **Cek Status** - Cek status pendaftaran dengan ID

## 🎨 Customization

### Warna Tema
Edit di `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eef2ff',
    // ... customize colors
  },
}
```

### Jurusan
Edit di `frontend/src/components/RegistrationForm.jsx`:

```javascript
const jurusanOptions = ['IPA', 'IPS', 'Bahasa', 'TKJ', 'RPL', 'AKL', 'MM'];
```

## 📊 Database Schema

Google Sheets akan membuat tabel otomatis dengan kolom:

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | Text | ID unik pendaftaran (STD-timestamp) |
| nama_lengkap | Text | Nama lengkap siswa |
| nisn | Text | NISN siswa |
| tanggal_lahir | Date | Tanggal lahir |
| jenis_kelamin | Text | L/P |
| agama | Text | Agama |
| alamat | Text | Alamat lengkap |
| kota | Text | Kota/kabupaten |
| provinsi | Text | Provinsi |
| kode_pos | Text | Kode pos |
| nama_ortu | Text | Nama orang tua/wali |
| no_telp_ortu | Text | No. telepon |
| email_ortu | Text | Email |
| asal_sekolah | Text | Sekolah asal |
| jurusan_dipilih | Text | Jurusan yang dipilih |
| tanggal_daftar | Date | Tanggal pendaftaran |
| status | Text | pending/accepted/rejected |
| keterangan | Text | Keterangan tambahan |

## 🔐 API Endpoints

| Action | Method | Parameter | Deskripsi |
|--------|--------|-----------|-----------|
| getStudents | GET | action=getStudents | Ambil semua siswa |
| getStudent | GET | action=getStudent, id | Ambil siswa by ID |
| createStudent | POST | action=createStudent, +data | Buat pendaftaran baru |
| updateStudent | POST | action=updateStudent, +data | Update data siswa |
| deleteStudent | POST | action=deleteStudent, id | Hapus siswa |
| getStats | GET | action=getStats | Ambil statistik |

## 🛠️ Development

```bash
# Development mode
cd frontend
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📝 License

MIT License - feel free to use this project for your needs.

## 👨‍💻 Support

Untuk pertanyaan atau issue, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan React, Tailwind CSS, dan Google Apps Script**
