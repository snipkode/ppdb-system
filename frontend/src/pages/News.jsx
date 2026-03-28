import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiCalendar, FiUser, FiClock, FiChevronRight, FiTag, FiShare2, FiHeart, FiMessageCircle, FiEye } from 'react-icons/fi';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua', color: 'from-slate-600 to-slate-800' },
    { id: 'academic', name: 'Akademik', color: 'from-blue-500 to-cyan-500' },
    { id: 'achievement', name: 'Prestasi', color: 'from-yellow-500 to-orange-500' },
    { id: 'event', name: 'Event', color: 'from-purple-500 to-pink-500' },
    { id: 'announcement', name: 'Pengumuman', color: 'from-green-500 to-emerald-500' },
  ];

  const featuredNews = {
    id: 1,
    title: 'SMK Nusantara Raih Juara 1 Lomba Kompetensi Siswa Nasional 2024',
    excerpt: 'Siswa SMK Nusantara berhasil meraih medali emas dalam Lomba Kompetensi Siswa (LKS) tingkat nasional.',
    image: '🏆',
    category: 'achievement',
    author: 'Admin',
    date: '25 Maret 2024',
    views: 1250,
    likes: 342
  };

  const news = [
    {
      id: 2,
      title: 'Pendaftaran PPDB Gelombang 1 Resmi Dibuka',
      excerpt: 'Pendaftaran Peserta Didik Baru gelombang 1 telah dibuka mulai 1 Januari hingga 30 Maret 2024.',
      image: '📢',
      category: 'announcement',
      author: 'Panitia PPDB',
      date: '1 Januari 2024',
      views: 2340,
      likes: 156
    },
    {
      id: 3,
      title: 'Kunjungan Industri ke PT. Telkom Indonesia',
      excerpt: 'Siswa kelas XI melakukan kunjungan industri ke PT. Telkom Indonesia untuk mempelajari teknologi terbaru.',
      image: '🏢',
      category: 'academic',
      author: 'Humas',
      date: '15 Maret 2024',
      views: 890,
      likes: 234
    },
    {
      id: 4,
      title: 'Tim Robotik SMK Nusantara Lolos ke Kompetisi Internasional',
      excerpt: 'Tim robotik sekolah berhasil lolos ke kompetisi robotik internasional di Singapura bulan depan.',
      image: '🤖',
      category: 'achievement',
      author: 'Pembina Robotik',
      date: '20 Maret 2024',
      views: 1567,
      likes: 445
    },
    {
      id: 5,
      title: 'Seminar Kewirausahaan: Membangun Startup Sejak Dini',
      excerpt: 'Sekolah mengadakan seminar kewirausahaan dengan menghadirkan founder startup sukses sebagai pembicara.',
      image: '💼',
      category: 'event',
      author: 'OSIS',
      date: '10 Maret 2024',
      views: 756,
      likes: 189
    },
    {
      id: 6,
      title: 'Jadwal Ujian Tengah Semester Genap 2024',
      excerpt: 'Ujian Tengah Semester (UTS) genap akan dilaksanakan pada tanggal 15-22 April 2024.',
      image: '📝',
      category: 'academic',
      author: 'Kurikulum',
      date: '5 Maret 2024',
      views: 3200,
      likes: 78
    },
    {
      id: 7,
      title: 'Workshop Digital Marketing untuk Siswa',
      excerpt: 'Workshop 2 hari tentang digital marketing dan social media management untuk mempersiapkan siswa.',
      image: '📱',
      category: 'event',
      author: 'BK',
      date: '28 Februari 2024',
      views: 654,
      likes: 167
    },
    {
      id: 8,
      title: 'Pengumuman Libur Hari Raya Idul Fitri 1445 H',
      excerpt: 'Sekolah akan meliburkan kegiatan belajar mengajar selama 10 hari menjelang dan setelah Idul Fitri.',
      image: '🌙',
      category: 'announcement',
      author: 'Kepala Sekolah',
      date: '1 Maret 2024',
      views: 4500,
      likes: 567
    },
    {
      id: 9,
      title: 'Siswa SMK Nusantara Ciptakan Aplikasi E-Learning',
      excerpt: 'Siswa kelas XII RPL berhasil menciptakan aplikasi e-learning untuk membantu pembelajaran daring.',
      image: '💻',
      category: 'achievement',
      author: 'Produktif RPL',
      date: '18 Februari 2024',
      views: 1890,
      likes: 678
    },
  ];

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section - Compact */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-4 py-2 rounded-full mb-4 animate-fade-in-up">
              <FiShare2 className="w-4 h-4" />
              <span className="text-xs font-bold">BERITA & PENGUMUMAN TERKINI</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Berita SMK Nusantara
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Update terbaru seputar kegiatan, prestasi, dan pengumuman sekolah
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 rounded-xl bg-white/90 backdrop-blur-xl text-slate-800 placeholder-gray-500 focus:ring-4 focus:ring-white/30 outline-none shadow-2xl text-sm"
                />
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-10 md:h-16">
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

      {/* Category Filter - Compact */}
      <section className="py-4 sticky top-16 z-40 bg-slate-50/95 backdrop-blur-xl border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-purple-500/30 scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News - Compact */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">Berita Utama</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="grid md:grid-cols-2">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 flex items-center justify-center">
                    <span className="text-6xl">{featuredNews.image}</span>
                  </div>
                  <div className="p-4 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                        🔥 TERPOPULER
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {featuredNews.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {featuredNews.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          {featuredNews.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiEye className="w-3 h-3" />
                          {featuredNews.views}
                        </span>
                      </div>
                      <Link
                        to={`/news/${featuredNews.id}`}
                        className="inline-flex items-center gap-1 text-purple-600 font-semibold hover:gap-1.5 transition-all text-xs"
                      >
                        Baca Selengkapnya <FiChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid - Compact */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              {searchTerm ? `Hasil Pencarian: "${searchTerm}"` : 'Berita Terbaru'}
            </h2>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">Berita Tidak Ditemukan</h3>
              <p className="text-gray-500 text-sm">Coba kata kunci pencarian lain atau pilih kategori berbeda</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}

          {/* Pagination - Compact */}
          {filteredNews.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              <PaginationButton active>1</PaginationButton>
              <PaginationButton>2</PaginationButton>
              <PaginationButton>3</PaginationButton>
              <PaginationButton>...</PaginationButton>
              <PaginationButton>10</PaginationButton>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter - Compact */}
      <section className="py-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Berlangganan Newsletter</h2>
            <p className="text-white/90 mb-6 text-sm">Dapatkan update berita dan pengumuman terbaru langsung ke email Anda</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-5 py-3 rounded-xl bg-white/90 text-slate-800 placeholder-gray-500 focus:ring-4 focus:ring-white/30 outline-none text-sm"
              />
              <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:shadow-lg hover:shadow-white/30 transition-all hover:scale-105 text-sm">
                Langganan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const NewsCard = ({ news }) => {
  const categoryColors = {
    academic: 'from-blue-500 to-cyan-500',
    achievement: 'from-yellow-500 to-orange-500',
    event: 'from-purple-500 to-pink-500',
    announcement: 'from-green-500 to-emerald-500',
  };

  const categoryLabels = {
    academic: 'Akademik',
    achievement: 'Prestasi',
    event: 'Event',
    announcement: 'Pengumuman',
  };

  return (
    <Link to={`/news/${news.id}`} className="group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Image */}
        <div className={`h-40 bg-gradient-to-br ${categoryColors[news.category]} flex items-center justify-center relative overflow-hidden`}>
          <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{news.image}</span>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-full">
              {categoryLabels[news.category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {news.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <FiEye className="w-3 h-3" />
                {news.views}
              </span>
            </div>
            <div className="flex items-center gap-1 text-pink-500">
              <FiHeart className="w-3 h-3" />
              {news.likes}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PaginationButton = ({ children, active }) => (
  <button
    className={`w-9 h-9 rounded-xl font-semibold text-sm transition-all ${
      active
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
        : 'bg-white text-gray-700 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

export default News;
