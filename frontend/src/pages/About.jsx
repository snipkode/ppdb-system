import { FiUsers, FiAward, FiMapPin, FiPhone, FiMail, FiGlobe, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiCheckCircle, FiStar, FiBookOpen, FiHeart, FiInfo } from 'react-icons/fi';

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
    { icon: <FiAward />, number: '85+', label: 'Guru & Staff' },
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
      {/* Hero Section - Compact */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full mb-4">
              <FiAward className="w-4 h-4" />
              <span className="text-xs font-bold">TERAKREDITASI A (UNGGUL)</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black mb-4">
              Tentang SMK Nusantara
            </h1>

            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Sekolah Pusat Keunggulan dengan prestasi dan fasilitas terbaik
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <FiMapPin className="w-4 h-4" />
                <span className="text-xs">Jakarta</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <FiPhone className="w-4 h-4" />
                <span className="text-xs">(021) 1234-5678</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <FiMail className="w-4 h-4" />
                <span className="text-xs">info@smknusantara.sch.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-6 md:h-10">
            <path d="M0 0L60 10C120 20 240 40 360 53.3C480 67 600 73 720 73.3C840 73 960 67 1080 53.3C1200 40 1320 20 1380 10L1440 0V40H1380C1320 40 1200 40 1080 40C960 40 840 40 720 40C600 40 480 40 360 40C240 40 120 40 60 40H0V0Z" fill="url(#gradient)" fillOpacity="0.15"/>
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

      {/* Vision & Mission - Compact */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="group relative p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {vision.icon}
                  </div>
                  <h2 className="text-xl font-black">{vision.title}</h2>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  {vision.content}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-xl p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-slate-800">Misi</h2>
              </div>
              <div className="space-y-2">
                {mission.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs">{item.title}</h3>
                      <p className="text-gray-600 text-xs">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Compact */}
      <section className="py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-1">Statistik Sekolah</h2>
            <p className="text-white/80 text-xs">Prestasi dan pencapaian kami</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-0.5">{stat.number}</div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities - Compact */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Fasilitas Sekolah
            </h2>
            <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto">
              Fasilitas modern dan lengkap untuk mendukung proses pembelajaran
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {facilities.map((facility, idx) => (
              <div key={idx} className="group p-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{facility.icon}</div>
                <h3 className="font-bold text-slate-800 text-xs mb-0.5">{facility.name}</h3>
                <p className="text-xs text-gray-500">{facility.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements - Compact */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-yellow-800 to-orange-800 bg-clip-text text-transparent mb-2">
              Prestasi Siswa
            </h2>
            <p className="text-gray-600 text-xs md:text-sm max-w-xl mx-auto">
              Bukti keunggulan dan kompetensi lulusan SMK Nusantara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="group p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-yellow-400 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full mb-1">
                      {achievement.year}
                    </div>
                    <h3 className="font-bold text-slate-800 text-xs">{achievement.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info - Compact */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 via-blue-800 to-purple-800 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Hubungi Kami</h2>

              <div className="grid md:grid-cols-2 gap-3 mb-6">
                <ContactItem icon={<FiMapPin />} label="Alamat" value="Jl. Pendidikan No. 123, Jakarta Selatan, DKI Jakarta 12345" />
                <ContactItem icon={<FiPhone />} label="Telepon" value="(021) 1234-5678" />
                <ContactItem icon={<FiMail />} label="Email" value="info@smknusantara.sch.id" />
                <ContactItem icon={<FiGlobe />} label="Website" value="www.smknusantara.sch.id" />
              </div>

              <div className="flex justify-center gap-2">
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
  <div className="flex items-start gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[10px] text-white/70 mb-0.5">{label}</div>
      <div className="font-semibold text-sm truncate">{value}</div>
    </div>
  </div>
);

const SocialButton = ({ icon }) => (
  <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
    {icon}
  </button>
);

export default About;
