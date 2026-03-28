import { Link } from 'react-router-dom';
import { FiChevronRight, FiUsers, FiAward, FiBook, FiMonitor, FiBriefcase, FiStar, FiCheckCircle, FiArrowRight, FiGlobe, FiCpu, FiDollarSign, FiClock } from 'react-icons/fi';

const Majors = () => {
  const majors = [
    {
      id: 1,
      code: 'RPL',
      name: 'Rekayasa Perangkat Lunak',
      fullCode: 'TIK-RPL',
      emoji: '💻',
      color: 'from-blue-500 to-cyan-500',
      description: 'Mempelajari pengembangan software, aplikasi mobile, web programming, dan database management',
      duration: '3 Tahun',
      quota: 120,
      salary: '5-15 Juta',
      features: [
        'Programming (Java, Python, JavaScript)',
        'Web Development (React, Node.js)',
        'Mobile App Development',
        'Database Management',
        'Software Testing'
      ],
      careers: ['Software Developer', 'Web Developer', 'Mobile Developer', 'UI/UX Designer', 'Database Administrator'],
      popular: true
    },
    {
      id: 2,
      code: 'TKJ',
      name: 'Teknik Komputer & Jaringan',
      fullCode: 'TIK-TKJ',
      emoji: '🖥️',
      color: 'from-purple-500 to-pink-500',
      description: 'Fokus pada instalasi, konfigurasi, dan maintenance jaringan komputer dan server',
      duration: '3 Tahun',
      quota: 90,
      salary: '4-12 Juta',
      features: [
        'Network Installation',
        'Server Administration',
        'Cloud Computing',
        'Cyber Security Basics',
        'IoT Fundamentals'
      ],
      careers: ['Network Engineer', 'System Administrator', 'IT Support', 'Cloud Technician', 'Network Security'],
      popular: true
    },
    {
      id: 3,
      code: 'AKL',
      name: 'Akuntansi & Keuangan Lembaga',
      fullCode: 'AK-AKL',
      emoji: '📊',
      color: 'from-green-500 to-emerald-500',
      description: 'Mempelajari pembukuan, laporan keuangan, perpajakan, dan aplikasi akuntansi komputer',
      duration: '3 Tahun',
      quota: 60,
      salary: '3-10 Juta',
      features: [
        'Financial Accounting',
        'Tax Administration',
        'MYOB & Accurate',
        'Budgeting & Auditing',
        'E-Filing Pajak'
      ],
      careers: ['Accountant', 'Tax Consultant', 'Auditor Staff', 'Finance Staff', 'Bookkeeper'],
      popular: false
    },
    {
      id: 4,
      code: 'OTKP',
      name: 'Otomatisasi & Tata Kelola Perkantoran',
      fullCode: 'BJ-OTKP',
      emoji: '📋',
      color: 'from-orange-500 to-red-500',
      description: 'Keahlian dalam administrasi perkantoran, kearsipan, dan teknologi informasi kantor',
      duration: '3 Tahun',
      quota: 60,
      salary: '3-8 Juta',
      features: [
        'Office Administration',
        'Archive Management',
        'Business Correspondence',
        'Event Organization',
        'Customer Service'
      ],
      careers: ['Administrative Staff', 'Secretary', 'Receptionist', 'HR Staff', 'Public Relations'],
      popular: false
    },
    {
      id: 5,
      code: 'DKV',
      name: 'Desain Komunikasi Visual',
      fullCode: 'SEN-DKV',
      emoji: '🎨',
      color: 'from-pink-500 to-rose-500',
      description: 'Kombinasi seni dan teknologi untuk menciptakan konten visual yang komunikatif dan estetis',
      duration: '3 Tahun',
      quota: 90,
      salary: '4-20 Juta',
      features: [
        'Graphic Design',
        'Video Editing',
        'Animation 2D/3D',
        'Photography',
        'Branding & Logo Design'
      ],
      careers: ['Graphic Designer', 'Video Editor', 'Animator', 'Content Creator', 'Brand Designer'],
      popular: true
    },
    {
      id: 6,
      code: 'TBSM',
      name: 'Teknik Bisnis Sepeda Motor',
      fullCode: 'OTM-TBSM',
      emoji: '🏍️',
      color: 'from-red-500 to-orange-500',
      description: 'Perawatan, perbaikan, dan bisnis sepeda motor dengan teknologi terkini',
      duration: '3 Tahun',
      quota: 60,
      salary: '3-10 Juta',
      features: [
        'Engine Overhaul',
        'Electrical System',
        'Fuel Injection',
        'Business Management',
        'Customer Service'
      ],
      careers: ['Mechanic', 'Service Advisor', 'Spare Parts Manager', 'Workshop Owner', 'Technical Trainer'],
      popular: false
    },
    {
      id: 7,
      code: 'TAV',
      name: 'Teknik Audio & Video',
      fullCode: 'EL-TAV',
      emoji: '📺',
      color: 'from-indigo-500 to-purple-500',
      description: 'Instalasi, perawatan, dan perbaikan peralatan audio video dan home entertainment',
      duration: '3 Tahun',
      quota: 60,
      salary: '3-9 Juta',
      features: [
        'Audio System Installation',
        'Video Production',
        'Broadcasting Equipment',
        'Home Theater Setup',
        'Repair & Maintenance'
      ],
      careers: ['Audio Technician', 'Video Editor', 'Broadcast Technician', 'Sound Engineer', 'Service Technician'],
      popular: false
    },
    {
      id: 8,
      code: 'TB',
      name: 'Tata Busana',
      fullCode: 'BUS-TB',
      emoji: '👗',
      color: 'from-fuchsia-500 to-pink-500',
      description: 'Desain mode, pola, menjahit, dan bisnis fashion dengan teknologi modern',
      duration: '3 Tahun',
      quota: 60,
      salary: '3-15 Juta',
      features: [
        'Fashion Design',
        'Pattern Making',
        'Sewing Techniques',
        'Textile Knowledge',
        'Fashion Business'
      ],
      careers: ['Fashion Designer', 'Pattern Maker', 'Seamstress', 'Fashion Buyer', 'Boutique Owner'],
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-6 animate-fade-in-up">
              <FiBook className="w-5 h-5" />
              <span className="text-sm font-bold">8 PROGRAM KEAHLIAN TERSEDIA</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Program Keahlian
            </h1>

            <p className="text-xl text-white/90 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Pilih jurusan sesuai minat, bakat, dan rencana karirmu di masa depan
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <HeroStat icon={<FiBook />} number="8" label="Jurusan" />
              <HeroStat icon={<FiUsers />} number="600+" label="Kuota" />
              <HeroStat icon={<FiAward />} number="95%" label="Lulusan Bekerja" />
              <HeroStat icon={<FiStar />} number="A" label="Akreditasi" />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-12 md:h-20">
            <path d="M0 0L60 10C120 20 240 40 360 53.3C480 67 600 73 720 73.3C840 73 960 67 1080 53.3C1200 40 1320 20 1380 10L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="url(#gradient)" fillOpacity="0.15"/>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
                <stop stopColor="#3B82F6"/>
                <stop offset="0.5" stopColor="#9333EA"/>
                <stop offset="1" stopColor="#EC4899"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Majors Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Pilih Jurusanmu
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Semua program keahlian dilengkapi dengan fasilitas modern dan kurikulum standar industri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {majors.map((major) => (
              <MajorCard key={major.id} major={major} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
              Kenapa Belajar di SMK Nusantara?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon={<FiMonitor />}
              title="Fasilitas Modern"
              description="Lab komputer, workshop, dan peralatan standar industri"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<FiAward />}
              title="Guru Bersertifikat"
              description="Pengajar profesional dan berpengalaman di bidangnya"
              color="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<FiBriefcase />}
              title="Link Industri"
              description="Kerjasama dengan 100+ perusahaan untuk PKL & penyaluran kerja"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<FiGlobe />}
              title="Sertifikasi Internasional"
              description="Lulusan mendapat sertifikat kompetensi yang diakui global"
              color="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Perbandingan Jurusan
            </h2>
            <p className="text-gray-600">Informasi lengkap untuk membantumu memilih</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">Jurusan</th>
                  <th className="py-4 px-6 text-center font-bold">Kuota</th>
                  <th className="py-4 px-6 text-center font-bold">Durasi</th>
                  <th className="py-4 px-6 text-center font-bold">Gaji Awal</th>
                  <th className="py-4 px-6 text-center font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {majors.map((major, index) => (
                  <tr key={major.id} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{major.emoji}</span>
                        <div>
                          <div className="font-bold text-slate-800">{major.name}</div>
                          <div className="text-xs text-gray-500">{major.fullCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-blue-600 font-semibold">
                        <FiUsers className="w-4 h-4" />
                        {major.quota}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-purple-600 font-semibold">
                        <FiClock className="w-4 h-4" />
                        {major.duration}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                        <FiDollarSign className="w-4 h-4" />
                        {major.salary}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        to={`/register?major=${major.code}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
                      >
                        <span>Daftar</span>
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sudah Menentukan Pilihan?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Segera daftarkan diri Anda dan mulai perjalanan menuju masa depan gemilang
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 hover:bg-gray-50 font-bold px-10 py-5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95"
            >
              <span>Daftar Sekarang</span>
              <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ppdb"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white border-2 border-white/40 hover:bg-white/20 font-semibold px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FiBook className="w-5 h-5" />
              <span>Info PPDB</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const HeroStat = ({ icon, number, label }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105">
    <div className="text-white/80 mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl md:text-3xl font-bold text-white">{number}</div>
    <div className="text-xs text-white/70">{label}</div>
  </div>
);

const MajorCard = ({ major }) => (
  <Link to={`/register?major=${major.code}`} className="group">
    <div className={`relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${major.popular ? 'ring-2 ring-green-500' : ''}`}>
      {/* Popular Badge */}
      {major.popular && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
          ⭐ POPULER
        </div>
      )}

      {/* Header with Gradient */}
      <div className={`h-32 bg-gradient-to-br ${major.color} flex items-center justify-center relative overflow-hidden`}>
        <span className="text-8xl group-hover:scale-110 transition-transform duration-500">{major.emoji}</span>
        <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm px-4 py-2">
          <div className="text-white text-xs font-bold">{major.fullCode}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
            {major.name}
          </h3>
          <span className={`px-3 py-1 bg-gradient-to-r ${major.color} text-white text-xs font-bold rounded-full`}>
            {major.code}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {major.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatBox icon={<FiUsers />} value={major.quota} label="Kuota" color={major.color} />
          <StatBox icon={<FiClock />} value={major.duration} label="Durasi" color={major.color} />
          <StatBox icon={<FiDollarSign />} value={major.salary} label="Gaji" color={major.color} />
        </div>

        {/* Features Preview */}
        <div className="space-y-2 mb-4">
          {major.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
          {major.features.length > 3 && (
            <div className="text-xs text-purple-600 font-semibold pl-6">
              +{major.features.length - 3} lainnya
            </div>
          )}
        </div>

        {/* Careers */}
        <div className="pt-4 border-t">
          <div className="text-xs text-gray-500 mb-2">Prospek Karir:</div>
          <div className="flex flex-wrap gap-1">
            {major.careers.slice(0, 3).map((career, idx) => (
              <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg">
                {career}
              </span>
            ))}
            {major.careers.length > 3 && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg">
                +{major.careers.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const StatBox = ({ icon, value, label, color }) => (
  <div className="text-center p-2 bg-slate-50 rounded-xl">
    <div className={`text-lg mb-1 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      {icon}
    </div>
    <div className="text-xs font-bold text-slate-800">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="group p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-600 group-hover:text-white/90 transition-colors">{description}</p>
  </div>
);

export default Majors;
