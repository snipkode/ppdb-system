import { FiCheckCircle, FiFileText, FiDollarSign, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

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

  const timeline = [
    { event: 'Pendaftaran Gelombang 1', date: '1 Mei - 30 Juni 2024' },
    { event: 'Pendaftaran Gelombang 2', date: '1 Juli - 15 Juli 2024' },
    { event: 'Ujian Seleksi', date: '20 Juli 2024' },
    { event: 'Pengumuman', date: '25 Juli 2024' },
    { event: 'Daftar Ulang', date: '26 Juli - 5 Agustus 2024' },
    { event: 'MOS', date: '10 - 12 Juli 2024' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          PPDB Online 2024/2025
        </h1>
        <p className="text-lg text-primary-100 mb-6">
          Pendaftaran Peserta Didik Baru SMK Nusantara - Sekolah Pusat Keunggulan
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm text-primary-100">Kuota Tersedia</p>
            <p className="text-2xl font-bold">500 Siswa</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm text-primary-100">Program Keahlian</p>
            <p className="text-2xl font-bold">5 Jurusan</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-sm text-primary-100">Akreditasi</p>
            <p className="text-2xl font-bold">A (Unggul)</p>
          </div>
        </div>
      </div>

      {/* Syarat Pendaftaran */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FiFileText className="w-6 h-6 text-primary-600" />
          Syarat Pendaftaran
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {syarat.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FiCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alur Pendaftaran */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FiArrowRight className="w-6 h-6 text-primary-600" />
          Alur Pendaftaran
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alur.map((item) => (
            <div
              key={item.step}
              className="relative bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-5 border border-primary-200"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Biaya Pendidikan */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FiDollarSign className="w-6 h-6 text-primary-600" />
          Biaya Pendidikan
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Keterangan</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Biaya</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-700">Biaya Pendaftaran</td>
                <td className="py-3 px-4 text-right font-semibold text-primary-600">{biaya.pendaftaran}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-700">Biaya Daftar Ulang</td>
                <td className="py-3 px-4 text-right font-semibold text-primary-600">{biaya.daftar_ulang}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-gray-700">Seragam Sekolah</td>
                <td className="py-3 px-4 text-right font-semibold text-primary-600">{biaya.seragam}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">Buku & LKS</td>
                <td className="py-3 px-4 text-right font-semibold text-primary-600">{biaya.buku}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Catatan:</strong> Tersedia beasiswa untuk siswa berprestasi dan kurang mampu. 
            Informasi lebih lanjut hubungi panitia PPDB.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FiCalendar className="w-6 h-6 text-primary-600" />
          Jadwal Kegiatan
        </h2>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiClock className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.event}</h3>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Sudah Siap Mendaftar?</h2>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Segera daftarkan diri Anda dan menjadi bagian dari SMK Nusantara. 
          Kuota terbatas, jangan sampai kehabisan!
        </p>
        <a
          href="#register"
          className="inline-flex items-center gap-2 bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <FiCheckCircle className="w-5 h-5" />
          Daftar Sekarang
        </a>
      </div>
    </div>
  );
};

export default PPDBInfo;
