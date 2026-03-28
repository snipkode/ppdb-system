import { Link } from 'react-router-dom';
import {
  FiChevronRight, FiCheckCircle, FiClock, FiFileText, FiDollarSign,
  FiCalendar, FiUsers, FiAward, FiTrendingUp, FiBookOpen, FiStar,
  FiUpload, FiPrinter, FiMail, FiCreditCard, FiSmartphone, FiRefreshCw
} from 'react-icons/fi';

const PPDB = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section - Ultra Compact */}
      <section className="relative min-h-[35vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Animated Background - Minimal */}
        <div className="absolute inset-0">
          <div className="absolute top-5 left-5 w-24 h-24 bg-white/10 rounded-full blur-xl animate-mesh-1"></div>
          <div className="absolute bottom-5 right-5 w-32 h-32 bg-yellow-300/10 rounded-full blur-xl animate-mesh-2"></div>
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

        <div className="container mx-auto px-3 py-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            {/* Badge - Minimal */}
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full mb-2 animate-fade-in-up shadow-lg shadow-purple-500/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wide">PPDB 2024/2025 DIBUKA</span>
            </div>

            {/* Main Title - Compact */}
            <h1 className="text-xl md:text-3xl lg:text-4xl font-black mb-2 leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Pendaftaran Peserta Didik Baru
            </h1>

            <p className="text-sm md:text-base text-white/90 mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              SMK Nusantara - <span className="font-semibold">Mewujudkan Masa Depan Gemilang</span>
            </p>

            {/* Stats Preview - Ultra Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <HeroStat icon={<FiUsers />} number="500+" label="Kuota" />
              <HeroStat icon={<FiBookOpen />} number="8" label="Jurusan" />
              <HeroStat icon={<FiAward />} number="A" label="Akreditasi" />
              <HeroStat icon={<FiTrendingUp />} number="95%" label="Lulusan Bekerja" />
            </div>

            {/* CTA Buttons - Minimal */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-1.5 bg-white text-purple-600 font-bold px-4 py-2.5 rounded-lg hover:shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 active:scale-95 text-xs"
              >
                <span>Daftar</span>
                <FiChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/status"
                className="inline-flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-xl text-white font-semibold px-4 py-2.5 rounded-lg border-2 border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 text-xs"
              >
                <FiFileText className="w-3.5 h-3.5" />
                <span>Cek Status</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider - Minimal */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-4 md:h-6">
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

      {/* Timeline Section - Compact Design */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg shadow-blue-500/30">
              PROSES SELEKSI
            </span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
              Alur Pendaftaran
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              6 tahap seleksi untuk menjadi bagian dari SMK Nusantara
            </p>
          </div>

          {/* Horizontal Timeline - Compact */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full -translate-y-1/2"></div>

              <div className="grid md:grid-cols-6 gap-3">
                <TimelineStepVertical
                  step="01"
                  title="Registrasi Online"
                  desc="Isi formulir & upload berkas"
                  icon={<FiUsers />}
                  color="from-blue-500 to-cyan-500"
                  delay="0"
                />
                <TimelineStepVertical
                  step="02"
                  title="Verifikasi Berkas"
                  desc="Admin memverifikasi data"
                  icon={<FiCheckCircle />}
                  color="from-indigo-500 to-blue-500"
                  delay="100"
                />
                <TimelineStepVertical
                  step="03"
                  title="Pembayaran"
                  desc="Bayar biaya pendaftaran"
                  icon={<FiDollarSign />}
                  color="from-purple-500 to-indigo-500"
                  delay="200"
                />
                <TimelineStepVertical
                  step="04"
                  title="Ujian Seleksi"
                  desc="Tes akademik & psikotes"
                  icon={<FiAward />}
                  color="from-pink-500 to-purple-500"
                  delay="300"
                />
                <TimelineStepVertical
                  step="05"
                  title="Pengumuman"
                  desc="Cek hasil seleksi"
                  icon={<FiStar />}
                  color="from-orange-500 to-pink-500"
                  delay="400"
                />
                <TimelineStepVertical
                  step="06"
                  title="Daftar Ulang"
                  desc="Lengkapi administrasi"
                  icon={<FiFileText />}
                  color="from-green-500 to-emerald-500"
                  delay="500"
                />
              </div>
            </div>
          </div>

          {/* Detailed Steps - Compact */}
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <DetailStep
              number="1"
              title="Isi Formulir Online"
              description="Lengkapi data diri, data orang tua, dan pilih jurusan yang diinginkan"
              icon={<FiUsers />}
              color="from-blue-500 to-cyan-500"
            />
            <DetailStep
              number="2"
              title="Upload Dokumen"
              description="Scan dan upload KK, Akta Kelahiran, Ijazah/SKL, Nilai Rapor, dan Pas Foto"
              icon={<FiUpload />}
              color="from-purple-500 to-pink-500"
            />
            <DetailStep
              number="3"
              title="Pembayaran Online"
              description="Transfer biaya pendaftaran dan upload bukti"
              icon={<FiDollarSign />}
              color="from-green-500 to-emerald-500"
            />
            <DetailStep
              number="4"
              title="Cetak Kartu Ujian"
              description="Download dan cetak kartu ujian seleksi"
              icon={<FiPrinter />}
              color="from-orange-500 to-red-500"
            />
            <DetailStep
              number="5"
              title="Ikuti Ujian Seleksi"
              description="Datang ke lokasi ujian dengan membawa kartu ujian"
              icon={<FiAward />}
              color="from-indigo-500 to-purple-500"
            />
            <DetailStep
              number="6"
              title="Lihat Pengumuman"
              description="Cek hasil seleksi melalui website atau SMS"
              icon={<FiMail />}
              color="from-pink-500 to-rose-500"
            />
          </div>
        </div>
      </section>

      {/* Biaya Pendidikan - Compact Design */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg shadow-green-500/30">
              INVESTASI PENDIDIKAN
            </span>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-2">
              Biaya Pendidikan
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Transparan dan terjangkau dengan berbagai kemudahan pembayaran
            </p>
          </div>

          {/* Main Pricing Cards - Compact */}
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
            <PricingCard
              title="Biaya Pendaftaran"
              price="150.000"
              currency="Rp"
              period="sekali bayar"
              description="Termasuk biaya administrasi dan ujian seleksi"
              features={[
                'Formulir pendaftaran online',
                'Biaya administrasi',
                'Ujian seleksi',
                'Seragam tes'
              ]}
              gradient="from-blue-500 to-cyan-500"
              popular={false}
            />
            <PricingCard
              title="Uang Pangkal"
              price="0"
              currency="Rp"
              period="GRATIS"
              description="Kebijakan sekolah untuk meringankan beban orang tua"
              features={[
                'Gratis uang pangkal',
                'Bebas uang gedung',
                'Tidak ada biaya tersembunyi',
                'Transparan'
              ]}
              gradient="from-green-500 to-emerald-500"
              popular={true}
            />
            <PricingCard
              title="SPP Bulanan"
              price="150.000"
              currency="Rp"
              period="per bulan"
              description="Biaya operasional pendidikan per bulan"
              features={[
                'Kegiatan belajar mengajar',
                'Fasilitas sekolah',
                'Asuransi siswa',
                'Kegiatan ekstrakurikuler'
              ]}
              gradient="from-purple-500 to-pink-500"
              popular={false}
            />
          </div>

          {/* Detailed Cost Breakdown - Compact */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-4 md:p-6 max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">Rincian Biaya Lainnya</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <CostItem
                category="Seragam Sekolah"
                items={[
                  { name: 'Seragam Putih Abu (2 stel)', price: '300.000' },
                  { name: 'Seragam Batik (2 stel)', price: '250.000' },
                  { name: 'Seragam Praktek (2 stel)', price: '200.000' },
                  { name: 'Topi & Dasi', price: '75.000' }
                ]}
                total="825.000"
                gradient="from-blue-500 to-cyan-500"
              />
              <CostItem
                category="Buku & LKS"
                items={[
                  { name: 'Buku Paket (1 semester)', price: '400.000' },
                  { name: 'Lembar Kerja Siswa', price: '200.000' },
                  { name: 'Alat Tulis & Praktikum', price: '200.000' }
                ]}
                total="800.000"
                gradient="from-purple-500 to-pink-500"
              />
            </div>

            {/* Total Summary - Compact */}
            <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 rounded-xl p-4 text-white">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white/70 text-xs mb-1">Total Estimasi Tahun Pertama</p>
                  <p className="text-2xl font-bold">Rp 2.575.000</p>
                  <p className="text-xs text-white/60 mt-0.5">(termasuk SPP 12 bulan)</p>
                </div>
                <div className="border-l border-r border-white/20">
                  <p className="text-white/70 text-xs mb-1">Per Semester</p>
                  <p className="text-2xl font-bold">Rp 1.287.500</p>
                  <p className="text-xs text-white/60 mt-0.5">(estimasi rata-rata)</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Per Bulan (rata-rata)</p>
                  <p className="text-2xl font-bold">Rp 214.583</p>
                  <p className="text-xs text-white/60 mt-0.5">(sudah termasuk SPP)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods - Compact */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <PaymentMethod
              icon={<FiCreditCard />}
              title="Transfer Bank"
              description="BCA, BRI, BNI, Mandiri"
              color="from-blue-500 to-cyan-500"
            />
            <PaymentMethod
              icon={<FiSmartphone />}
              title="E-Wallet"
              description="GoPay, OVO, Dana, ShopeePay"
              color="from-purple-500 to-pink-500"
            />
            <PaymentMethod
              icon={<FiRefreshCw />}
              title="Cicilan 0%"
              description="Kerjasama dengan multifinance"
              color="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Info Cards - Compact Glassmorphism */}
      <section className="py-8 md:py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-2">
              Informasi Lengkap
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <InfoCard
              icon={<FiCalendar className="w-6 h-6" />}
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
              icon={<FiFileText className="w-6 h-6" />}
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
              icon={<FiDollarSign className="w-6 h-6" />}
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

      {/* Detailed Timeline - Compact */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-1">
                Jadwal Kegiatan
              </h2>
              <p className="text-gray-600 text-sm">Timeline lengkap proses PPDB</p>
            </div>

            <div className="space-y-3">
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

      {/* Stats Section - Compact */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Statistik PPDB Tahun Lalu</h3>
            <p className="text-white/80 text-sm">Bergabunglah dengan ratusan siswa lainnya</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem number="850+" label="Pendaftar" />
            <StatItem number="480" label="Diterima" />
            <StatItem number="8" label="Jurusan" />
            <StatItem number="100%" label="Kuota Tersedia" />
          </div>
        </div>
      </section>

      {/* Programs Preview - Compact */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-1">
              Program Keahlian
            </h2>
            <p className="text-gray-600 text-sm">Pilih jurusan sesuai minat dan bakatmu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <ProgramCard name="RPL" full="Rekayasa Perangkat Lunak" emoji="💻" color="from-blue-500 to-cyan-500" />
            <ProgramCard name="TKJ" full="Teknik Komputer Jaringan" emoji="🖥️" color="from-purple-500 to-pink-500" />
            <ProgramCard name="AKL" full="Akuntansi Keuangan" emoji="📊" color="from-green-500 to-emerald-500" />
            <ProgramCard name="OTKP" full="Otomatisasi Tata Kelola" emoji="📋" color="from-orange-500 to-red-500" />
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Siap Bergabung Bersama Kami?
          </h2>
          <p className="text-white/90 text-base mb-8 max-w-2xl mx-auto">
            Jangan lewatkan kesempatan untuk menjadi bagian dari SMK Nusantara
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 bg-white text-purple-600 hover:bg-gray-50 font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95 text-sm"
            >
              <span>Daftar Sekarang</span>
              <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ppdb"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl text-white border-2 border-white/40 hover:bg-white/20 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
            >
              <FiClock className="w-4 h-4" />
              <span>Lihat Jadwal Lengkap</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const HeroStat = ({ icon, number, label }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-lg p-2 hover:bg-white/15 transition-all duration-300 hover:scale-105">
    <div className="text-white/80 mb-0.5 flex justify-center">{icon}</div>
    <div className="text-lg md:text-xl font-bold text-white">{number}</div>
    <div className="text-[10px] text-white/70">{label}</div>
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
  <div className="group relative p-5 md:p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}></div>
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-3">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center justify-between text-xs">
          <span className="text-gray-600">{item.label}</span>
          <span className="font-semibold text-slate-800">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TimelineRow = ({ event, date, icon, color }) => (
  <div className="flex items-center gap-3 p-3 md:p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">{event}</h3>
      <p className="text-xs text-gray-600">{date}</p>
    </div>
    <FiChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
  </div>
);

const StatItem = ({ number, label }) => (
  <div className="text-center group">
    <div className="text-3xl md:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
      {number}
    </div>
    <p className="text-white/80 text-xs md:text-sm mt-1 font-medium">{label}</p>
  </div>
);

const ProgramCard = ({ name, full, emoji, color }) => (
  <div className="group relative p-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
    <div className="text-3xl mb-2">{emoji}</div>
    <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-0.5`}>
      {name}
    </div>
    <div className="text-xs text-gray-600">{full}</div>
  </div>
);

// Vertical Timeline Step with Progress Line
const TimelineStepVertical = ({ step, title, desc, icon, color, delay }) => (
  <div className="relative group" style={{ animationDelay: `${delay}ms` }}>
    <div className="bg-white/90 backdrop-blur-xl rounded-xl p-3 md:p-4 border-2 border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center relative z-10">
      {/* Step Number Badge */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shadow-lg border-4 border-white`}>
        {step}
      </div>

      {/* Icon */}
      <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-2 md:mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
        {icon}
      </div>

      <h3 className="font-bold text-slate-800 text-xs md:text-sm mb-0.5">{title}</h3>
      <p className="text-xs text-gray-600 hidden md:block">{desc}</p>
    </div>

    {/* Mobile Description */}
    <p className="text-xs text-gray-600 text-center mt-1.5 md:hidden">{desc}</p>
  </div>
);

// Detailed Step Card
const DetailStep = ({ number, title, description, icon, color }) => (
  <div className="group relative p-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

    <div className="flex items-start gap-3 relative z-10">
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <div className={`text-lg ${color.includes('blue') ? 'text-blue-600' : color.includes('purple') ? 'text-purple-600' : color.includes('green') ? 'text-green-600' : color.includes('orange') ? 'text-orange-600' : 'text-pink-600'}`}>
            {icon}
          </div>
          <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        </div>
        <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

// University-Style Pricing Card
const PricingCard = ({ title, price, currency, period, description, features, gradient, popular }) => (
  <div className={`relative group p-5 md:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${popular ? 'border-green-500 scale-105' : 'border-white/60'}`}>
    {/* Popular Badge */}
    {popular && (
      <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-2xl">
        ⭐ POPULER
      </div>
    )}

    {/* Gradient Background on Hover */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

    {/* Header */}
    <div className="text-center mb-4 relative z-10">
      <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1.5">{title}</h3>
      <div className="flex items-baseline justify-center gap-1 mb-1">
        <span className="text-lg font-bold text-gray-600">{currency}</span>
        <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          {price}
        </span>
      </div>
      <p className="text-xs font-semibold text-green-600 mb-1">{period}</p>
      <p className="text-xs text-gray-600">{description}</p>
    </div>

    {/* Features */}
    <ul className="space-y-2 mb-4 relative z-10">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-1.5 text-xs">
          <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>

    {/* Button */}
    <button className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${popular ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30' : 'bg-gradient-to-r from-slate-800 to-blue-800 text-white hover:shadow-lg hover:shadow-blue-500/30'}`}>
      Pilih Paket
    </button>
  </div>
);

// Cost Breakdown Item
const CostItem = ({ category, items, total, gradient }) => (
  <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
    {/* Category Header */}
    <div className={`bg-gradient-to-r ${gradient} p-3`}>
      <h4 className="text-base font-bold text-white">{category}</h4>
    </div>

    {/* Items List */}
    <div className="p-3 space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between text-xs">
          <span className="text-gray-700">{item.name}</span>
          <span className="font-semibold text-slate-800">Rp {item.price}</span>
        </div>
      ))}

      {/* Total */}
      <div className="pt-2 mt-2 border-t-2 border-slate-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 text-sm">Total</span>
          <span className="text-lg font-black bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Rp {total}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Payment Method Card
const PaymentMethod = ({ icon, title, description, color }) => (
  <div className="group p-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
    <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
      {icon}
    </div>
    <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

export default PPDB;
