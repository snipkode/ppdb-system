import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiPrinter,
  FiHome,
  FiClock,
  FiAlertCircle,
} from 'react-icons/fi';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Get data from location state or use defaults
  const studentId = location.state?.studentId || 'PPDB-2024-0001';
  const nomorPendaftaran = location.state?.nomorPendaftaran || studentId;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(nomorPendaftaran);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In production, this would generate a PDF
    alert('Fitur download PDF akan tersedia segera.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiCheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Pendaftaran Berhasil!
            </h1>
            <p className="text-green-100">
              Terima kasih telah mendaftar di SMK Nusantara
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Nomor Pendaftaran */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Nomor Pendaftaran Anda
              </p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-3xl md:text-4xl font-bold text-primary-700 tracking-wider">
                  {nomorPendaftaran}
                </p>
                <button
                  onClick={handleCopy}
                  className="p-2 bg-white rounded-lg hover:bg-primary-50 transition-colors border border-primary-200"
                  title="Salin nomor pendaftaran"
                >
                  <FiCopy className={`w-5 h-5 ${copied ? 'text-green-500' : 'text-gray-600'}`} />
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-xs text-center mt-2">
                  ✓ Berhasil disalin!
                </p>
              )}
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 flex items-start gap-2">
                <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Simpan nomor pendaftaran ini!</strong> Anda memerlukan nomor ini
                  untuk cek status pendaftaran, download kartu ujian, dan melihat hasil seleksi.
                </span>
              </p>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiClock className="text-primary-600" />
                Langkah Selanjutnya
              </h3>
              <div className="space-y-3">
                {[
                  { step: 1, text: 'Verifikasi berkas oleh admin (1-3 hari kerja)' },
                  { step: 2, text: 'Lakukan pembayaran biaya pendaftaran' },
                  { step: 3, text: 'Download kartu ujian setelah verifikasi selesai' },
                  { step: 4, text: 'Ikuti ujian seleksi sesuai jadwal' },
                  { step: 5, text: 'Cek pengumuman hasil seleksi' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary-600">
                        {item.step}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-all"
              >
                <FiPrinter className="w-5 h-5" />
                Cetak Bukti
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 transition-all"
              >
                <FiDownload className="w-5 h-5" />
                Download PDF
              </button>
              <Link
                to="/status"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              >
                <FiClock className="w-5 h-5" />
                Cek Status
              </Link>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                <FiHome className="w-5 h-5" />
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Butuh bantuan? Hubungi kami:</p>
          <p className="font-medium text-gray-800 mt-1">
            📞 (021) 1234-5678 | 📧 ppdb@smknusantara.sch.id
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .bg-white {
            visibility: visible;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button, a {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
