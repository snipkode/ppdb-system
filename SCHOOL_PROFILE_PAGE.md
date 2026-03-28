# 🏫 Halaman Profil Sekolah - Documentation

## Overview
Halaman Profil Sekolah yang lebih **compact** dan **complete** dengan desain modern dan elemen interaktif.

**Route:** `/profile-sekolah`

**File:** `frontend/src/pages/SchoolProfile.jsx`

---

## ✨ Fitur Utama

### 1. **Hero Section - Compact**
- Logo sekolah dengan backdrop blur
- Nama sekolah & tagline
- Badge akreditasi
- Quick contact badges (telepon, email, lokasi)
- Gradient background dengan animasi pulse blobs

### 2. **Stats Grid - 6 Metrics**
- Siswa Aktif (1,200+)
- Guru & Staff (85+)
- Program Keahlian (8)
- Tahun Eksistensi (15+)
- Lulusan Bekerja (95%)
- Prestasi (100+)
- Setiap stat dengan icon dan color gradient unik

### 3. **Tab Navigation**
5 tabs dengan icon:
- **Overview** - Visi, misi, sambutan kepala sekolah, fasilitas preview
- **Sejarah** - Timeline perjalanan sekolah
- **Fasilitas** - Daftar lengkap fasilitas + video profile placeholder
- **Download** - Materi unduhan (prospektus, panduan, dll)
- **FAQ** - Pertanyaan umum dengan accordion

### 4. **Tab: Overview**
#### Vision & Mission Cards
- Vision: Gradient card dengan icon star
- Mission: 4 poin misi dengan emoji icons

#### Principal Message (Sambutan Kepala Sekolah)
- Foto/initial kepala sekolah
- Quote sambutan
- Nama & jabatan

#### Facilities Preview
- 4 fasilitas unggulan dalam grid
- Icon, nama, count, deskripsi

### 5. **Tab: Sejarah (Timeline)**
- 5 milestone penting (2009-2024)
- Vertical timeline dengan gradient line
- Alternating layout (kiri-kanan)
- Icon emoji per event
- Badge tahun dengan gradient

### 6. **Tab: Fasilitas**
- 12 fasilitas dalam grid 4 kolom
- Emoji icons dengan nama & deskripsi
- Hover effect dengan gradient background
- **Video Profile Placeholder** - Embed YouTube/Vimeo

### 7. **Tab: Download**
- 4 item download:
  - Prospektus PPDB 2024 (PDF, 2.5 MB)
  - Panduan Pendaftaran (PDF, 1.2 MB)
  - Profil Sekolah (PDF, 5.8 MB)
  - Video Company Profile (MP4, 45 MB)
- Card dengan icon, judul, type, size
- Hover effect dengan border & download icon

### 8. **Tab: FAQ**
- 5 pertanyaan umum
- Accordion dengan smooth animation
- Icon chevron rotate 180° saat active
- Gradient icon button

### 9. **Social Media & Contact Footer**
- 6 social media buttons (FB, IG, Twitter, YouTube, LinkedIn, TikTok)
- 3 contact info cards (Alamat, Telepon, Email)
- Gradient background dengan backdrop blur

---

## 🎨 Design System

### Color Palette
```javascript
// Primary Gradients
from-blue-600 via-purple-600 to-pink-600  // Main gradient
from-blue-500 to-cyan-500                 // Stats: Siswa
from-purple-500 to-pink-500               // Stats: Guru
from-green-500 to-emerald-500             // Stats: Jurusan
from-orange-500 to-red-500                // Stats: Eksistensi
from-indigo-500 to-blue-500               // Stats: Bekerja
from-yellow-500 to-orange-500             // Stats: Prestasi
```

### Typography
- **Headings:** font-bold (700) - font-black (900)
- **Body:** font-medium (500) - font-semibold (600)
- **Small Text:** text-xs - text-sm

### Components
- **Cards:** rounded-2xl/3xl, shadow-lg/xl
- **Buttons:** rounded-xl/2xl, gradient backgrounds
- **Badges:** rounded-full, pill-shaped
- **Icons:** Emoji + Fi icons combination

### Animations
- **Hover:** 
  - translate-y (-1 to -2)
  - shadow-xl/2xl
  - scale-105/110
- **Pulse:** Background blobs (animate-pulse)
- **Fade In:** animate-fade-in untuk tab content
- **Timeline:** Staggered animation

---

## 📱 Responsive Design

### Desktop (lg+)
- Hero: Logo kiri, teks kanan
- Stats: 6 kolom
- Facilities: 4 kolom
- Timeline: Alternating kiri-kanan
- Downloads: 2 kolom

