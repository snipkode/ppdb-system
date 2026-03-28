import { FiLoader } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Modern Google Login Button - Compact Design
 */
const GoogleLoginButton = ({ onLoginSuccess }) => {
  const { signInWithGoogle, loading } = useAuth();

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result.success && onLoginSuccess) {
      onLoginSuccess(result.user);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      {loading ? (
        <>
          <FiLoader className="w-5 h-5 animate-spin" />
          <span>Memuat...</span>
        </>
      ) : (
        <>
          {/* Google Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Masuk dengan Google</span>
        </>
      )}
    </button>
  );
};

/**
 * User Profile Component (shows when logged in)
 */
const UserProfile = ({ onLogout }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success && onLogout) {
      onLogout();
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-md border border-slate-200">
      <img
        src={user.photoURL}
        alt={user.displayName}
        className="w-10 h-10 rounded-xl border-2 border-blue-500 shadow-sm"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{user.displayName}</p>
        <p className="text-xs text-slate-500 truncate">{user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Logout"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  );
};

export { GoogleLoginButton, UserProfile };
export default GoogleLoginButton;
