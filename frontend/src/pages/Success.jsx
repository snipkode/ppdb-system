import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiCheck, FiDownload, FiCopy, FiHome } from 'react-icons/fi';

const Success = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  
  const { studentId, nomorPendaftaran } = location.state || {};
  const nomor = nomorPendaftaran || studentId || 'PPDB-2024-XXXX';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(nomor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <FiCheck className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Pendaftaran Berhasil!
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Terima kasih telah mendaftar. Simpan nomor pendaftaran Anda untuk melakukan cek status.
          </p>

          {/* Nomor Pendaftaran */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 mb-8 text-white">
            <p className="text-sm opacity-90 mb-2">Nomor Pendaftaran Anda</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-3xl md:text-4xl font-bold tracking-wider">
                {nomor}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                title="Copy nomor pendaftaran"
              >
                {copied ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <FiCopy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs mt-2 text-green-200">✓ Berhasil disalin!</p>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Langkah Selanjutnya
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Simpan nomor pendaftaran Anda</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>Tunggu informasi verifikasi berkas melalui SMS/Email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>Cek status pendaftaran secara berkala di menu "Cek Status"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </span>
                <span>Ikuti jadwal ujian seleksi jika dinyatakan lolos verifikasi</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 hover:shadow-lg"
            >
              <FiDownload />
              <span>Cetak Bukti</span>
            </button>
            
            <Link
              to="/status"
              className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200"
            >
              <FiCheck />
              <span>Cek Status</span>
            </Link>
          </div>

          {/* Home Link */}
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              <FiHome />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-800">
            <strong>Info:</strong> Untuk bantuan lebih lanjut, hubungi admin PPDB di{' '}
            <a href="tel:02112345678" className="font-semibold hover:underline">
              (021) 1234-5678
            </a>{' '}
            atau{' '}
            <a href="mailto:ppdb@smknusantara.sch.id" className="font-semibold hover:underline">
              ppdb@smknusantara.sch.id
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