### Tablet (md)
- Hero: Stacked vertical
- Stats: 3-4 kolom
- Facilities: 3 kolom
- Timeline: Semua di kiri
- Downloads: 2 kolom

### Mobile (< md)
- Hero: Stacked dengan logo di atas
- Stats: 2 kolom
- Facilities: 2 kolom
- Timeline: Semua di kiri
- Downloads: 1 kolom
- Tab labels: Icon only (text hidden)

---

## 🔧 Components Breakdown

### Main Components

#### `SchoolProfile` (Main Container)
- State: `activeAccordion`, `activeTab`
- Data: stats, timeline, downloads, faqs, facilities
- Layout: Hero → Stats → Tabs → Tab Content → Footer

#### `QuickContact`
- Props: `icon`, `label`
- White/20 backdrop blur badge

#### `MissionItem`
- Props: `icon`, `text`
- List item dengan emoji

#### `TabButton`
- Props: `active`, `onClick`, `icon`, `label`
- Gradient saat active

#### `SocialButton`
- Props: `icon`
- White/20 backdrop blur, hover scale

---

## 📊 Content Structure

```
Hero Section (Compact)
├── Logo + School Info
├── Accreditation Badge
├── Quick Contact Badges
│
├── Stats Grid (6 items)
│
├── Tab Navigation (5 tabs)
│
└── Tab Content
    ├── Overview
    │   ├── Vision & Mission Cards
    │   ├── Principal Message
    │   └── Facilities Preview
    │
    ├── History (Timeline)
    │   └── 5 Milestones
    │
    ├── Facilities
    │   ├── 12 Facilities Grid
    │   └── Video Profile Placeholder
    │
    ├── Download
    │   └── 4 Download Items
    │
    └── FAQ
        └── 5 Accordion Items
│
└── Social Media Footer
    ├── Social Buttons (6)
    └── Contact Info Cards (3)
```

---

## 🆚 Comparison: About vs SchoolProfile

| Feature | About (Old) | SchoolProfile (New) |
|---------|-------------|---------------------|
| **Layout** | Long scroll | Compact tabs |
| **Navigation** | None | Tab-based |
| **Principal Message** | ❌ | ✅ |
| **Timeline/History** | ❌ | ✅ |
| **Download Section** | ❌ | ✅ |
| **FAQ** | ❌ | ✅ |
| **Video Profile** | ❌ | ✅ (placeholder) |
| **Stats** | 6 (horizontal) | 6 (grid cards) |
| **Facilities** | 12 (grid) | 12 + preview mode |
| **Social Media** | Basic | Enhanced with TikTok |
| **Hero** | Large | Compact |
| **Interactive** | Low | High (tabs, accordion) |

---

## 🚀 Usage

### Access the Page
```
/profile-sekolah - Profil Sekolah (New, Compact)
/about - About School (Old, Long Form)
```

### Update Content
Edit data arrays di `SchoolProfile.jsx`:
```javascript
const stats = [...]      // Update statistics
const timeline = [...]   // Update milestones
const downloads = [...]  // Update download items
const faqs = [...]       // Update FAQ
const facilities = [...] // Update facilities
```

### Add New Tab
1. Add button di Tab Navigation
2. Add condition di Tab Content
3. Add state `activeTab` handling

---

## 💡 Future Enhancements

### Short Term
- [ ] Real video embed (YouTube/Vimeo)
- [ ] Actual download links
- [ ] Google Maps embed
- [ ] Dynamic data from Firestore

### Medium Term
- [ ] Photo gallery slider
- [ ] Virtual tour 360°
- [ ] Teacher profiles section
- [ ] Student testimonials
- [ ] Annual reports section

### Long Term
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Print-friendly version
- [ ] PDF export
- [ ] Analytics integration

---

## 🎯 Key Improvements

### Before (About.jsx)
- ❌ Very long scroll (2000+ lines)
- ❌ No navigation
- ❌ Limited interaction
- ❌ Static content only
- ❌ No download section
- ❌ No FAQ

### After (SchoolProfile.jsx)
- ✅ Compact with tabs
- ✅ Easy navigation
- ✅ Interactive (tabs, accordion)
- ✅ Rich content (timeline, downloads, FAQ)
- ✅ Modern design
- ✅ Better UX

---

## 📝 Implementation Notes

### Animation Classes
```css
/* Add to global CSS if not exists */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Icon Imports
- `react-icons/fi` - Feather icons
- `react-icons/fa` - Font Awesome (TikTok)

### Responsive Utilities
- `hidden md:block` - Hide on mobile
- `md:grid-cols-2` - 2 cols on tablet+
- `lg:grid-cols-4` - 4 cols on desktop

---

**Created:** March 28, 2024
**Version:** 1.0
**Status:** ✅ Production Ready
**Route:** `/profile-sekolah`
