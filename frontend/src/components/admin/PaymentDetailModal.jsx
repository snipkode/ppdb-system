import { useState } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiClock, FiDollarSign, FiCreditCard } from 'react-icons/fi';

const PaymentDetailModal = ({ payment, onClose, onVerify }) => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedCicilan, setSelectedCicilan] = useState(null);

  const cicilan = payment.pembayaran?.cicilan || [
    { bulan: 1, jumlah: 500000, status: 'unpaid' },
    { bulan: 2, jumlah: 500000, status: 'unpaid' },
    { bulan: 3, jumlah: 500000, status: 'unpaid' }
  ];

  const totalPaid = payment.pembayaran?.totalPaid || 0;
  const totalBiaya = payment.pembayaran?.totalBiaya || 1500000;
  const remaining = totalBiaya - totalPaid;

  const getStatusBadge = (status) => {
    const badges = {
      unpaid: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <FiAlertCircle className="w-4 h-4" />,
        label: 'Belum Bayar'
      },
      pending: {
        color: 'bg-blue-100 text-blue-800',
        icon: <FiClock className="w-4 h-4" />,
        label: 'Menunggu Verifikasi'
      },
      paid: {
        color: 'bg-green-100 text-green-800',
        icon: <FiCheckCircle className="w-4 h-4" />,
        label: 'Lunas'
      },
      rejected: {
        color: 'bg-red-100 text-red-800',
        icon: <FiAlertCircle className="w-4 h-4" />,
        label: 'Ditolak'
      }
    };
    return badges[status] || badges.unpaid;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleVerify = (approved) => {
    if (!approved) {
      setShowRejectInput(true);
    } else {
      onVerify(payment.id, selectedCicilan, 'paid');
    }
  };

  const handleConfirmReject = () => {
    onVerify(payment.id, selectedCicilan, 'rejected', rejectReason);
    setShowRejectInput(false);
    setRejectReason('');
  };

  const handleViewCicilan = (cicilanItem, index) => {
    setSelectedCicilan(index + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">Detail Cicilan</h2>
            <p className="text-sm text-white/80">{payment.nomor_pendaftaran}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Nama Siswa</p>
              <p className="font-semibold text-gray-800">{payment.nama_siswa || '-'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-medium text-gray-800">{payment.email || '-'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Telepon</p>
              <p className="font-medium text-gray-800">{payment.telepon || '-'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Tanggal Daftar</p>
              <p className="font-medium text-gray-800">{formatDate(payment.created_at)}</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
              <p className="text-blue-100 text-sm mb-1">Total Biaya</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBiaya)}</p>
              <p className="text-xs text-blue-100 mt-2">3x cicilan</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
              <p className="text-green-100 text-sm mb-1">Sudah Dibayar</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
              <p className="text-xs text-green-100 mt-2">
                {cicilan.filter(c => c.status === 'paid').length}/3 cicilan lunas
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
              <p className="text-orange-100 text-sm mb-1">Sisa Pembayaran</p>
              <p className="text-2xl font-bold">{formatCurrency(remaining)}</p>
              <p className="text-xs text-orange-100 mt-2">
                {cicilan.filter(c => c.status === 'unpaid').length} cicilan lagi
              </p>
            </div>
          </div>

          {/* Cicilan Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FiCreditCard className="w-5 h-5 text-purple-600" />
              Detail Cicilan per Bulan
            </h3>
            <div className="space-y-3">
              {cicilan.map((cicilanItem, index) => {
                const statusBadge = getStatusBadge(cicilanItem.status);
                return (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                      selectedCicilan === index + 1
                        ? 'border-purple-500 bg-purple-50'
                        : cicilanItem.status === 'paid'
                        ? 'border-green-200 bg-green-50 hover:border-green-300'
                        : cicilanItem.status === 'pending'
                        ? 'border-blue-200 bg-blue-50 hover:border-blue-300'
                        : cicilanItem.status === 'rejected'
                        ? 'border-red-200 bg-red-50 hover:border-red-300'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => handleViewCicilan(cicilanItem, index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          cicilanItem.status === 'paid'
                            ? 'bg-green-500 text-white'
                            : cicilanItem.status === 'pending'
                            ? 'bg-blue-500 text-white'
                            : cicilanItem.status === 'rejected'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {cicilanItem.bulan || index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">
                            Cicilan Bulan {cicilanItem.bulan || index + 1}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(cicilanItem.jumlah)} - Jatuh tempo: 30 hari
                          </p>
                          {cicilanItem.paidAt && (
                            <p className="text-xs text-green-600 mt-1">
                              Lunas pada: {formatDate(cicilanItem.paidAt)}
                            </p>
                          )}
                          {cicilanItem.uploadedAt && (
                            <p className="text-xs text-blue-600 mt-1">
                              Upload: {formatDate(cicilanItem.uploadedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          {formatCurrency(cicilanItem.jumlah)}
                        </p>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mt-1 ${statusBadge.color}`}>
                          {statusBadge.icon}
                          {statusBadge.label}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons for Pending Cicilan */}
                    {cicilanItem.status === 'pending' && selectedCicilan === index + 1 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                        <button
                          onClick={() => handleVerify(true)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                          Verifikasi
                        </button>
                        <button
                          onClick={() => handleVerify(false)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                          Tolak
                        </button>
                      </div>
                    )}

                    {/* Reject Reason */}
                    {cicilanItem.status === 'rejected' && cicilanItem.rejectedReason && (
                      <div className="mt-4 pt-4 border-t border-red-200">
                        <p className="text-sm text-red-800">
                          <span className="font-semibold">Alasan penolakan:</span> {cicilanItem.rejectedReason}
                        </p>
                      </div>
                    )}

                    {/* Bukti Transfer Link */}
                    {cicilanItem.buktiUrl && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <a
                          href={cicilanItem.buktiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <FiDollarSign className="w-4 h-4" />
                          Lihat Bukti Transfer
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reject Input Modal */}
          {showRejectInput && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <h4 className="font-bold text-red-800 mb-2">Alasan Penolakan</h4>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                rows="3"
                placeholder="Jelaskan alasan penolakan..."
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleConfirmReject}
                  disabled={!rejectReason.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Konfirmasi Penolakan
                </button>
                <button
                  onClick={() => {
                    setShowRejectInput(false);
                    setRejectReason('');
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;
