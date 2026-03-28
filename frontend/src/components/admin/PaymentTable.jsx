import { FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiTrendingUp, FiEye } from 'react-icons/fi';

const PaymentTable = ({ payments, loading, onViewDetail }) => {
  const getCicilanProgress = (payment) => {
    const cicilan = payment.pembayaran?.cicilan || [];
    const paid = cicilan.filter(c => c.status === 'paid').length;
    const total = cicilan.length || 3;
    return { paid, total, percentage: Math.round((paid / total) * 100) };
  };

  const getStatusBadge = (cicilan) => {
    const paidCount = cicilan.filter(c => c.status === 'paid').length;
    const totalCount = cicilan.length || 3;
    const pendingCount = cicilan.filter(c => c.status === 'pending').length;
    const rejectedCount = cicilan.filter(c => c.status === 'rejected').length;

    if (rejectedCount > 0) return { color: 'bg-red-100 text-red-800', icon: <FiXCircle className="w-3 h-3" />, label: 'Ditolak', sub: `${rejectedCount} cicilan` };
    if (pendingCount > 0) return { color: 'bg-blue-100 text-blue-800', icon: <FiClock className="w-3 h-3" />, label: 'Pending', sub: `${pendingCount} cicilan` };
    if (paidCount === totalCount) return { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="w-3 h-3" />, label: 'Lunas', sub: `${paidCount}/${totalCount}` };
    return { color: 'bg-yellow-100 text-yellow-800', icon: <FiAlertCircle className="w-3 h-3" />, label: 'Belum Lunas', sub: `${paidCount}/${totalCount}` };
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <FiAlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-gray-600">Belum ada data cicilan</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">No. Daftar</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Siswa</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Dibayar</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((payment) => {
              const progress = getCicilanProgress(payment);
              const statusBadge = getStatusBadge(payment.pembayaran?.cicilan || []);
              const totalPaid = payment.pembayaran?.totalPaid || 0;
              const totalBiaya = payment.pembayaran?.totalBiaya || 1500000;

              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="text-xs font-mono font-medium text-gray-900">{payment.nomor_pendaftaran || '-'}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{payment.nama_siswa || '-'}</div>
                    {payment.email && <div className="text-xs text-gray-500 truncate max-w-[150px]">{payment.email}</div>}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full transition-all ${progress.percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${progress.percentage}%` }} />
                        </div>
                        <p className="text-xs text-gray-600 mt-0.5">{progress.paid}/{progress.total} cicilan</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="text-xs font-bold text-gray-900">{formatCurrency(totalPaid)}</div>
                    <div className="text-xs text-gray-500">dari {formatCurrency(totalBiaya)}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                      {statusBadge.icon}
                      <div>
                        <div className="font-medium leading-tight">{statusBadge.label}</div>
                        {statusBadge.sub && <div className="text-xs opacity-75 leading-tight">{statusBadge.sub}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <button onClick={() => onViewDetail(payment)} className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                      <FiEye className="w-3.5 h-3.5" />
                      Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-3 py-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Menampilkan {payments.length} data</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Lunas: {payments.filter(p => (p.pembayaran?.cicilan || []).filter(c => c.status === 'paid').length === 3).length}</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Pending: {payments.filter(p => (p.pembayaran?.cicilan || []).some(c => c.status === 'pending')).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
