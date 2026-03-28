# 👤 Profile Page Documentation

## Overview
Comprehensive profile management page for PPDB Online system with modern UI/UX design.

## 📍 Location
- **Route:** `/profile`
- **File:** `frontend/src/pages/Profile.jsx`
- **Access:** Authenticated users only (via Header link)

## ✨ Features

### 1. Profile Tab (Default)
**Informasi Pribadi**
- ✏️ Edit mode toggle
- 📷 Profile photo upload with preview
- 👤 Personal information fields:
  - Nama Lengkap (Required)
  - Email (Required)
  - Nomor Telepon
  - Tempat Lahir
  - Tanggal Lahir
  - Jenis Kelamin (Laki-laki/Perempuan)
  - Alamat Lengkap

**Features:**
- Real-time form validation
- Disabled state when not editing
- Gradient buttons with hover effects
- Icon-based input fields
- Responsive grid layout

### 2. Security Tab
**Keamanan Akun**
- 🔒 Password change functionality
- 💡 Password strength tips
- 👁️ Password visibility toggle
- 🔐 Two-factor authentication (Coming Soon)

**Validation:**
- Minimum 8 characters
- Password confirmation matching
- Current password required

### 3. Notifications Tab
**Pengaturan Notifikasi**
- 📧 Email Notifications
- 🔔 Payment Updates
- 📅 Exam Reminders
- 📢 Announcement Alerts
- 📊 Weekly Digest

**Features:**
- Toggle switches for each notification type
- Color-coded icon badges
- Gradient backgrounds
- Save settings button

## 🎨 Design Elements

### Color Scheme
- **Primary Gradient:** Blue-600 → Purple-600
- **Section Gradients:**
  - Profile: Blue → Cyan
  - Security: Green → Emerald
  - Notifications: Purple → Pink
  - Alerts: Orange → Red
  - Digest: Indigo → Blue

### Components
- **Sidebar Navigation:** Tab-based with active state
- **Cards:** Modern glassmorphism (`card-modern` class)
- **Buttons:** Gradient with hover scale effect
- **Inputs:** Rounded-xl with icon prefixes
- **Toggles:** Custom checkbox styling

### Animations
- Hover scale on buttons
- Smooth transitions (duration-300)
- Tab switching
- Image preview on upload

## 📱 Responsive Design

### Desktop (lg+)
- 4-column grid layout
- Sidebar: 1 column
- Main content: 3 columns
- Full navigation visible

### Tablet (md-lg)
- 2-column forms
- Compact sidebar
- Reduced padding

### Mobile (< md)
- Single column layout
- Stacked form fields
- Mobile-optimized toggles
- Full-width buttons

## 🔗 Integration

### Header Integration
The profile link appears in the header when user is logged in:
```jsx
{user && (
  <Link to="/profile">
    <FiUser /> Profile
  </Link>
)}
```

### Auth Store
Uses `useAuthStore` for:
- User data retrieval
- Profile updates
- Authentication state

```javascript
const { user, updateProfile } = useAuthStore();
```

## 🛠️ Usage

### Access Profile Page
1. Login to the system
2. Click "Profile" link in header
3. Or navigate to `/profile`

### Edit Profile
1. Click "Edit" button
2. Modify fields
3. Upload new photo (optional)
4. Click "Simpan Perubahan"

### Change Password
1. Navigate to "Keamanan" tab
2. Enter current password
3. Enter new password (min 8 chars)
4. Confirm new password
5. Click "Ubah Password"

### Manage Notifications
1. Navigate to "Notifikasi" tab
2. Toggle desired notifications
3. Click "Simpan Pengaturan"

## 📊 State Management

### Form Data Structure
```javascript
{
  nama_lengkap: string,
  email: string,
  telepon: string,
  alamat: string,
  tanggal_lahir: string,
  tempat_lahir: string,
  jenis_kelamin: 'L' | 'P',
  foto_profile: string (URL)
}
```

### Notification Settings
```javascript
{
  email_notifications: boolean,
  payment_updates: boolean,
  exam_reminders: boolean,
  announcement_alerts: boolean,
  weekly_digest: boolean
}
```

## 🎯 Future Enhancements

### Planned Features
1. **Email Verification** - Verify email changes
2. **2FA Setup** - Google Authenticator integration
3. **Activity Log** - View account activity history
4. **Delete Account** - Account deletion option
5. **Dark Mode** - Theme toggle
6. **Language Settings** - Multi-language support

### UI Improvements
- Profile photo crop tool
- Password strength meter
- Last login information
- Device management
- Session management

## 🔐 Security Considerations

1. **Authentication Required** - Only logged-in users can access
2. **Password Validation** - Minimum length and confirmation
3. **Email Verification** - (Planned) Re-verify on email change
4. **Session Management** - (Planned) Active sessions view
5. **CSRF Protection** - Form submissions protected
6. **Input Sanitization** - All inputs validated

## 📝 Related Files

- `src/pages/Profile.jsx` - Main profile page
- `src/components/layout/Header.jsx` - Header with profile link
- `src/stores/useAuthStore.js` - Authentication store
- `src/App.jsx` - Route configuration
- `src/index.css` - Global styles (card-modern class)

## 🎨 Component Structure

```
Profile
├── Sidebar
│   ├── Tab Navigation
│   ├── User Info Card
│   └── Logout Button
└── Main Content
    ├── Profile Tab
    │   ├── Form Fields
    │   └── Action Buttons
    ├── Security Tab
    │   ├── Password Form
    │   └── 2FA Section
    └── Notifications Tab
        ├── Toggle List
        └── Save Button
```

## 💡 Tips

1. **Profile Photo:** Use square images for best results
2. **Password:** Use combination of letters, numbers, and symbols
3. **Notifications:** Enable payment updates for important alerts
4. **Mobile:** Use landscape mode for better editing experience

## 🐛 Known Issues

None at this time. Report any issues to the development team.

---

**Created:** March 28, 2024  
**Version:** 1.0  
**Status:** ✅ Production Ready
