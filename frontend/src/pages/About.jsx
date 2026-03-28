import { FiUsers, FiAward, FiMapPin, FiPhone, FiMail, FiGlobe, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiCheckCircle, FiStar, FiBookOpen, FiHeart } from 'react-icons/fi';

const About = () => {
  const vision = {
    title: 'Visi',
    content: 'Menjadikan SMK Nusantara sebagai pusat keunggulan pendidikan vokasi yang menghasilkan lulusan berkarakter, kompeten, dan siap bersaing di era global.',
    icon: <FiStar />
  };

  const mission = [
    {
      title: 'Pendidikan Berkualitas',
      content: 'Menyelenggarakan pendidikan kejuruan dengan standar industri dan teknologi terkini',
      icon: <FiBookOpen />
    },
    {
      title: 'Karakter Unggul',
      content: 'Membentuk siswa yang berakhlak mulia, disiplin, dan bertanggung jawab',
      icon: <FiHeart />
    },
    {
      title: 'Kompetensi Global',
      content: 'Mengembangkan kompetensi siswa yang sesuai dengan kebutuhan dunia kerja internasional',
      icon: <FiGlobe />
    },
    {
      title: 'Kemitraan Strategis',
      content: 'Membangun kerjasama dengan industri dan institusi untuk penyaluran lulusan',
      icon: <FiUsers />
    }
  ];

  const stats = [
    { icon: <FiUsers />, number: '1,200+', label: 'Siswa Aktif' },
    { icon: <FiAward />, number: '85+' label: 'Guru & Staff' },
    { icon: <FiBookOpen />, number: '8', label: 'Program Keahlian' },
    { icon: <FiStar />, number: '15+', label: 'Tahun Eksistensi' },
    { icon: <FiCheckCircle />, number: '95%', label: 'Lulusan Bekerja' },
    { icon: <FiMapPin />, number: '100+', label: 'Mitra Industri' }
  ];

  const facilities = [
    { name: 'Lab Komputer RPL', icon: '💻', count: '5 Lab' },
    { name: 'Lab Jaringan TKJ', icon: '🖥️', count: '3 Lab' },
    { name: 'Lab Akuntansi', icon: '📊', count: '2 Lab' },
    { name: 'Studio DKV', icon: '🎨', count: '3 Studio' },
    { name: 'Workshop TBSM', icon: '🏍️', count: '1 Bengkel' },
    { name: 'Lab Bahasa', icon: '🎧', count: '2 Lab' },
    { name: 'Perpustakaan', icon: '📚', count: '1,000+ Buku' },
    { name: 'Aula', icon: '🎭', count: '500 Kursi' },
    { name: 'Masjid', icon: '🕌', count: '1,000 Jamaah' },
    { name: 'Kantin', icon: '🍽️', count: '10 Tenant' },
    { name: 'Lapangan Olahraga', icon: '⚽', count: '3 Lapangan' },
    { name: 'Koperasi Siswa', icon: '🏪', count: '1 Unit' }
  ];

  const achievements = [
    { year: '2024', title: 'Juara 1 LKS Nasional - Web Technology', icon: '🥇' },
    { year: '2024', title: 'Juara 2 LKS Nasional - IT Network Systems', icon: '🥈' },
    { year: '2023', title: 'Juara 1 Lomba Aplikasi Android Tingkat Provinsi', icon: '🏆' },
    { year: '2023', title: 'Best Innovation Award - Robotics Competition', icon: '🤖' },
    { year: '2023', title: 'Juara 3 Business Plan Competition Nasional', icon: '💼' },
    { year: '2022', title: 'Sekolah Adiwiyata Tingkat Nasional', icon: '🌱' }
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
              <FiAward className="w-5 h-5" />
              <span className="text-sm font-bold">TERAKREDITASI A (UNGGUL)</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Tentang SMK Nusantara
            </h1>

            <p className="text-xl text-white/90 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Sekolah Pusat Keunggulan dengan prestasi dan fasilitas terbaik
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiMapPin className="w-5 h-5" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiPhone className="w-5 h-5" />
                <span>(021) 1234-5678</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FiMail className="w-5 h-5" />
                <span>info@smknusantara.sch.id</span>
              </div>
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

      {/* Vision & Mission */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Vision */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {vision.icon}
                  </div>
                  <h2 className="text-3xl font-black">{vision.title}</h2>
                </div>
                <p className="text-lg text-white/90 leading-relaxed">
                  {vision.content}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <FiCheckCircle className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">Misi</h2>
              </div>
              <div className="space-y-4">
                {mission.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Statistik Sekolah</h2>
            <p className="text-white/80">Prestasi dan pencapaian kami</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Fasilitas Sekolah
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Fasilitas modern dan lengkap untuk mendukung proses pembelajaran
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {facilities.map((facility, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{facility.icon}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{facility.name}</h3>
                <p className="text-xs text-gray-500">{facility.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-yellow-800 to-orange-800 bg-clip-text text-transparent mb-4">
              Prestasi Siswa
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Bukti keunggulan dan kompetensi lulusan SMK Nusantara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-2">
                      {achievement.year}
                    </div>
                    <h3 className="font-bold text-slate-800">{achievement.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 via-blue-800 to-purple-800 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Hubungi Kami</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <ContactItem icon={<FiMapPin />} label="Alamat" value="Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345" />
                <ContactItem icon={<FiPhone />} label="Telepon" value="(021) 1234-5678" />
                <ContactItem icon={<FiMail />} label="Email" value="info@smknusantara.sch.id" />
                <ContactItem icon={<FiGlobe />} label="Website" value="www.smknusantara.sch.id" />
              </div>

              <div className="flex justify-center gap-4">
                <SocialButton icon={<FiFacebook />} />
                <SocialButton icon={<FiInstagram />} />
                <SocialButton icon={<FiTwitter />} />
                <SocialButton icon={<FiYoutube />} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-xs text-white/70 mb-1">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  </div>
);

const SocialButton = ({ icon }) => (
  <button className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
    {icon}
  </button>
);

export default About;
