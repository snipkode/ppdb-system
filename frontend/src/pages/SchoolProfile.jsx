import { useState } from 'react';
import { 
  FiMapPin, FiPhone, FiMail, FiClock, FiAward, FiUsers, FiBookOpen, 
  FiStar, FiCheckCircle, FiDownload, FiPlay, FiChevronDown, FiFacebook, 
  FiInstagram, FiTwitter, FiYoutube, FiLinkedin, FiHelpCircle, FiFileText, 
  FiBook, FiImage, FiVideo, FiGlobe
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

const SchoolProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { icon: <FiUsers />, number: '1,200+', label: 'Siswa', color: 'from-blue-500 to-cyan-500' },
    { icon: <FiAward />, number: '85+', label: 'Guru', color: 'from-purple-500 to-pink-500' },
    { icon: <FiBookOpen />, number: '8', label: 'Jurusan', color: 'from-green-500 to-emerald-500' },
    { icon: <FiStar />, number: '15+', label: 'Tahun', color: 'from-orange-500 to-red-500' },
    { icon: <FiCheckCircle />, number: '95%', label: 'Bekerja', color: 'from-indigo-500 to-blue-500' },
    { icon: <FiAward />, number: '100+', label: 'Prestasi', color: 'from-yellow-500 to-orange-500' }
  ];

  const timeline = [
    { year: '2009', title: 'Pendirian', icon: '🏫' },
    { year: '2014', title: 'Akreditasi A', icon: '📜' },
    { year: '2018', title: 'SMK PK', icon: '🌟' },
    { year: '2020', title: 'Digital', icon: '💻' },
    { year: '2024', title: 'Ekspansi', icon: '🚀' }
  ];

  const downloads = [
    { title: 'Prospektus 2024', size: '2.5 MB', type: 'PDF', icon: <FiFileText /> },
    { title: 'Panduan', size: '1.2 MB', type: 'PDF', icon: <FiBook /> },
    { title: 'Profil', size: '5.8 MB', type: 'PDF', icon: <FiImage /> },
    { title: 'Video', size: '45 MB', type: 'MP4', icon: <FiVideo /> }
  ];

  const faqs = [
    { q: 'Kapan pendaftaran dibuka?', a: 'Pendaftaran dibuka Januari-Maret setiap tahun.' },
    { q: 'Berapa biaya pendaftaran?', a: 'Rp 150.000 sudah termasuk seragam praktik & asuransi.' },
    { q: 'Apakah ada beasiswa?', a: 'Ada beasiswa prestasi dan kurang mampu.' },
    { q: 'Bagaimana prospek kerja?', a: '95% lulusan bekerja, kuliah, atau wirausaha.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-12">
      {/* Hero - Ultra Compact */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-5 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-5 right-10 w-56 h-56 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 max-w-5xl mx-auto">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <FiAward className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">AKREDITASI A</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black mb-1">SMK Nusantara</h1>
              <p className="text-sm md:text-base text-white/90 mb-2">Pusat Keunggulan • Unggul • Kompeten • Berkarakter</p>
              <div className="flex flex-wrap gap-2">
                <QuickInfo icon={<FiPhone />} text="(021) 1234-5678" />
                <QuickInfo icon={<FiMail />} text="info@smknusantara.sch.id" />
                <QuickInfo icon={<FiMapPin />} text="Jakarta" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Compact Grid */}
      <section className="py-6 -mt-4">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-3 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-10 h-10 mx-auto mb-1 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-sm`}>
                    {stat.icon}
                  </div>
                  <div className="text-lg md:text-xl font-bold text-slate-800 leading-tight">{stat.number}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-1.5 bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg overflow-x-auto">
              <TabBtn active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<FiBookOpen />} label="Overview" />
              <TabBtn active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<FiClock />} label="Sejarah" />
              <TabBtn active={activeTab === 'facilities'} onClick={() => setActiveTab('facilities')} icon={<FiAward />} label="Fasilitas" />
              <TabBtn active={activeTab === 'download'} onClick={() => setActiveTab('download')} icon={<FiDownload />} label="Download" />
              <TabBtn active={activeTab === 'faq'} onClick={() => setActiveTab('faq')} icon={<FiHelpCircle />} label="FAQ" />
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 animate-fade-in">
                {/* Vision & Mission - Side by Side */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 text-white shadow-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <FiStar className="w-4 h-4" />
                      </div>
                      <h2 className="font-bold">Visi</h2>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Menjadikan SMK Nusantara sebagai pusat keunggulan pendidikan vokasi yang menghasilkan lulusan berkarakter, kompeten, dan siap bersaing di era global.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                        <FiCheckCircle className="w-4 h-4" />
                      </div>
                      <h2 className="font-bold text-slate-800">Misi</h2>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span>📚</span> Pendidikan standar industri</li>
                      <li className="flex items-start gap-2"><span>🎯</span> Karakter unggul & berakhlak</li>
                      <li className="flex items-start gap-2"><span>🌍</span> Kompetensi level global</li>
                      <li className="flex items-start gap-2"><span>🤝</span> Kemitraan strategis</li>
                    </ul>
                  </div>
                </div>

                {/* Principal + Facilities */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        KS
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 mb-1">Sambutan Kepala Sekolah</h3>
                        <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                          "Kami berkomitmen memberikan pendidikan vokasi terbaik dengan fasilitas modern dan kurikulum berbasis industri."
                        </p>
                        <p className="text-xs font-semibold text-slate-800">Dr. Budi Santoso, M.Pd</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-purple-800 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">Video Profile</h3>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                          <FiPlay className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-xs text-white/70">Company profile video akan ditampilkan di sini</p>
                    </div>
                  </div>
                </div>

                {/* Facilities Quick */}
                <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-3">Fasilitas Unggulan</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: 'Lab Komputer', icon: '💻', count: '8 Lab' },
                      { name: 'Workshop', icon: '🔧', count: '4 Bengkel' },
                      { name: 'Perpustakaan', icon: '📚', count: 'Digital' },
                      { name: 'Sport Center', icon: '⚽', count: '3 Lapangan' }
                    ].map((f, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-3 text-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all">
                        <div className="text-2xl mb-1">{f.icon}</div>
                        <div className="font-semibold text-slate-800 text-xs">{f.name}</div>
                        <div className="text-xs text-blue-600">{f.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 animate-fade-in">
                <h2 className="font-bold text-slate-800 mb-4 text-center">Perjalanan Kami</h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="space-y-4">
                    {timeline.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 pl-12 relative">
                        <div className="absolute left-4 w-4 h-4 bg-white border-4 border-blue-500 rounded-full -translate-x-1/2 z-10"></div>
                        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 flex-1 hover:shadow-md transition-all">
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                                {item.year}
                              </span>
                              <span className="font-bold text-slate-800">{item.title}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Facilities Tab */}
            {activeTab === 'facilities' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 mb-4">
                  <h2 className="font-bold text-slate-800 mb-4 text-center">Fasilitas Lengkap</h2>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                      { name: 'Lab RPL', icon: '💻' }, { name: 'Lab TKJ', icon: '🖥️' },
                      { name: 'Akuntansi', icon: '📊' }, { name: 'Studio DKV', icon: '🎨' },
                      { name: 'TBSM', icon: '🏍️' }, { name: 'TAV', icon: '📺' },
                      { name: 'Busana', icon: '👗' }, { name: 'Bahasa', icon: '🎧' },
                      { name: 'Perpus', icon: '📚' }, { name: 'Aula', icon: '🎭' },
                      { name: 'Masjid', icon: '🕌' }, { name: 'Kantin', icon: '🍽️' }
                    ].map((f, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-3 text-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:shadow-md transition-all">
                        <div className="text-3xl mb-1">{f.icon}</div>
                        <div className="font-semibold text-slate-800 text-xs">{f.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Download Tab */}
            {activeTab === 'download' && (
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 animate-fade-in">
                <h2 className="font-bold text-slate-800 mb-4 text-center">Download Materi</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {downloads.map((item, idx) => (
                    <div key={idx} className="group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-800 text-sm truncate">{item.title}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">{item.type}</span>
                          <span className="text-xs text-gray-500">{item.size}</span>
                        </div>
                      </div>
                      <FiDownload className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 animate-fade-in">
                <h2 className="font-bold text-slate-800 mb-4 text-center">Pertanyaan Umum</h2>
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full p-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-medium text-slate-800 text-sm text-left">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>
                          <FiChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </button>
                      {activeFaq === idx && (
                        <div className="px-3 pb-3 text-sm text-gray-600">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Footer - Compact */}
      <section className="mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 rounded-2xl shadow-xl p-5 text-white">
            <div className="text-center mb-4">
              <h3 className="font-bold mb-3">Ikuti Kami</h3>
              <div className="flex justify-center gap-2">
                <SocialBtn icon={<FiFacebook />} />
                <SocialBtn icon={<FiInstagram />} />
                <SocialBtn icon={<FiTwitter />} />
                <SocialBtn icon={<FiYoutube />} />
                <SocialBtn icon={<FiLinkedin />} />
                <SocialBtn icon={<FaTiktok />} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <FiMapPin className="w-5 h-5 mx-auto mb-1" />
                <div className="font-semibold text-sm">Alamat</div>
                <div className="text-xs text-white/70">Jl. Pendidikan No. 123, Jakarta</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <FiPhone className="w-5 h-5 mx-auto mb-1" />
                <div className="font-semibold text-sm">Telepon</div>
                <div className="text-xs text-white/70">(021) 1234-5678</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <FiMail className="w-5 h-5 mx-auto mb-1" />
                <div className="font-semibold text-sm">Email</div>
                <div className="text-xs text-white/70">info@smknusantara.sch.id</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const QuickInfo = ({ icon, text }) => (
  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
    <span className="w-3.5 h-3.5">{icon}</span>
    <span className="text-xs">{text}</span>
  </div>
);

const TabBtn = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all flex-shrink-0 ${
      active
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
        : 'text-slate-600 hover:bg-white hover:shadow'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const SocialBtn = ({ icon }) => (
  <button className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all">
    {icon}
  </button>
);

export default SchoolProfile;
