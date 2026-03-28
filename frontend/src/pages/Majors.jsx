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
      {/* Hero Section - Compact Redesigned */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-5 right-10 w-56 h-56 bg-yellow-300/10 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold">PPDB 2024/2025</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 leading-tight">
              Pilih Jurusanmu,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                Wujudkan Mimpimu
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-white/85 mb-6 max-w-xl">
              8 Program keahlian dengan fasilitas modern & kurikulum standar industri
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <a
                href="#jurusan"
                className="inline-flex items-center gap-1.5 bg-white text-purple-600 hover:bg-gray-50 font-bold px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-white/30 hover:scale-105 text-sm"
              >
                <FiBook className="w-4 h-4" />
                <span>Lihat Jurusan</span>
              </a>
              <a
                href="/register"
                className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white border border-white/40 hover:bg-white/20 font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 text-sm"
              >
                <FiArrowRight className="w-4 h-4" />
                <span>Daftar</span>
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2">
              <HeroStat icon={<FiBook className="w-4 h-4" />} number="8" label="Jurusan" />
              <HeroStat icon={<FiUsers className="w-4 h-4" />} number="600+" label="Kuota" />
              <HeroStat icon={<FiAward className="w-4 h-4" />} number="95%" label="Bekerja" />
              <HeroStat icon={<FiStar className="w-4 h-4" />} number="A" label="Akreditasi" />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-8 md:h-12" preserveAspectRatio="none">
            <path d="M0,64 C144,106.67 288,128 432,128 C576,128 720,106.67 864,64 C1008,21.33 1152,0 1296,0 L1440,0 L1440,120 L0,120 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Majors Grid */}
      <section id="jurusan" className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Pilih Jurusanmu
            </h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Semua jurusan dilengkapi fasilitas modern & kurikulum standar industri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {majors.map((major) => (
              <MajorCard key={major.id} major={major} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section - Compact */}
      <section className="py-8 md:py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-2">
              Kenapa SMK Nusantara?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <FeatureCard
              icon={<FiMonitor />}
              title="Fasilitas Modern"
              description="Lab komputer & workshop standar industri"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<FiAward />}
              title="Guru Bersertifikat"
              description="Pengajar profesional berpengalaman"
              color="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<FiBriefcase />}
              title="Link Industri"
              description="100+ perusahaan untuk PKL & kerja"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<FiGlobe />}
              title="Sertifikasi Global"
              description="Sertifikat kompetensi diakui internasional"
              color="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* Comparison Table - Compact */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Perbandingan Jurusan
            </h2>
            <p className="text-gray-600 text-sm">Informasi lengkap untuk membantumu memilih</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left font-bold text-sm">Jurusan</th>
                  <th className="py-3 px-4 text-center font-bold text-sm">Kuota</th>
                  <th className="py-3 px-4 text-center font-bold text-sm">Durasi</th>
                  <th className="py-3 px-4 text-center font-bold text-sm">Gaji</th>
                  <th className="py-3 px-4 text-center font-bold text-sm">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {majors.map((major, index) => (
                  <tr key={major.id} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{major.emoji}</span>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{major.name}</div>
                          <div className="text-xs text-gray-500">{major.fullCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm">
                        <FiUsers className="w-3 h-3" />
                        {major.quota}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-purple-600 font-semibold text-sm">
                        <FiClock className="w-3 h-3" />
                        {major.duration}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm">
                        <FiDollarSign className="w-3 h-3" />
                        {major.salary}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        to={`/register?major=${major.code}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
                      >
                        <span>Daftar</span>
                        <FiArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-10 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Sudah Menentukan Pilihan?
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-6 max-w-xl mx-auto">
            Segera daftarkan diri dan mulai perjalanan menuju masa depan gemilang
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-gray-50 font-bold px-6 py-3 rounded-xl transition-all hover:shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95"
            >
              <span>Daftar Sekarang</span>
              <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ppdb"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white border-2 border-white/40 hover:bg-white/20 font-semibold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              <FiBook className="w-4 h-4" />
              <span>Info PPDB</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const HeroStat = ({ icon, number, label }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 hover:bg-white/15 transition-all hover:scale-105">
    <div className="text-white/80 mb-1 flex justify-center">{icon}</div>
    <div className="text-lg md:text-xl font-bold text-white text-center">{number}</div>
    <div className="text-[10px] md:text-xs text-white/70 text-center">{label}</div>
  </div>
);

const MajorCard = ({ major }) => (
  <Link to={`/register?major=${major.code}`} className="group">
    <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${major.popular ? 'ring-2 ring-green-500' : ''}`}>
      {/* Popular Badge */}
      {major.popular && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow">
          ⭐ POPULER
        </div>
      )}

      {/* Header with Gradient - Compact */}
      <div className={`h-24 bg-gradient-to-br ${major.color} flex items-center justify-center relative overflow-hidden`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{major.emoji}</span>
        <div className="absolute bottom-0 left-0 right-0 bg-white/20 backdrop-blur-sm px-3 py-1.5">
          <div className="text-white text-xs font-bold">{major.fullCode}</div>
        </div>
      </div>

      {/* Content - Compact */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
            {major.name}
          </h3>
          <span className={`px-2 py-0.5 bg-gradient-to-r ${major.color} text-white text-xs font-bold rounded-full`}>
            {major.code}
          </span>
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {major.description}
        </p>

        {/* Quick Stats - Compact */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <StatBox icon={<FiUsers />} value={major.quota} label="Kuota" color={major.color} />
          <StatBox icon={<FiClock />} value={major.duration} label="Durasi" color={major.color} />
          <StatBox icon={<FiDollarSign />} value={major.salary} label="Gaji" color={major.color} />
        </div>

        {/* Features Preview - Compact */}
        <div className="space-y-1.5 mb-3">
          {major.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs">
              <FiCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
          {major.features.length > 3 && (
            <div className="text-xs text-purple-600 font-semibold pl-5">
              +{major.features.length - 3} lainnya
            </div>
          )}
        </div>

        {/* Careers - Compact */}
        <div className="pt-3 border-t">
          <div className="text-xs text-gray-500 mb-1.5">Prospek Karir:</div>
          <div className="flex flex-wrap gap-1">
            {major.careers.slice(0, 3).map((career, idx) => (
              <span key={idx} className="px-1.5 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                {career}
              </span>
            ))}
            {major.careers.length > 3 && (
              <span className="px-1.5 py-1 bg-purple-100 text-purple-700 text-xs rounded">
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
  <div className="text-center p-1.5 bg-slate-50 rounded-lg">
    <div className={`text-base mb-0.5 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      {icon}
    </div>
    <div className="text-xs font-bold text-slate-800">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="group p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-base font-bold text-slate-800 mb-1.5 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-600 text-sm group-hover:text-white/90 transition-colors">{description}</p>
  </div>
);

export default Majors;
