import { useState } from 'react';
import { FiX, FiCheck, FiAlertCircle, FiDownload, FiZoomIn } from 'react-icons/fi';

const PaymentDetailModal = ({ payment, onClose, onVerify }) => {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectNotes, setRejectNotes] = useState('');
  const [verifyNotes, setVerifyNotes] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApprove = () => {
    onVerify(payment.id, true, verifyNotes);
  };

  const handleReject = () => {
    if (!rejectNotes.trim()) {
      alert('Harap isi alasan penolakan');
      return;
    }
    onVerify(payment.id, false, rejectNotes);
  };

  const getStatusBadge = (status) => {
    const badges = {
      unpaid: { color: 'bg-yellow-100 text-yellow-800', label: 'Belum Bayar' },
      pending: { color: 'bg-blue-100 text-blue-800', label: 'Menunggu Verifikasi' },
      paid: { color: 'bg-green-100 text-green-800', label: 'Lunas' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Ditolak' }
    };
    return badges[status] || badges.unpaid;
  };

  const statusBadge = getStatusBadge(payment.pembayaran.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Detail Pembayaran</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Student Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 border-b pb-2">Informasi Pendaftar</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">No. Pendaftaran</p>
                  <p className="font-medium text-gray-800">{payment.nomor_pendaftaran}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nama Lengkap</p>
                  <p className="font-medium text-gray-800">{payment.nama_siswa}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{payment.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telepon</p>
                  <p className="font-medium text-gray-800">{payment.telepon || '-'}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Status */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 border-b pb-2">Status Pembayaran</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color}`}>
                    <span>{statusBadge.label}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nominal Transfer</p>
                  <p className="font-medium text-gray-800">
                    {formatCurrency(payment.pembayaran.amount || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bank</p>
                  <p className="font-medium text-gray-800">{payment.pembayaran.bank_name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tanggal Transfer</p>
                  <p className="font-medium text-gray-800">
                    {payment.pembayaran.transfer_date
                      ? new Date(payment.pembayaran.transfer_date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : '-'}
                  </p>
                </div>
                {payment.pembayaran.verified_at && (
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Verifikasi</p>
                    <p className="font-medium text-gray-800">{formatDate(payment.pembayaran.verified_at)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bukti Transfer */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-gray-800 border-b pb-2">Bukti Transfer</h3>
            
            {payment.pembayaran.bukti_transfer ? (
              <div className="space-y-3">
                {payment.pembayaran.bukti_transfer.endsWith('.pdf') ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl mb-3">📄</p>
                    <p className="text-gray-600 mb-4">File PDF</p>
                    <a
                      href={payment.pembayaran.bukti_transfer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <img
                      src={payment.pembayaran.bukti_transfer}
                      alt="Bukti Transfer"
                      className="w-full h-auto max-h-96 object-contain border rounded-lg cursor-pointer hover:opacity-90"
                      onClick={() => window.open(payment.pembayaran.bukti_transfer, '_blank')}
                    />
                    <div className="mt-3 flex gap-2">
                      <a
                        href={payment.pembayaran.bukti_transfer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FiZoomIn className="w-4 h-4" />
                        Buka gambar penuh
                      </a>
                      <a
                        href={payment.pembayaran.bukti_transfer}
                        download
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FiDownload className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  </div>
                )}

                {/* Upload Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Informasi Upload</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <span>Diupload:</span>
                        <span>{formatDate(payment.pembayaran.uploaded_at)}</span>
                        {payment.pembayaran.notes && (
                          <>
                            <span>Catatan:</span>
                            <span>{payment.pembayaran.notes}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Belum ada bukti transfer yang diupload</p>
              </div>
            )}
          </div>

          {/* Rejection Notes */}
          {payment.pembayaran.rejected_reason && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Alasan Penolakan</h3>
              <p className="text-red-700">{payment.pembayaran.rejected_reason}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {payment.pembayaran.status === 'pending' && (
          <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3">
            {!showRejectForm ? (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Tutup
                </button>
                <button
                  onClick={() => setShowRejectForm(true)}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Tolak Pembayaran
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FiCheck className="w-5 h-5" />
                  Verifikasi Pembayaran
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectNotes('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Batal
                </button>
                <div className="flex-[2]">
                  <textarea
                    value={rejectNotes}
                    onChange={(e) => setRejectNotes(e.target.value)}
                    placeholder="Tulis alasan penolakan..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
                <button
                  onClick={handleReject}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Konfirmasi Tolak
                </button>
              </>
            )}
          </div>
        )}

        {payment.pembayaran.status === 'paid' && (
          <div className="sticky bottom-0 bg-white border-t px-6 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <FiCheck className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Pembayaran Telah Terverifikasi</p>
              <p className="text-sm text-green-600 mt-1">
                Pembayaran ini sudah diverifikasi pada {formatDate(payment.pembayaran.verified_at)}
              </p>
            </div>
          </div>
        )}

        {payment.pembayaran.status === 'rejected' && (
          <div className="sticky bottom-0 bg-white border-t px-6 py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <FiX className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-red-800 font-semibold">Pembayaran Ditolak</p>
              <p className="text-sm text-red-600 mt-1">
                Ditolak pada {formatDate(payment.pembayaran.verified_at)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailModal;
