# Mobile Keyboard Close Bug Fix

## Problem
Pada form registrasi di mobile, keyboard tertutup otomatis saat user mengetik di input field. Ini terjadi karena komponen form kehilangan focus setiap kali ada perubahan state.

## Root Cause
Komponen helper `InputField`, `SelectField`, dan `SectionHeader` didefinisikan **di dalam** komponen parent (`StudentForm`, `ParentForm`, `SchoolForm`). Setiap kali parent component re-render (saat user mengetik dan state berubah), komponen helper ini di-recreate dari awal, menyebabkan:

1. React menganggap ini sebagai komponen baru
2. DOM element lama di-unmount dan element baru di-mount
3. Input field kehilangan focus
4. Keyboard mobile tertutup otomatis

## Solution
Memindahkan definisi komponen helper ke **luar** komponen parent agar tidak di-recreate setiap render.

### Files Changed

#### 1. `frontend/src/components/ppdb/StudentForm.jsx`
- ✅ Moved `InputField` outside `StudentForm`
- ✅ Added `formData`, `handleChange`, `errors` as props
- ✅ Moved `SelectField` outside `StudentForm`

#### 2. `frontend/src/components/ppdb/ParentForm.jsx`
- ✅ Moved `InputField` outside `ParentForm`
- ✅ Moved `SelectField` outside `ParentForm`
- ✅ Moved `SectionHeader` outside `ParentForm`
- ✅ Updated all component usages to pass required props

#### 3. `frontend/src/components/ppdb/SchoolForm.jsx`
- ✅ Moved `InputField` outside `SchoolForm`
- ✅ Moved `SelectField` outside `SchoolForm`
- ✅ Moved `SectionHeader` outside `SchoolForm`
- ✅ Updated all component usages to pass required props

## Testing
Build berhasil tanpa error:
```bash
cd frontend
npm run build
# ✓ Build completed successfully
```

## Best Practice
**Jangan pernah define komponen di dalam komponen lain.** Selalu definisikan komponen di module level agar:
- Tidak di-recreate setiap render
- Maintain identity dan state dengan benar
- Performance lebih baik
- Focus tidak hilang

❌ **Wrong:**
```jsx
const Parent = () => {
  const Child = () => <div>Child</div>; // Bad!
  return <Child />;
};
```

✅ **Correct:**
```jsx
const Child = () => <div>Child</div>; // Good!

const Parent = () => {
  return <Child />;
};
```

## Date Fixed
March 28, 2026
