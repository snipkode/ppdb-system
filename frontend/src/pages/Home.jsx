import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiBook, FiUserPlus, FiAward } from 'react-icons/fi';
import Dashboard from '@/components/Dashboard';

const Home = () => {
  const features = [
    {
      icon: FiBook,
      title: 'Pendaftaran Mudah',
      description: 'Proses pendaftaran online yang cepat dan mudah diakses kapan saja.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiUserPlus,
      title: 'Verifikasi Cepat',
      description: 'Sistem verifikasi yang efisien untuk mempercepat proses seleksi.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiAward,
      title: 'Transparan',
      description: 'Pantau status pendaftaran Anda secara real-time.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Hero Section - Compact */}
      <div className="card bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden relative shadow-2xl">
        {/* Animated Background SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3">
                <animate attributeName="stopOpacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx="10%" cy="20%" r="60" fill="url(#heroGradient)">
            <animate attributeName="cy" values="20%;25%;20%" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="90%" cy="80%" r="80" fill="url(#heroGradient)">
            <animate attributeName="cy" values="80%;75%;80%" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="70%" cy="30%" r="40" fill="url(#heroGradient)">
            <animate attributeName="cx" values="70%;65%;70%" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 py-4 md:py-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FiBook className="text-xl" />
            </div>
            <span className="text-xs md:text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              PPDB Online 2026
            </span>
          </div>
          
          <h1 className="text-xl md:text-3xl font-bold mb-2 leading-tight">
            Selamat Datang di<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
              PPDB Online
            </span>
          </h1>
          
          <p className="text-sm md:text-base opacity-90 mb-4 max-w-lg">
            Sistem Penerimaan Peserta Didik Baru - Mudah, Cepat, dan Transparan
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Link 
              to="/register" 
              className="group relative inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-gray-50 font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FiUserPlus className="relative z-10" />
              <span className="relative z-10">Daftar Sekarang</span>
            </Link>
            
            <Link 
              to="/status" 
              className="group relative inline-flex items-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              <FiCheck className="relative z-10" />
              <span className="relative z-10">Cek Status</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features - Compact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="card text-center hover:scale-105 transition-all duration-300 hover:shadow-xl group cursor-pointer border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
              <feature.icon className="text-xl text-white" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">{feature.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Dashboard */}
      <Dashboard />

      {/* CTA Section - Compact */}
      <div className="card bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white text-center relative overflow-hidden shadow-2xl">
        {/* Animated SVG Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white">
                <animate attributeName="stopOpacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="url(#ctaGradient)" strokeWidth="2" fill="none">
            <animate attributeName="d" values="M0,50 Q25,30 50,50 T100,50; M0,50 Q25,70 50,50 T100,50; M0,50 Q25,30 50,50 T100,50" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M0,70 Q25,50 50,70 T100,70" stroke="url(#ctaGradient)" strokeWidth="2" fill="none" opacity="0.5">
            <animate attributeName="d" values="M0,70 Q25,50 50,70 T100,70; M0,70 Q25,90 50,70 T100,70; M0,70 Q25,50 50,70 T100,70" dur="4s" repeatCount="indefinite" />
          </path>
        </svg>

        <div className="relative z-10 py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm animate-bounce">
              <FiAward className="text-lg" />
            </div>
          </div>
          <h2 className="text-lg md:text-xl font-bold mb-2">Siap untuk Mendaftar?</h2>
          <p className="opacity-90 mb-4 max-w-md mx-auto text-sm md:text-base">
            Bergabunglah dengan ribuan siswa lainnya dan mulai masa depan Anda.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-gray-50 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <span>Mulai Pendaftaran</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
