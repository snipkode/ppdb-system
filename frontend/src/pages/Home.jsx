import { FiArrowRight, FiCheckCircle, FiUsers, FiAward, FiMapPin, FiCalendar, FiTrendingUp, FiGlobe, FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section - Ultra Compact & Modern with Parallax Building */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        {/* Parallax Building Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: 'scale(1.1)',
          }}
        >
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/60"></div>
        </div>

        {/* Animated Accent Lights */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-5 left-5 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-5 right-5 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md mb-3 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                <span className="text-xs font-semibold text-white">PPDB 2024/2025 Dibuka</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 drop-shadow-lg">
                SMK <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Nusantara</span>
              </h1>

              <p className="text-sm md:text-base text-white/90 mb-5 max-w-lg mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
                Mewujudkan generasi unggul, berkarakter, dan siap bersaing di era digital
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start">
                <Link to="/register" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
                  <span>Daftar Sekarang</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/ppdb" className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
                  <span>Info Lengkap</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
                <TrustBadge icon={<FiCheckCircle className="w-3.5 h-3.5" />} text="Terakreditasi A" />
                <TrustBadge icon={<FiCheckCircle className="w-3.5 h-3.5" />} text="Standar Industri" />
                <TrustBadge icon={<FiCheckCircle className="w-3.5 h-3.5" />} text="95% Terserap Kerja" />
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <StatCard icon={<FiAward className="w-5 h-5" />} value="50+" label="Prestasi" sub="Nasional" color="from-yellow-400 to-orange-500" />
              <StatCard icon={<FiUsers className="w-5 h-5" />} value="1.2K" label="Siswa" sub="Aktif" color="from-blue-400 to-cyan-500" />
              <StatCard icon={<FiMapPin className="w-5 h-5" />} value="Strategis" label="Lokasi" sub="Pusat Kota" color="from-green-400 to-emerald-500" />
              <StatCard icon={<FiCalendar className="w-5 h-5" />} value="15+" label="Pengalaman" sub="Tahun" color="from-purple-400 to-pink-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features - Compact Grid */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full mb-2 shadow-md">
              KEUNGGULAN KAMI
            </span>
            <h2 className="text-xl md:text-3xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Kenapa Memilih Kami?
            </h2>
            <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto">Pendidikan terbaik untuk masa depan gemilang</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FeatureCard
              icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>}
              title="Fasilitas Modern"
              desc="Laboratorium dengan peralatan standar industri"
              color="from-cyan-500 via-blue-500 to-purple-500"
            />
            <FeatureCard
              icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6m8.66-15.66l-4.24 4.24m-4.24 4.24l-4.24 4.24m15.66-8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" /></svg>}
              title="Kurikulum Industri 4.0"
              desc="Materi sesuai kebutuhan dunia kerja"
              color="from-purple-500 via-pink-500 to-rose-500"
            />
            <FeatureCard
              icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
              title="Karier Terjamin"
              desc="95% lulusan bekerja atau kuliah"
              color="from-green-500 via-emerald-500 to-teal-500"
            />
          </div>
        </div>
      </section>

      {/* Stats Banner - Slim */}
      <section className="py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-5 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-5 right-5 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <BannerStat number="1,200+" label="Siswa Aktif" />
            <BannerStat number="85+" label="Guru & Staff" />
            <BannerStat number="8" label="Program Keahlian" />
            <BannerStat number="95%" label="Kelulusan" />
          </div>
        </div>
      </section>

      {/* Programs - Compact */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full mb-2 shadow-md">
              PROGRAM KEAHLIAN
            </span>
            <h2 className="text-xl md:text-3xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-2">
              Pilihan Jurusan
            </h2>
            <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto">Sesuaikan dengan minat dan bakatmu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {programs.map((prog, idx) => (
              <ProgramCard key={idx} {...prog} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Compact */}
      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-5 left-5 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-5 right-5 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3">Siap Bergabung Dengan Kami?</h2>
          <p className="text-white/90 text-sm mb-5 max-w-lg mx-auto">Raih masa depan gemilang bersama SMK Nusantara</p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <Link to="/register" className="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-50 font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95 text-sm">
              <span>Daftar Sekarang</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/ppdb" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
              <span>Pelajari Lebih Lanjut</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const TrustBadge = ({ icon, text }) => (
  <div className="flex items-center gap-1.5 text-white/90">
    {icon}
    <span className="text-xs font-medium">{text}</span>
  </div>
);

const StatCard = ({ icon, value, label, sub, color }) => (
  <div className="group relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md`}>
      {icon}
    </div>
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-xs font-semibold text-white/90">{label}</div>
    <div className="text-xs text-white/60">{sub}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="group relative p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/50 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md`}>
      {icon}
    </div>
    <h3 className="text-base font-bold text-slate-800 mb-1.5">{title}</h3>
    <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
  </div>
);

const BannerStat = ({ number, label }) => (
  <div className="text-center group">
    <div className="text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{number}</div>
    <p className="text-white/80 text-xs mt-1 font-medium">{label}</p>
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
  <div className="group relative p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className={`text-lg font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{name}</div>
    <div className="text-xs text-gray-500 truncate">{full}</div>
  </div>
);

export default Home;
