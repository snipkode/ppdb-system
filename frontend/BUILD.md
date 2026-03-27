# PPDB Online - Production Build

Build output ada di folder `dist/`.

## 📦 Build Info

```
dist/
├── index.html
└── assets/
    ├── css/
    │   └── index-D2Dnk_hL.css         (22.35 kB / 4.55 kB gzipped)
    └── js/
        ├── rolldown-runtime           (0.68 kB)
        ├── pages-forms                (0.84 kB)
        ├── index                      (1.56 kB)
        ├── pages-main                 (2.73 kB)
        ├── vendor                     (3.43 kB)
        ├── components-forms          (11.81 kB)
        ├── components-dashboard      (24.19 kB)
        ├── api-services              (36.90 kB) ← API calls
        ├── components-ui             (43.91 kB)
        └── vendor-react              (177.86 kB)
```

**Total Size:** ~304 KB (83 KB gzipped)

## 🚀 Deploy Frontend

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm i -D gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Manual Upload

Upload isi folder `dist/` ke hosting Anda.

## ⚙️ Build Configuration

Build menggunakan:
- **Vite** dengan Rolldown
- **Code splitting** otomatis
- **Tree shaking** untuk optimasi size
- **Terser** minification
- **Gzip compression** ready

## 📊 Chunk Breakdown

| Chunk | Size | Gzipped | Purpose |
|-------|------|---------|---------|
| vendor-react | 177 KB | 56 KB | React, ReactDOM |
| components-ui | 44 KB | 16 KB | Header, Notification |
| api-services | 37 KB | 14 KB | Axios, API calls |
| components-dashboard | 24 KB | 7 KB | Dashboard component |
| components-forms | 12 KB | 3 KB | Forms components |
| vendor | 3 KB | 1 KB | Misc vendors |
| pages-main | 3 KB | 1 KB | Home page |
| pages-forms | 0.8 KB | 0.3 KB | Register, Status |
| index | 1.5 KB | 0.8 KB | App entry |
| runtime | 0.7 KB | 0.4 KB | Rolldown runtime |

## 🔄 Rebuild

```bash
cd frontend
npm run build
```

## 🧪 Preview Build

```bash
cd frontend
npm run preview
```

## 📝 Environment Variables

Jika perlu ganti API URL untuk environment berbeda:

```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'production_url';
```

Create `.env`:
```
VITE_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```
