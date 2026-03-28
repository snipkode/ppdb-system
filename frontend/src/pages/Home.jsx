import HeroSection from '@/components/home/HeroSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <HeroSection />

      {/* Features Section - Modern Glassmorphism */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full mb-3">
              KEUNGGULAN KAMI
            </span>
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
              Kenapa Memilih SMK Nusantara?
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Kami berkomitmen memberikan pendidikan terbaik untuk masa depan gemilang
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <FeatureCard
              icon={
                <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              }
              title="Fasilitas Modern"
              description="Laboratorium komputer, multimedia, dan teknik terkini dengan peralatan standar industri"
              gradient="from-cyan-500 via-blue-500 to-purple-500"
              delay="0"
            />
            <FeatureCard
              icon={
                <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m8.66-15.66l-4.24 4.24m-4.24 4.24l-4.24 4.24m15.66-8.66l-4.24-4.24m-4.24-4.24l-4.24-4.24" />
                </svg>
              }
              title="Kurikulum Industri 4.0"
              description="Materi pembelajaran sesuai kebutuhan dunia kerja dengan teknologi terbaru"
              gradient="from-purple-500 via-pink-500 to-rose-500"
              delay="100"
            />
            <FeatureCard
              icon={
                <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Karier Terjamin"
              description="95% lulusan terserap di dunia kerja atau melanjutkan ke perguruan tinggi"
              gradient="from-green-500 via-emerald-500 to-teal-500"
              delay="200"
            />
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Counter */}
      <StatsSection />

      {/* Programs Section - Modern Cards */}
      <ProgramsSection />

      {/* CTA Section - Modern Gradient */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Siap Menjadi Bagian Dari Kami?
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Bergabunglah bersama SMK Nusantara dan raih masa depan gemilang bersama kami
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-gray-50 font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>Daftar Sekarang</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-4-4l4 4-4 4" />
              </svg>
            </a>
            <a
              href="/ppdb"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Pelajari Lebih Lanjut</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, delay }) => (
  <div 
    className="group relative p-6 md:p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Gradient Border Effect */}
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
    
    {/* Icon with Gradient */}
    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    
    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-blue-600 transition-all duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
      {description}
    </p>

    {/* Arrow Indicator */}
    <div className="mt-4 flex items-center gap-2 text-transparent group-hover:text-blue-600 transition-colors duration-300">
      <span className="text-sm font-semibold">Pelajari</span>
      <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14m-4-4l4 4-4 4" />
      </svg>
    </div>
  </div>
);

const StatsSection = () => (
  <section className="py-12 md:py-16 bg-white/50 backdrop-blur-sm border-y border-white/50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <StatItem number="1,200+" label="Siswa Aktif" suffix="" />
        <StatItem number="85+" label="Guru & Staff" suffix="" />
        <StatItem number="8" label="Program Keahlian" suffix="" />
        <StatItem number="95" label="Tingkat Kelulusan" suffix="%" />
      </div>
    </div>
  </section>
);

const StatItem = ({ number, label, suffix }) => (
  <div className="text-center group">
    <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
      {number}{suffix}
    </div>
    <p className="text-gray-600 text-xs md:text-sm mt-1 font-medium">{label}</p>
  </div>
);

const ProgramsSection = () => {
  const programs = [
    { name: 'RPL', full: 'Rekayasa Perangkat Lunak', icon: '💻', color: 'from-blue-500 to-cyan-500' },
    { name: 'TKJ', full: 'Teknik Komputer Jaringan', icon: '🖥️', color: 'from-purple-500 to-pink-500' },
    { name: 'AKL', full: 'Akuntansi Keuangan', icon: '📊', color: 'from-green-500 to-emerald-500' },
    { name: 'OTKP', full: 'Otomatisasi Tata Kelola', icon: '📋', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full mb-3">
            PROGRAM KEAHLIAN
          </span>
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
            Pilihan Jurusan Terbaik
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {programs.map((prog, idx) => (
            <div 
              key={idx}
              className="group relative p-4 md:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prog.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="text-4xl md:text-5xl mb-3">{prog.icon}</div>
              <div className={`text-lg md:text-2xl font-bold bg-gradient-to-r ${prog.color} bg-clip-text text-transparent mb-1`}>
                {prog.name}
              </div>
              <div className="text-xs md:text-sm text-gray-600">{prog.full}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
