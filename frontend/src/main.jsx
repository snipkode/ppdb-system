import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import ToastProvider from '@/contexts/ToastContext.jsx'
import AuthProvider from '@/contexts/AuthContext.jsx'
import { setupFirebaseEmulators } from '@/services/firebaseDebug'

// Setup Firebase Emulators (development only)
setupFirebaseEmulators()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </AuthProvider>,
)
