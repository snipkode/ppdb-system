# 🚀 Deploy PPDB System ke Google Apps Script

## Prerequisites
- Google Account
- CLASP sudah terinstall dan login

## Langkah Deploy

### 1. Enable Apps Script API

Kunjungi: https://script.google.com/home/usersettings

Klik **Enable Apps Script API**

### 2. Create Project

```bash
cd /data/data/com.termux/files/home/ppdb-system

# Create new project
clasp create --title "PPDB API" --type sheets
```

### 3. Push Code

```bash
clasp push
```

### 4. Setup Script Properties

Setelah project dibuat, CLASP akan menampilkan Script ID.

1. Buka https://script.google.com/
2. Pilih project "PPDB API"
3. Klik ⚙️ **Project Settings**
4. Scroll ke **Script Properties**
5. Klik **Add a script property**
6. Key: `SHEET_ID` | Value: (kosongkan, akan auto-create)

### 5. Deploy Web App

```bash
# Deploy pertama kali
clasp deploy --title "PPDB API v1" --description "Production deployment"

# Lihat deployments
clasp deployments

# Update deployment (setelah ada perubahan)
clasp deploy --title "PPDB API v2"
```

### 6. Get Web App URL

```bash
clasp deployments
```

Copy URL yang muncul, format: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`

### 7. Update Frontend API URL

Edit `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

### 8. Test API

```bash
# Test getStats endpoint
curl "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=getStats"
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `clasp login` | Login ke Google |
| `clasp logout` | Logout |
| `clasp create` | Buat project baru |
| `clasp push` | Upload code ke GAS |
| `clasp pull` | Download code dari GAS |
| `clasp deploy` | Deploy web app |
| `clasp deployments` | List deployments |
| `clasp logs` | View logs |
| `clasp open` | Buka project di browser |

## Troubleshooting

**Error: Apps Script API not enabled**
- Visit https://script.google.com/home/usersettings
- Enable the API
- Wait a few minutes, then retry

**Error: 401 Unauthorized**
- Run `clasp login` again
- Make sure you're using the correct Google account

**Error: 403 Forbidden**
- Check that the Web App has correct access settings
- Deploy as "Anyone with the link"
