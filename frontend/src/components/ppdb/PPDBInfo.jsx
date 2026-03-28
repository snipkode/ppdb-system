import { FiCheckCircle, FiFileText, FiDollarSign, FiCalendar, FiClock, FiArrowRight, FiBookOpen, FiUsers, FiAward } from 'react-icons/fi';

const PPDBInfo = () => {
  const syarat = [
    'Fotokopi Ijazah SMP/MTs atau surat keterangan lulus',
    'Fotokopi Kartu Keluarga (KK)',
    'Fotokopi Akta Kelahiran',
    'Fotokopi KTP Orang Tua/Wali',
    'Fotokopi Kartu KIP/KKS (jika ada)',
    'Pas foto 3x4 sebanyak 2 lembar',
    'Fotokopi rapor semester 1-5',
    'Surat keterangan berkelakuan baik dari sekolah',
  ];

  const alur = [
    { step: 1, title: 'Isi Formulir', desc: 'Lengkapi data pendaftaran online' },
    { step: 2, title: 'Verifikasi Berkas', desc: 'Admin memverifikasi berkas uploaded' },
    { step: 3, title: 'Pembayaran', desc: 'Lakukan pembayaran biaya pendaftaran' },
    { step: 4, title: 'Ujian Seleksi', desc: 'Ikuti ujian seleksi sesuai jadwal' },
    { step: 5, title: 'Pengumuman', desc: 'Cek hasil seleksi' },
    { step: 6, title: 'Daftar Ulang', desc: 'Lakukan daftar ulang jika diterima' },
  ];

  const biaya = {
    pendaftaran: 'Rp 150.000',
    daftar_ulang: 'Rp 2.000.000',
    seragam: 'Rp 1.500.000',
    buku: 'Rp 800.000',
  };

  return (
    <div className="space-y-8">
      {/* Hero Section - Modern Glassmorphism */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
              <FiAward className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">PPDB Online 2024/2025</h1>
              <p className="text-white/80 text-sm">Sekolah Pusat Keunggulan</p>
            </div>
          </div>
          
          <p className="text-lg text-white/90 mb-8 max-w-3xl">
            Pendaftaran Peserta Didik Baru SMK Nusantara - Mewujudkan generasi unggul, kompeten, dan berkarakter
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoStat icon={<FiUsers />} number="500" label="Kuota Siswa" />
            <InfoStat icon={<FiBookOpen />} number="8" label="Program Keahlian" />
            <InfoStat icon={<FiAward />} number="A" label="Akreditasi Unggul" />
            <InfoStat icon={<FiClock />} number="2" label="Gelombang" />
          </div>
        </div>
      </div>

      {/* Syarat Pendaftaran - Compact Cards */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            <FiFileText className="w-5 h-5" />
          </div>
          Syarat Pendaftaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {syarat.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300">
              <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alur Pendaftaran - Timeline Style */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <FiArrowRight className="w-5 h-5" />
          </div>
          Alur Pendaftaran
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alur.map((item) => (
            <div
              key={item.step}
              className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg">
                {item.step}
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Biaya Pendidikan - Modern Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
            <FiDollarSign className="w-5 h-5" />
          </div>
          Biaya Pendidikan
        </h2>
        <div className="overflow-x-auto">
          <div className="space-y-3">
            <BiayaRow label="Biaya Pendaftaran" amount={biaya.pendaftaran} color="from-blue-500 to-cyan-500" />
            <BiayaRow label="Biaya Daftar Ulang" amount={biaya.daftar_ulang} color="from-purple-500 to-pink-500" />
            <BiayaRow label="Seragam Sekolah" amount={biaya.seragam} color="from-orange-500 to-red-500" />
            <BiayaRow label="Buku & LKS" amount={biaya.buku} color="from-green-500 to-emerald-500" />
          </div>
        </div>
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiAward className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-800">
                <strong className="font-semibold">Beasiswa Tersedia!</strong> Kami menyediakan beasiswa untuk siswa berprestasi dan kurang mampu. 
                Informasi lebih lanjut hubungi panitia PPDB atau kunjungi bagian kesiswaan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Jadwal - Vertical List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white">
            <FiCalendar className="w-5 h-5" />
          </div>
          Jadwal Kegiatan
        </h2>
        <div className="space-y-3">
          <TimelineItem
            event="Pendaftaran Gelombang 1"
            date="1 Mei - 30 Juni 2024"
            icon={<FiCalendar />}
            color="from-blue-500 to-cyan-500"
          />
          <TimelineItem
            event="Pendaftaran Gelombang 2"
            date="1 Juli - 15 Juli 2024"
            icon={<FiCalendar />}
            color="from-purple-500 to-pink-500"
          />
          <TimelineItem
            event="Ujian Seleksi"
            date="20 Juli 2024"
            icon={<FiAward />}
            color="from-orange-500 to-red-500"
          />
          <TimelineItem
            event="Pengumuman Hasil"
            date="25 Juli 2024"
            icon={<FiCheckCircle />}
            color="from-green-500 to-emerald-500"
          />
          <TimelineItem
            event="Daftar Ulang"
            date="26 Juli - 5 Agustus 2024"
            icon={<FiCheckCircle />}
            color="from-pink-500 to-rose-500"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 md:p-10 text-center shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sudah Siap Mendaftar?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Segera daftarkan diri Anda dan menjadi bagian dari SMK Nusantara. Kuota terbatas, jangan sampai kehabisan!
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-3 bg-white text-green-600 font-bold px-10 py-4 rounded-2xl hover:shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <FiCheckCircle className="w-5 h-5" />
            Daftar Sekarang
          </a>
        </div>
      </div>
    </div>
  );
};

const InfoStat = ({ icon, number, label }) => (
  <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 hover:bg-white/25 transition-all duration-300 hover:scale-105">
    <div className="text-white/80 mb-2 flex justify-center">{icon}</div>
    <div className="text-2xl font-bold text-white">{number}</div>
    <div className="text-xs text-white/70">{label}</div>
  </div>
);

const BiayaRow = ({ label, amount, color }) => (
  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
    <span className="font-medium text-gray-700">{label}</span>
    <span className={`font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{amount}</span>
  </div>
);

const TimelineItem = ({ event, date, icon, color }) => (
  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-slate-800">{event}</h3>
      <p className="text-sm text-gray-600">{date}</p>
    </div>
    <FiArrowRight className="w-5 h-5 text-gray-400" />
  </div>
);

export default PPDBInfo;
