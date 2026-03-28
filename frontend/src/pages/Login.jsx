import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiCheckCircle, FiMail } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import GoogleLoginButton from '@/components/auth/GoogleLogin';
import SEO from '@/components/SEO';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, error } = useAuth();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSuccess = (loggedInUser) => {
    setLoginSuccess(true);
    // Redirect to register page after 2 seconds
    setTimeout(() => {
      navigate('/register');
    }, 2000);
  };

  // If already logged in and success, show success message
  if (user && loginSuccess) {
    return (
      <>
        <SEO title="Login Berhasil" description="Anda berhasil login" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Login Berhasil!
              </h2>
              <p className="text-gray-600 mb-4">
                Selamat datang, {user.displayName}!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  Anda akan diarahkan ke halaman pendaftaran...
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-green-600 h-1 rounded-full animate-pulse" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Login" description="Login untuk mendaftar PPDB" />
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Selamat Datang
              </h1>
              <p className="text-blue-100">
                Login untuk melanjutkan pendaftaran PPDB
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                  <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Informasi:</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Login diperlukan untuk mendaftar PPDB</li>
                  <li>• Gunakan akun Google yang aktif</li>
                  <li>• Data akan tersimpan otomatis</li>
                  <li>• Anda dapat logout kapan saja</li>
                </ul>
              </div>

              {/* Google Login Button */}
              <GoogleLoginButton onLoginSuccess={handleLoginSuccess} size="lg" />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Dengan login, Anda menyetujui syarat & ketentuan
                  </span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <strong>Isi form lebih cepat</strong> - Data tersimpan otomatis
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <strong>Cek status kapan saja</strong> - Pantau pendaftaran Anda
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    <strong>Notifikasi real-time</strong> - Update langsung ke email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-200 text-sm transition-colors"
            >
              ← Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
