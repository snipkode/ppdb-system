import { useState } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi';

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
      unpaid: { color: 'bg-yellow-100 text-yellow-800', icon: <FiAlertCircle className="w-3 h-3" />, label: 'Belum Bayar' },
      pending: { color: 'bg-blue-100 text-blue-800', icon: <FiClock className="w-3 h-3" />, label: 'Pending' },
      paid: { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="w-3 h-3" />, label: 'Lunas' },
      rejected: { color: 'bg-red-100 text-red-800', icon: <FiAlertCircle className="w-3 h-3" />, label: 'Ditolak' }
    };
    return badges[status] || badges.unpaid;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-base font-bold text-white">Detail Cicilan</h2>
            <p className="text-xs text-white/80 font-mono">{payment.nomor_pendaftaran}</p>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white">
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Student Info - Compact Grid */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <InfoField label="Nama" value={payment.nama_siswa} />
            <InfoField label="Email" value={payment.email} />
            <InfoField label="Telepon" value={payment.telepon} />
            <InfoField label="Daftar" value={formatDate(payment.created_at)} />
          </div>

          {/* Payment Summary - Compact Cards */}
          <div className="grid grid-cols-3 gap-3">
            <SummaryCard label="Total Biaya" value={formatCurrency(totalBiaya)} color="from-blue-500 to-blue-600" />
            <SummaryCard label="Dibayar" value={formatCurrency(totalPaid)} color="from-green-500 to-green-600" />
            <SummaryCard label="Sisa" value={formatCurrency(remaining)} color="from-orange-500 to-orange-600" />
          </div>

          {/* Cicilan List */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Detail Cicilan</h3>
            <div className="space-y-2">
              {cicilan.map((c, idx) => {
                const statusBadge = getStatusBadge(c.status);
                return (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                      selectedCicilan === idx + 1
                        ? 'border-purple-500 bg-purple-50'
                        : c.status === 'paid' ? 'border-green-200 bg-green-50'
                        : c.status === 'pending' ? 'border-blue-200 bg-blue-50'
                        : c.status === 'rejected' ? 'border-red-200 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCicilan(idx + 1)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          c.status === 'paid' ? 'bg-green-500 text-white'
                          : c.status === 'pending' ? 'bg-blue-500 text-white'
                          : c.status === 'rejected' ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        }`}>
                          {c.bulan || idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800">Bulan {c.bulan || idx + 1}</p>
                          <p className="text-xs text-gray-600">{formatCurrency(c.jumlah)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${statusBadge.color}`}>
                          {statusBadge.icon}
                          {statusBadge.label}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {c.status === 'pending' && selectedCicilan === idx + 1 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                        <button onClick={() => handleVerify(true)} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors">
                          Verifikasi
                        </button>
                        <button onClick={() => handleVerify(false)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors">
                          Tolak
                        </button>
                      </div>
                    )}

                    {/* Bukti Transfer */}
                    {c.buktiUrl && (
                      <a href={c.buktiUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs text-blue-600 hover:underline">
                        📄 Lihat Bukti Transfer
                      </a>
                    )}

                    {/* Reject Reason */}
                    {c.status === 'rejected' && c.rejectedReason && (
                      <p className="mt-2 text-xs text-red-800">
                        <span className="font-semibold">Alasan:</span> {c.rejectedReason}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reject Input */}
          {showRejectInput && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
              <h4 className="text-sm font-bold text-red-800 mb-2">Alasan Penolakan</h4>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                rows="2"
                placeholder="Jelaskan alasan penolakan..."
              />
              <div className="flex gap-2 mt-3">
                <button onClick={handleConfirmReject} disabled={!rejectReason.trim()} className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors">
                  Konfirmasi
                </button>
                <button onClick={() => { setShowRejectInput(false); setRejectReason(''); }} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-lg transition-colors">
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

// Compact Info Field
const InfoField = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium text-gray-800 truncate">{value || '-'}</p>
  </div>
);

// Compact Summary Card
const SummaryCard = ({ label, value, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-lg p-3 text-white`}>
    <p className="text-xs opacity-90">{label}</p>
    <p className="text-sm font-bold">{value}</p>
  </div>
);

export default PaymentDetailModal;
