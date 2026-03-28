import { FiArrowRight, FiCheckCircle, FiUsers, FiAward, FiMapPin, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Hero Section - Modern Design */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 animate-fade-in">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-sm font-semibold text-slate-700">PPDB 2024/2025 Telah Dibuka</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
                SMK
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nusantara
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Mewujudkan generasi unggul, berkarakter, dan siap bersaing di era digital dengan pendidikan berkualitas standar industri
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Daftar Sekarang</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/ppdb"
                  className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200 hover:border-blue-400 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Info Lengkap</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-slate-600">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Terakreditasi A</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Standar Industri</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">95% Terserap Kerja</span>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <HeroFeatureCard
                icon={<FiAward className="w-8 h-8" />}
                title="Prestasi"
                value="50+"
                desc="Penghargaan Nasional"
                gradient="from-yellow-400 to-orange-500"
                delay="0"
              />
              <HeroFeatureCard
                icon={<FiUsers className="w-8 h-8" />}
                title="Siswa"
                value="1.2K"
                desc="Siswa Aktif"
                gradient="from-blue-400 to-cyan-500"
                delay="100"
              />
              <HeroFeatureCard
                icon={<FiMapPin className="w-8 h-8" />}
                title="Lokasi"
                value="Strategis"
                desc="Pusat Kota"
                gradient="from-green-400 to-emerald-500"
                delay="200"
              />
              <HeroFeatureCard
                icon={<FiCalendar className="w-8 h-8" />}
                title="Pengalaman"
                value="15+"
                desc="Tahun Eksistensi"
                gradient="from-purple-400 to-pink-500"
                delay="300"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-slate-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full mb-4 shadow-lg">
              KEUNGGULAN KAMI
            </span>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Kenapa Memilih SMK Nusantara?
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Kami berkomitmen memberikan pendidikan terbaik untuk masa depan gemilang
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              }
              title="Fasilitas Modern"
              description="Laboratorium komputer, multimedia, dan teknik terkini dengan peralatan standar industri"
              gradient="from-cyan-500 via-blue-500 to-purple-500"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m8.66-15.66l-4.24 4.24m-4.24 4.24l-4.24 4.24m15.66-8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" />
                </svg>
              }
              title="Kurikulum Industri 4.0"
              description="Materi pembelajaran sesuai kebutuhan dunia kerja dengan teknologi terbaru"
              gradient="from-purple-500 via-pink-500 to-rose-500"
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Karier Terjamin"
              description="95% lulusan terserap di dunia kerja atau melanjutkan ke perguruan tinggi"
              gradient="from-green-500 via-emerald-500 to-teal-500"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem number="1,200+" label="Siswa Aktif" />
            <StatItem number="85+" label="Guru & Staff" />
            <StatItem number="8" label="Program Keahlian" />
            <StatItem number="95%" label="Tingkat Kelulusan" />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full mb-4 shadow-lg">
              PROGRAM KEAHLIAN
            </span>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
              Pilihan Jurusan Terbaik
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Pilih jurusan yang sesuai dengan minat dan bakatmu
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {programs.map((prog, idx) => (
              <ProgramCard key={idx} {...prog} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Siap Menjadi Bagian Dari Kami?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Bergabunglah bersama SMK Nusantara dan raih masa depan gemilang bersama kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-50 font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95"
            >
              <span>Daftar Sekarang</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ppdb"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 font-semibold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Pelajari Lebih Lanjut</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const HeroFeatureCard = ({ icon, title, value, desc, gradient, delay }) => (
  <div
    className="group relative p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
    <div className="text-sm font-semibold text-slate-600 mb-1">{title}</div>
    <div className="text-xs text-gray-500">{desc}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-blue-600 transition-all duration-300">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
    <div className="mt-4 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-sm font-semibold">Pelajari lebih lanjut</span>
      <FiArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
    </div>
  </div>
);

const StatItem = ({ number, label }) => (
  <div className="text-center group">
    <div className="text-4xl md:text-6xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <p className="text-white/80 text-sm md:text-base mt-2 font-medium">{label}</p>
  </div>
);

const programs = [
  { name: 'RPL', full: 'Rekayasa Perangkat Lunak', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'TKJ', full: 'Teknik Komputer Jaringan', icon: '🖥️', color: 'from-purple-500 to-pink-500' },
  { name: 'AKL', full: 'Akuntansi Keuangan', icon: '📊', color: 'from-green-500 to-emerald-500' },
  { name: 'OTKP', full: 'Otomatisasi Tata Kelola', icon: '📋', color: 'from-orange-500 to-red-500' },
  { name: 'DKV', full: 'Desain Komunikasi Visual', icon: '🎨', color: 'from-pink-500 to-rose-500' },
  { name: 'TBSM', full: 'Teknik Bisnis Sepeda Motor', icon: '🏍️', color: 'from-red-500 to-orange-500' },
  { name: 'TAV', full: 'Teknik Audio Video', icon: '📺', color: 'from-indigo-500 to-purple-500' },
  { name: 'TP', full: 'Tata Busana', icon: '👗', color: 'from-fuchsia-500 to-pink-500' },
];

const ProgramCard = ({ name, full, icon, color }) => (
  <div className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
      {name}
    </div>
    <div className="text-xs text-gray-600">{full}</div>
  </div>
);

export default Home;
