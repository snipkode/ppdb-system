import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiCheckCircle, FiArrowLeft, FiLock, FiUserCheck, FiZap } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import GoogleLoginButton from '@/components/auth/GoogleLogin';
import SEO from '@/components/SEO';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { user, error, isAdmin } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSuccess = (loggedInUser) => {
    if (!loggedInUser.isAdmin) {
      alert('⛔ Akses ditolak!\n\nGunakan akun admin @smk.sch.id');
      return;
    }
    setLoginSuccess(true);
    setTimeout(() => navigate('/admin/payments'), 1500);
  };

  // Success State
  if (user && loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-xs w-full relative z-10">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 text-center border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
            
            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/40">
                <FiShield className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-xl font-bold text-slate-800 mb-1">Admin Login Berhasil!</h2>
              <p className="text-sm text-slate-600 mb-4">Selamat datang, <span className="font-semibold">{user.displayName?.split(' ')[0]}</span>!</p>
              
              <div className="mb-4 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white inline-flex items-center gap-2 text-sm font-semibold shadow-lg shadow-purple-500/30">
                <FiShield className="w-4 h-4" /> Admin Access Granted
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-slate-500 mt-2">Mengalihkan ke dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="adminGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adminGrid)" />
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
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-5 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
            </div>

            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <FiShield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
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
              <h2 className="text-base font-bold text-slate-800">Admin Login</h2>
              <p className="text-xs text-slate-500">Gunakan email @smk.sch.id</p>
            </div>

            {/* Admin Badge - Compact */}
            <div className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <FiShield className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-purple-900 truncate">Admin Access Only</p>
                  <p className="text-xs text-purple-700 truncate">Email institusi required</p>
                </div>
              </div>
            </div>

            {/* Google Login Button */}
            <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />

            {/* Features - Ultra Compact */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <FeatureItem icon={<FiLock />} text="Aman" color="purple" />
              <FeatureItem icon={<FiUserCheck />} text="Admin" color="pink" />
              <FeatureItem icon={<FiZap />} text="Cepat" color="purple" />
            </div>

            {/* Test Email - Compact */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-800 font-semibold mb-1.5">📧 Test Admin:</p>
              <code className="text-xs bg-white px-2 py-1 rounded block text-center font-mono text-blue-600 border border-blue-100">
                admin@smk.sch.id
              </code>
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-slate-400 mt-4">
              Panel admin untuk mengelola PPDB
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-4">
          Akses terbatas untuk staf SMK Nusantara
        </p>
      </div>
    </div>
  );
};

// Ultra Compact Feature Item
const FeatureItem = ({ icon, text, color }) => {
  const gradients = {
    purple: 'from-purple-100 to-purple-200 text-purple-600',
    pink: 'from-pink-100 to-pink-200 text-pink-600'
  };

  return (
    <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all">
      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gradients[color]} flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-slate-600">{text}</span>
    </div>
  );
};

export default AdminLoginPage;
