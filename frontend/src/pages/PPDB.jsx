import { Link } from 'react-router-dom';
import { 
  FiChevronRight, FiCheckCircle, FiClock, FiFileText, FiDollarSign, 
  FiCalendar, FiUsers, FiAward, FiTrendingUp, FiBookOpen, FiStar 
} from 'react-icons/fi';

const PPDB = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section - Modern Glassmorphism */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-mesh-1"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-mesh-2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-mesh-3"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full">
            <defs>
              <pattern id="ppdbGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ppdbGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full mb-6 animate-fade-in-up shadow-lg shadow-purple-500/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold tracking-wide">PPDB 2024/2025 TELAH DIBUKA</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Pendaftaran Peserta Didik Baru
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              SMK Nusantara - <span className="font-semibold">Mewujudkan Masa Depan Gemilang</span>
            </p>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <HeroStat icon={<FiUsers />} number="500+" label="Kuota" />
              <HeroStat icon={<FiBookOpen />} number="8" label="Jurusan" />
              <HeroStat icon={<FiAward />} number="A" label="Akreditasi" />
              <HeroStat icon={<FiTrendingUp />} number="95%" label="Lulusan Bekerja" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-3 bg-white text-purple-600 font-bold px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <span>Daftar Sekarang</span>
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/status"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white font-semibold px-8 py-4 rounded-2xl border-2 border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FiFileText className="w-5 h-5" />
                <span>Cek Status</span>
              </Link>
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

      {/* Timeline Section - Compact Modern */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full mb-4 shadow-lg shadow-blue-500/30">
              TIMELINE PPDB
            </span>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Alur Pendaftaran
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              5 langkah mudah untuk menjadi bagian dari SMK Nusantara
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4">
              <TimelineStep
                step="01"
                title="Registrasi"
                desc="Isi formulir online"
                icon={<FiUsers />}
                color="from-blue-500 to-cyan-500"
              />
              <TimelineStep
                step="02"
                title="Pembayaran"
                desc="Bayar biaya pendaftaran"
                icon={<FiDollarSign />}
                color="from-green-500 to-emerald-500"
              />
              <TimelineStep
                step="03"
                title="Verifikasi"
                desc="Verifikasi berkas"
                icon={<FiCheckCircle />}
                color="from-purple-500 to-pink-500"
              />
              <TimelineStep
                step="04"
                title="Ujian"
                desc="Ikuti seleksi"
                icon={<FiAward />}
                color="from-orange-500 to-red-500"
              />
              <TimelineStep
                step="05"
                title="Pengumuman"
                desc="Cek hasil seleksi"
                icon={<FiStar />}
                color="from-pink-500 to-rose-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards - Glassmorphism */}
      <section className="py-12 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
              Informasi Lengkap
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <InfoCard
              icon={<FiCalendar className="w-8 h-8" />}
              title="Jadwal Pendaftaran"
              items={[
                { label: 'Gelombang 1', value: 'Jan - Mar 2024' },
                { label: 'Gelombang 2', value: 'Apr - Jun 2024' },
                { label: 'Ujian Seleksi', value: 'Juli 2024' },
                { label: 'Pengumuman', value: 'Juli 2024' }
              ]}
              gradient="from-blue-500 to-cyan-500"
            />
            <InfoCard
              icon={<FiFileText className="w-8 h-8" />}
              title="Berkas Persyaratan"
              items={[
                { label: 'KK', value: 'Fotokopi' },
                { label: 'Akta Kelahiran', value: 'Fotokopi' },
                { label: 'Ijazah/SKL', value: 'Fotokopi' },
                { label: 'Pas Foto', value: '3x4 (4 lembar)' }
              ]}
              gradient="from-purple-500 to-pink-500"
            />
            <InfoCard
              icon={<FiDollarSign className="w-8 h-8" />}
              title="Biaya Pendidikan"
              items={[
                { label: 'Pendaftaran', value: 'Rp 150.000' },
                { label: 'Uang Pangkal', value: 'Gratis' },
                { label: 'SPP Bulanan', value: 'Rp 150.000' },
                { label: 'Beasiswa', value: 'Tersedia' }
              ]}
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                Jadwal Kegiatan
              </h2>
              <p className="text-gray-600">Timeline lengkap proses PPDB</p>
            </div>

            <div className="space-y-4">
              <TimelineRow
                event="Pendaftaran Gelombang 1"
                date="1 Mei - 30 Juni 2024"
                icon={<FiCalendar />}
                color="from-blue-500 to-cyan-500"
              />
              <TimelineRow
                event="Pendaftaran Gelombang 2"
                date="1 Juli - 15 Juli 2024"
                icon={<FiCalendar />}
                color="from-purple-500 to-pink-500"
              />
              <TimelineRow
                event="Ujian Seleksi"
                date="20 Juli 2024"
                icon={<FiAward />}
                color="from-orange-500 to-red-500"
              />
              <TimelineRow
                event="Pengumuman Hasil"
                date="25 Juli 2024"
                icon={<FiStar />}
                color="from-green-500 to-emerald-500"
              />
              <TimelineRow
                event="Daftar Ulang"
                date="26 Juli - 5 Agustus 2024"
                icon={<FiCheckCircle />}
                color="from-pink-500 to-rose-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Statistik PPDB Tahun Lalu</h3>
            <p className="text-white/80">Bergabunglah dengan ratusan siswa lainnya</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatItem number="850+" label="Pendaftar" />
            <StatItem number="480" label="Diterima" />
            <StatItem number="8" label="Jurusan" />
            <StatItem number="100%" label="Kuota Tersedia" />
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
              Program Keahlian
            </h2>
            <p className="text-gray-600">Pilih jurusan sesuai minat dan bakatmu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <ProgramCard name="RPL" full="Rekayasa Perangkat Lunak" emoji="💻" color="from-blue-500 to-cyan-500" />
            <ProgramCard name="TKJ" full="Teknik Komputer Jaringan" emoji="🖥️" color="from-purple-500 to-pink-500" />
            <ProgramCard name="AKL" full="Akuntansi Keuangan" emoji="📊" color="from-green-500 to-emerald-500" />
            <ProgramCard name="OTKP" full="Otomatisasi Tata Kelola" emoji="📋" color="from-orange-500 to-red-500" />
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
            Siap Bergabung Bersama Kami?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk menjadi bagian dari SMK Nusantara
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
              <FiClock className="w-5 h-5" />
              <span>Lihat Jadwal Lengkap</span>
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

const TimelineStep = ({ step, title, desc, icon, color }) => (
  <div className="relative group">
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
      <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
        {icon}
      </div>
      <div className="text-xs font-bold text-gray-400 mb-1">Langkah {step}</div>
      <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{desc}</p>
    </div>
  </div>
);

const InfoCard = ({ icon, title, items, gradient }) => (
  <div className="group relative p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{item.label}</span>
          <span className="font-semibold text-slate-800">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TimelineRow = ({ event, date, icon, color }) => (
  <div className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-slate-800">{event}</h3>
      <p className="text-sm text-gray-600">{date}</p>
    </div>
    <FiChevronRight className="w-5 h-5 text-gray-400" />
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

const ProgramCard = ({ name, full, emoji, color }) => (
  <div className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
    <div className="text-4xl mb-3">{emoji}</div>
    <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>
      {name}
    </div>
    <div className="text-xs text-gray-600">{full}</div>
  </div>
);

export default PPDB;
