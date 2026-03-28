import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import ToastProvider from '@/contexts/ToastContext.jsx'
import AuthProvider from '@/contexts/AuthContext.jsx'
import { setupFirebaseEmulators } from '@/services/firebaseDebug'

// Setup Firebase Emulators (development only)
setupFirebaseEmulators()

// Initialize Eruda (Mobile DevTools)
if (typeof window !== 'undefined' && window.eruda) {
  window.eruda.init({
    defaults: {
      displaySize: 40,
      theme: 'Material'
    }
  })
  console.log('[Eruda] DevTools initialized')
}

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </AuthProvider>,
)
