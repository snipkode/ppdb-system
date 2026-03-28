import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiArrowLeft, FiShield, FiUser, FiZap, FiLock, FiSmartphone } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import GoogleLoginButton from '@/components/auth/GoogleLogin';
import SEO from '@/components/SEO';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, error, isAdmin } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (loggedInUser) => {
    setLoginSuccess(true);
    setUserRole(loggedInUser.isAdmin ? 'admin' : 'user');
    setTimeout(() => {
      navigate(loggedInUser.isAdmin ? '/admin/payments' : '/register');
    }, 1500);
  };

  // Success State
  if (user && loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-xs w-full relative z-10">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 text-center border border-white/20">
            <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-lg ${
              userRole === 'admin'
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/40'
                : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/40'
            }`}>
              {userRole === 'admin' ? <FiShield className="w-8 h-8 text-white" /> : <FiUser className="w-8 h-8 text-white" />}
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-1">Login Berhasil!</h2>
            <p className="text-sm text-slate-600 mb-4">Selamat datang, <span className="font-semibold">{user.displayName?.split(' ')[0]}</span>!</p>

            <div className={`mb-4 px-4 py-2 rounded-xl inline-flex items-center gap-2 text-sm font-semibold ${
              userRole === 'admin'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
            }`}>
              {userRole === 'admin' ? <><FiShield className="w-4 h-4" />Admin</> : <><FiUser className="w-4 h-4" />Calon Siswa</>}
            </div>

            <div className={`mb-4 px-3 py-2 rounded-xl text-xs font-medium ${
              userRole === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
            }`}>
              {userRole === 'admin' ? '🔐 Mengalihkan ke Dashboard...' : '📝 Mengalihkan ke Pendaftaran...'}
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className={`h-full rounded-full ${
                userRole === 'admin'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500'
              }`} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="loginGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loginGrid)" />
        </svg>
      </div>

      {/* Main Card */}
      <div className="max-w-xs w-full relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute -top-10 left-0 flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-xs group"
        >
          <FiArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>

        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header - Compact */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-5 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            </div>

            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎓</span>
              </div>
              <h1 className="text-lg font-bold text-white">PPDB Online</h1>
              <p className="text-xs text-white/80">SMK Nusantara</p>
            </div>
          </div>

          {/* Content - Compact */}
          <div className="p-5">
            {/* Error Alert */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-xl flex items-center gap-2 text-xs">
                <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Title */}
            <div className="text-center mb-4">
              <h2 className="text-base font-bold text-slate-800">Masuk / Daftar</h2>
              <p className="text-xs text-slate-500">Login otomatis dengan Google</p>
            </div>

            {/* Info Cards - Compact */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2.5 p-2.5 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <FiShield className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-purple-900 truncate">Admin / Guru</p>
                  <p className="text-xs text-purple-700 truncate">Auto redirect Dashboard</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <FiUser className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-blue-900 truncate">Calon Siswa</p>
                  <p className="text-xs text-blue-700 truncate">Auto redirect Pendaftaran</p>
                </div>
              </div>
            </div>

            {/* Google Login Button */}
            <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />

            {/* Features - Ultra Compact */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <FeatureItem icon={<FiZap />} text="Cepat" />
              <FeatureItem icon={<FiLock />} text="Aman" />
              <FeatureItem icon={<FiSmartphone />} text="Mudah" />
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-slate-400 mt-4">
              Dengan login, Anda menyetujui{' '}
              <button className="text-blue-600 hover:underline font-medium">Syarat & Ketentuan</button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-4">
          Sistem auto-detect role pengguna
        </p>
      </div>
    </div>
  );
};

// Ultra Compact Feature Item
const FeatureItem = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all">
    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600">
      {icon}
    </div>
    <span className="text-xs font-medium text-slate-600">{text}</span>
  </div>
);

export default LoginPage;
