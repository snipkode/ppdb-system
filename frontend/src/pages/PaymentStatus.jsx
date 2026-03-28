import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiAlertCircle, FiClock, FiXCircle, FiDownload, FiPrinter } from 'react-icons/fi';
import PaymentInfo from '@/components/ppdb/PaymentInfo';
import PaymentUpload from '@/components/ppdb/PaymentUpload';
import { studentApi } from '@/services/api';
import { db } from '@/services/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const PaymentStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const result = await studentApi.getById(id);
      if (result.success) {
        setStudent(result.data);
      } else {
        setError('Data tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async (paymentData) => {
    try {
      const studentRef = doc(db, 'students', id);
      await updateDoc(studentRef, {
        pembayaran: paymentData,
        updated_at: new Date().toISOString()
      });
      
      // Refresh data
      await fetchStudentData();
      setShowUploadModal(false);
    } catch (err) {
      console.error('Error updating payment:', err);
      throw err;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data pembayaran...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <FiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">{error || 'Data pembayaran tidak ditemukan'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const paymentData = student.pembayaran || { status: 'unpaid' };

  const getStatusBadge = (status) => {
    const badges = {
      unpaid: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        icon: <FiAlertCircle className="w-5 h-5" />,
        label: 'Belum Bayar'
      },
      pending: {
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        icon: <FiClock className="w-5 h-5" />,
        label: 'Menunggu Verifikasi'
      },
      paid: {
        color: 'bg-green-100 text-green-800 border-green-300',
        icon: <FiCheckCircle className="w-5 h-5" />,
        label: 'Lunas'
      },
      rejected: {
        color: 'bg-red-100 text-red-800 border-red-300',
        icon: <FiXCircle className="w-5 h-5" />,
        label: 'Ditolak'
      }
    };
    return badges[status] || badges.unpaid;
  };

  const statusBadge = getStatusBadge(paymentData.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Status Pembayaran</h1>
              <p className="text-gray-600 mt-1">
                No. Pendaftaran: <span className="font-semibold">{student.nomor_pendaftaran}</span>
              </p>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiPrinter className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Student Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pendaftar</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nama Lengkap</p>
              <p className="font-medium text-gray-800">{student.data_siswa?.nama_lengkap || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NISN</p>
              <p className="font-medium text-gray-800">{student.data_siswa?.nisn || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-800">{student.data_siswa?.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Telepon</p>
              <p className="font-medium text-gray-800">{student.data_siswa?.telepon || '-'}</p>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Status Pembayaran</h2>
            <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${statusBadge.color}`}>
              {statusBadge.icon}
              <span className="font-medium">{statusBadge.label}</span>
            </div>
          </div>

          {paymentData.status === 'paid' && paymentData.verified_at && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">Pembayaran Terverifikasi</p>
                  <p className="text-sm text-green-700 mt-1">
                    Tanggal verifikasi: {new Date(paymentData.verified_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentData.status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <FiXCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">Pembayaran Ditolak</p>
                  <p className="text-sm text-red-700 mt-1">
                    Alasan: {paymentData.rejected_reason || 'Tidak disebutkan'}
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    Silakan upload bukti transfer yang benar
                  </p>
                </div>
              </div>
            </div>
          )}

          {paymentData.bukti_transfer && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Bukti Transfer</p>
                {paymentData.bukti_transfer.endsWith('.pdf') ? (
                  <a
                    href={paymentData.bukti_transfer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <FiDownload className="w-4 h-4" />
                    Download Bukti Transfer (PDF)
                  </a>
                ) : (
                  <img
                    src={paymentData.bukti_transfer}
                    alt="Bukti Transfer"
                    className="w-full max-w-md border rounded-lg"
                  />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Bank</p>
                  <p className="font-medium text-gray-800">{paymentData.bank_name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal Transfer</p>
                  <p className="font-medium text-gray-800">
                    {paymentData.transfer_date ? new Date(paymentData.transfer_date).toLocaleDateString('id-ID') : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nominal</p>
                  <p className="font-medium text-gray-800">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(paymentData.amount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal Upload</p>
                  <p className="font-medium text-gray-800">
                    {paymentData.uploaded_at ? new Date(paymentData.uploaded_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : '-'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Info & Upload */}
        <PaymentInfo
          paymentData={paymentData}
          onUploadClick={() => setShowUploadModal(true)}
        />

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Langkah Selanjutnya</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Lakukan Pembayaran</p>
                <p className="text-sm text-gray-600">Transfer biaya pendaftaran ke rekening yang tersedia</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Upload Bukti Transfer</p>
                <p className="text-sm text-gray-600">Upload bukti transfer dengan jelas dan terbaca</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Tunggu Verifikasi</p>
                <p className="text-sm text-gray-600">Admin akan memverifikasi dalam 2x24 jam</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm">4</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Lanjutkan Proses</p>
                <p className="text-sm text-gray-600">Setelah lunas, lanjutkan ke tahap berikutnya</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <PaymentUpload
          studentId={id}
          onUploadSuccess={handleUploadSuccess}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
