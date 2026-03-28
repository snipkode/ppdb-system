import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiShare2, FiHeart, FiMessageCircle, FiEye, FiBookmark, FiPrinter, FiMail, FiAward, FiUsers, FiBookOpen, FiStar, FiSend, FiThumbsUp, FiMoreVertical, FiEdit2, FiTrash2, FiChevronRight } from 'react-icons/fi';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Ahmad Rizki', role: 'Siswa', avatar: 'AR', content: 'Prestasi yang membanggakan! Selamat untuk kakak Rizky, semoga sukses di kompetisi ASEAN.', date: '2 jam lalu', likes: 12 },
    { id: 2, author: 'Siti Nurhaliza', role: 'Guru', avatar: 'SN', content: 'Alhamdulillah, semoga menjadi inspirasi bagi siswa lainnya untuk berprestasi.', date: '3 jam lalu', likes: 8 },
    { id: 3, author: 'Budi Santoso', role: 'Alumni', avatar: 'BS', content: 'Keren! Dulu saya juga ikut LKS, sekarang giliran adik-adik yang melanjutkan.', date: '5 jam lalu', likes: 5 },
    { id: 4, author: 'Dewi Lestari', role: 'Orang Tua', avatar: 'DL', content: 'Terima kasih kepada guru-guru yang telah membimbing dengan sabar. Semoga sekolah ini semakin berjaya!', date: '1 hari lalu', likes: 15 }
  ]);

  const news = {
    id: parseInt(id),
    title: 'SMK Nusantara Raih Juara 1 Lomba Kompetensi Siswa Nasional 2024',
    excerpt: 'Siswa SMK Nusantara berhasil meraih medali emas dalam Lomba Kompetensi Siswa (LKS) tingkat nasional.',
    content: `
      <p class="lead">Jakarta - Siswa SMK Nusantara kembali menorehkan prestasi membanggakan di kancah nasional. Dalam Lomba Kompetensi Siswa (LKS) Tingkat Nasional 2024 yang diselenggarakan di Jakarta Convention Center, siswa kami berhasil meraih medali emas pada kategori Lomba Kompetensi Perangkat Lunak.</p>
      
      <p>Kompetisi yang diikuti oleh lebih dari 500 peserta dari seluruh Indonesia ini menguji kemampuan siswa dalam berbagai bidang kompetensi, termasuk pengembangan perangkat lunak, jaringan komputer, desain grafis, dan robotika.</p>
      
      <h3>Persiapan Matang</h3>
      <p>Menurut pembina lomba, Bapak Ahmad Suryadi, persiapan untuk kompetisi ini telah dilakukan sejak 6 bulan yang lalu. "Kami melakukan pelatihan intensif setiap hari setelah jam sekolah, termasuk simulasi kompetisi dan pendalaman materi," ujarnya.</p>
      
      <p>Siswa berprestasi ini, Rizky Pratama dari kelas XII RPL 1, mengungkapkan rasa syukurnya atas pencapaian ini. "Saya tidak menyangka bisa meraih juara 1. Ini berkat dukungan dari guru pembina, orang tua, dan teman-teman," katanya dengan penuh haru.</p>
      
      <h3>Dukungan Sekolah</h3>
      <p>Kepala Sekolah SMK Nusantara, Dr. Siti Aminah, M.Pd., memberikan apresiasi setinggi-tingginya atas prestasi ini. "Ini adalah bukti dari komitmen sekolah dalam menyediakan pendidikan berkualitas dan fasilitas yang memadai untuk mengembangkan potensi siswa," tuturnya.</p>
      
      <h3>Rencana Kedepan</h3>
      <p>Ke depan, Rizky akan mewakili Indonesia dalam kompetisi ASEAN Skills Competition yang akan diselenggarakan di Singapura bulan depan. "Saya akan terus berlatih dan berusaha yang terbaik untuk mengharumkan nama Indonesia," pungkasnya.</p>
    `,
    image: '🏆',
    category: 'achievement',
    author: 'Admin',
    authorRole: 'Administrator',
    date: '25 Maret 2024',
    views: 1250,
    likes: 342,
    comments: 28,
    tags: ['LKS', 'Prestasi', 'Nasional', 'RPL', 'Kompetisi']
  };

  const relatedNews = [
    { id: 4, title: 'Tim Robotik SMK Nusantara Lolos ke Kompetisi Internasional', image: '🤖', category: 'achievement', author: 'Pembina Robotik', date: '20 Maret 2024', views: 1567 },
    { id: 9, title: 'Siswa SMK Nusantara Ciptakan Aplikasi E-Learning', image: '💻', category: 'achievement', author: 'Produktif RPL', date: '18 Februari 2024', views: 1890 },
    { id: 5, title: 'Workshop Persiapan LKS 2024', image: '📚', category: 'academic', author: 'Koordinator LKS', date: '10 Februari 2024', views: 945 },
    { id: 3, title: 'Kunjungan Industri ke PT. Telkom Indonesia', image: '🏢', category: 'academic', author: 'Humas', date: '15 Maret 2024', views: 890 }
  ];

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

  // Load favorite status from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('newsFavorites') || '[]');
    setIsFavorite(favorites.includes(news.id));
  }, [id]);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news.title, text: news.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin!');
    }
  };

  const handleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('newsFavorites') || '[]');
    
    if (newFavoriteState) {
      if (!favorites.includes(news.id)) {
        favorites.push(news.id);
        localStorage.setItem('newsFavorites', JSON.stringify(favorites));
      }
      showNotification('❤️ Berita ditambahkan ke favorit!');
    } else {
      const updated = favorites.filter(id => id !== news.id);
      localStorage.setItem('newsFavorites', JSON.stringify(updated));
      showNotification('Berita dihapus dari favorit');
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(news.title);
    const body = encodeURIComponent(
      `${news.title}\n\n${news.excerpt}\n\nBaca selengkapnya di: ${window.location.href}\n\n--\nDikirim dari PPDB Online SMK Nusantara`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${news.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            h1 { font-size: 24px; color: #1e40af; margin-bottom: 10px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            .content { line-height: 1.8; }
            .content p { margin-bottom: 15px; }
            .content h3 { color: #333; margin-top: 20px; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${news.title}</h1>
          <div class="meta">
            <p><strong>Penulis:</strong> ${news.author} | <strong>Tanggal:</strong> ${news.date} | <strong>Dilihat:</strong> ${news.views} kali</p>
          </div>
          <div class="content">
            ${news.content}
          </div>
          <div class="no-print" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #666;">Dicetak dari PPDB Online SMK Nusantara</p>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: 'Anda',
      role: 'User',
      avatar: 'AN',
      content: commentText,
      date: 'Baru saja',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Hapus komentar ini?')) {
      setComments(comments.filter(c => c.id !== commentId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Compact Hero Header */}
      <section className={`relative bg-gradient-to-r ${categoryColors[news.category]} text-white py-6 overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-5 left-5 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-5 right-5 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back & Category */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-white/90 hover:text-white transition-colors text-sm">
              <FiArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Kembali</span>
            </button>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold rounded-full">
              {categoryLabels[news.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-3xl font-bold mb-3 leading-snug">{news.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/90">
            <span className="flex items-center gap-1"><FiCalendar className="w-3.5 h-3.5" />{news.date}</span>
            <span className="flex items-center gap-1"><FiUser className="w-3.5 h-3.5" />{news.author}</span>
            <span className="flex items-center gap-1"><FiEye className="w-3.5 h-3.5" />{news.views}</span>
          </div>
        </div>
      </section>

      {/* Main Content - Compact Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Article */}
          <div className="lg:col-span-2 space-y-4">
            {/* Featured Image */}
            <div className={`h-40 md:h-48 bg-gradient-to-br ${categoryColors[news.category]} rounded-2xl flex items-center justify-center shadow-lg`}>
              <span className="text-7xl">{news.image}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ActionButton icon={<FiShare2 className="w-4 h-4" />} label="Bagikan" onClick={handleShare} />
              <ActionButton 
                icon={<FiBookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />} 
                label={isFavorite ? 'Disimpan' : 'Simpan'} 
                onClick={handleFavorite}
                active={isFavorite}
              />
              <ActionButton icon={<FiPrinter className="w-4 h-4" />} label="Cetak" onClick={handlePrint} />
              <ActionButton icon={<FiMail className="w-4 h-4" />} label="Email" onClick={handleEmail} />
            </div>

            {/* Content Card */}
            <article className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: news.content }} 
                  className="[&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-3 
                           [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-4 [&>h3]:mb-2
                           [&>.lead]:text-base [&>.lead]:font-medium [&>.lead]:text-slate-700 [&>.lead]:mb-3"
                />
              </div>
            </article>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Reactions */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors">
                  <FiHeart className="w-4 h-4" /> <span className="text-sm font-semibold">{news.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                  <FiMessageCircle className="w-4 h-4" /> <span className="text-sm font-semibold">{comments.length}</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FiMessageCircle className="w-5 h-5 text-purple-600" />
                  Komentar <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">{comments.length}</span>
                </h3>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-5">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    AN
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tulis komentar Anda..."
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none text-sm"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiSend className="w-4 h-4" /> Kirim
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={() => handleLikeComment(comment.id)}
                    onDelete={() => handleDeleteComment(comment.id)}
                  />
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">💬</div>
                  <p className="text-gray-500 text-sm">Belum ada komentar. Jadilah yang pertama!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Author */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {news.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{news.author}</h3>
                  <p className="text-xs text-gray-500">{news.authorRole}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Penulis resmi dari SMK Nusantara. Membagikan informasi terbaru seputar kegiatan dan prestasi sekolah.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-4 text-white">
              <h3 className="font-bold text-sm mb-3">Statistik Sekolah</h3>
              <div className="grid grid-cols-2 gap-3">
                <StatBox icon={<FiUsers className="w-4 h-4" />} value="1.2K" label="Siswa" />
                <StatBox icon={<FiAward className="w-4 h-4" />} value="100+" label="Prestasi" />
                <StatBox icon={<FiBookOpen className="w-4 h-4" />} value="8" label="Jurusan" />
                <StatBox icon={<FiStar className="w-4 h-4" />} value="15+" label="Tahun" />
              </div>
            </div>

            {/* Related News */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <h3 className="font-bold text-slate-800 text-sm">Berita Terkait</h3>
                </div>
                <Link to="/news" className="text-xs text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                  Lihat Semua →
                </Link>
              </div>

              <div className="space-y-2">
                {relatedNews.map((item) => (
                  <Link
                    to={`/news/${item.id}`}
                    key={item.id}
                    className="block group cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Navigasi ke:', `/news/${item.id}`);
                      navigate(`/news/${item.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="flex gap-3 items-center p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-300 hover:shadow-md border border-transparent hover:border-slate-200">
                      <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[item.category]} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`}>
                        <span className="text-3xl">{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">{item.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiEye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>

              <Link to="/news" className="block w-full mt-3 text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105">
                Lihat Semua Berita
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm">✓</div>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ActionButton = ({ icon, label, onClick, active }) => (
  <button 
    onClick={onClick} 
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all shadow-md text-xs font-medium ${
      active 
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
        : 'bg-white text-slate-700 hover:bg-slate-50'
    }`}
  >
    {icon} <span className="hidden sm:inline">{label}</span>
  </button>
);

const StatBox = ({ icon, value, label }) => (
  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-2">
    <div className="flex justify-center mb-1">{icon}</div>
    <div className="text-lg font-bold">{value}</div>
    <div className="text-xs opacity-80">{label}</div>
  </div>
);

const CommentItem = ({ comment, onLike, onDelete }) => {
  const roleColors = {
    Siswa: 'from-blue-500 to-cyan-500',
    Guru: 'from-purple-500 to-pink-500',
    Alumni: 'from-orange-500 to-red-500',
    'Orang Tua': 'from-green-500 to-emerald-500',
    User: 'from-slate-500 to-gray-500'
  };

  return (
    <div className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleColors[comment.role] || roleColors.User} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`}>
        {comment.avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 text-sm">{comment.author}</span>
            <span className={`px-2 py-0.5 bg-gradient-to-r ${roleColors[comment.role] || roleColors.User} text-white text-xs font-semibold rounded-full`}>
              {comment.role}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{comment.date}</span>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-gray-700 text-sm leading-relaxed mb-2">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLike}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-pink-600 transition-colors group/btn"
          >
            <FiThumbsUp className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span className="font-medium">{comment.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors">
            <FiMessageCircle className="w-3.5 h-3.5" />
            <span className="font-medium">Balas</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span className="font-medium">Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
