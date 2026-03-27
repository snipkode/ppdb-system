# CLASP Example - PPDB API

Contoh lengkap deploy Google Apps Script menggunakan CLASP CLI.

## 📁 Struktur File

```
examples/
├── Code.gs           # Main Apps Script code
├── appsscript.json   # CLASP configuration
├── .claspignore      # Files to ignore
└── README.md         # This file
```

## 🚀 Quick Start

### 1. Login ke Google

```bash
cd examples
clasp login
```

### 2. Create Project

```bash
# Buat project baru tipe Google Sheets
clasp create --title "PPDB API Example" --type sheets
```

Output akan menampilkan Script ID, contoh:
```
Created new script: https://script.google.com/d/1abc123xyz...
```

### 3. Push Code

```bash
clasp push
```

### 4. Setup Script Properties

Buka Google Apps Script Editor:
```bash
clasp open
```

Kemudian:
1. Klik ⚙️ **Project Settings**
2. Scroll ke **Script Properties**
3. Klik **Add a script property**
4. Key: `SHEET_ID` | Value: (kosongkan, akan auto-create)

### 5. Deploy Web App

```bash
clasp deploy --title "v1" --description "First deployment"
```

Catat Deployment ID yang muncul.

### 6. Test API

```bash
# Ganti DEPLOYMENT_ID dengan ID dari langkah 5

# Test ping endpoint
curl "https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=ping"

# Get all students (empty initially)
curl "https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=getStudents"

# Get statistics
curl "https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=getStats"

# Create new student
curl -X POST "https://script.google.com/macros/s/DEPLOYMENT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "createStudent",
    "nama_lengkap": "John Doe",
    "nisn": "1234567890",
    "tanggal_lahir": "2005-01-01",
    "jenis_kelamin": "L",
    "agama": "Islam",
    "alamat": "Jl. Contoh No. 123",
    "kota": "Jakarta",
    "provinsi": "DKI Jakarta",
    "kode_pos": "12345",
    "nama_ortu": "Jane Doe",
    "no_telp_ortu": "08123456789",
    "email_ortu": "jane@example.com",
    "asal_sekolah": "SMP Negeri 1",
    "jurusan_dipilih": "IPA"
  }'
```

## 📖 API Endpoints

### GET Endpoints

| Endpoint | Description |
|----------|-------------|
| `?action=ping` | Health check |
| `?action=getStudents` | Get all students |
| `?action=getStudent&id=STD-xxx` | Get student by ID |
| `?action=getStats` | Get statistics |

### POST Endpoints

| Endpoint | Body | Description |
|----------|------|-------------|
| `createStudent` | Student object | Create new student |
| `updateStudent` | Student object with id | Update student data |
| `deleteStudent` | `{ id: "STD-xxx" }` | Delete student |

## 🔧 CLASP Commands

```bash
# Authentication
clasp login
clasp logout

# Project management
clasp create --title "Name" --type sheets
clasp clone <SCRIPT_ID>

# Sync
clasp push        # Upload to GAS
clasp pull        # Download from GAS
clasp status      # Check file status

# Deploy
clasp deploy --title "v1"
clasp deployments # List all deployments
clasp undeploy <DEPLOYMENT_ID>

# Debug
clasp logs        # View execution logs
clasp open        # Open in browser

# Run functions
clasp run --function functionName
```

## 📝 Code Structure

### Main Functions

- `doGet(e)` - Handle GET requests
- `doPost(e)` - Handle POST requests
- `handleRequest(e)` - Route requests to handlers

### Data Functions

- `getStudents()` - Get all students
- `getStudent(id)` - Get by ID
- `createStudent(data)` - Create new
- `updateStudent(data)` - Update
- `deleteStudent(data)` - Delete
- `getStats()` - Statistics

### Helper Functions

- `getSheet()` - Get/create spreadsheet
- `jsonResponse(data)` - Format JSON response
- `getAction(e)` - Extract action from request
- `parsePostData(e)` - Parse POST body

## 🐛 Troubleshooting

### Error: Apps Script API not enabled

```
Visit: https://script.google.com/home/usersettings
Click: Enable Apps Script API
Wait: ~5 minutes
```

### Error: 401 Unauthorized

```bash
clasp logout
clasp login
```

### Error: 403 Forbidden

Check deployment access settings:
1. Open Apps Script Editor
2. Deploy → Manage Deployments
3. Edit → Who has access: **Anyone**

### Changes not appearing

```bash
clasp pull          # Get latest from GAS
# Make changes
clasp push          # Push changes
clasp deploy        # Create new version
```

## 🔐 Security Notes

- Web App is public (ANYONE_ANONYMOUS)
- Add authentication for production
- Validate all inputs
- Use PropertiesService for secrets
- Enable Stackdriver logging

## 📚 Resources

- [CLASP Documentation](https://github.com/google/clasp)
- [Apps Script Documentation](https://developers.google.com/apps-script)
- [ContentService](https://developers.google.com/apps-script/reference/content/content-service)
- [SpreadsheetApp](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)
