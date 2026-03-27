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

### 1. Setup Google Apps Script Backend

1. Buka [Google Apps Script](https://script.google.com/)
2. Buat project baru
3. Copy paste kode dari `Code.gs` ke editor
4. Buat Google Sheet baru (atau biarkan sistem membuat otomatis)
5. Simpan Script ID dari Google Sheet yang dibuat
6. Di Apps Script, klik **Project Settings** → **Script Properties**
7. Tambahkan property `SHEET_ID` dengan nilai Script ID dari langkah 5

### 2. Deploy Google Apps Script

1. Klik **Deploy** → **New Deployment**
2. Pilih type **Web App**
3. Configure:
   - Description: `PPDB API v1`
   - Execute as: **Me**
   - Who has access: **Anyone with the link**
4. Klik **Deploy**
5. Salin **Web App URL** yang dihasilkan

### 3. Setup Frontend

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
