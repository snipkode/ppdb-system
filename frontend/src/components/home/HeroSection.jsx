import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiAward, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

const HeroSection = () => {
  const stats = [
    { label: 'Siswa Aktif', value: '1,200+', icon: FiUsers },
    { label: 'Guru & Staff', value: '85+', icon: FiUsers },
    { label: 'Program Keahlian', value: '8', icon: FiBookOpen },
    { label: 'Akreditasi', value: 'A', icon: FiAward },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">PPDB Tahun Ajaran 2024/2025 Dibuka!</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Selamat Datang di<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                SMK Nusantara
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-xl">
              Mencetak generasi unggul, kompeten, dan berkarakter untuk menghadapi tantangan global di era digital.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <span>Daftar PPDB Online</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span>Explore School</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="flex items-center md:justify-start justify-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-yellow-300" />
                    <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Illustration/Image */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-yellow-400/20 to-primary-400/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl">🏫</div>
                  <div className="text-white text-xl font-semibold">
                    SMK Nusantara
                  </div>
                  <div className="text-gray-300 text-sm">
                    Unggul • Kompeten • Berkarakter
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Akreditasi A</div>
                    <div className="text-xs text-gray-500">Terakreditasi</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">95%</div>
                    <div className="text-xs text-gray-500">Lulusan Bekerja</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
