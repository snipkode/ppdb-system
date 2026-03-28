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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-slate-100 to-slate-200 border-b-2 border-gray-300">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No. Daftar</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Siswa</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Progress</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dibayar</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => {
              const progress = getCicilanProgress(payment);
              const statusBadge = getStatusBadge(payment.pembayaran?.cicilan || []);
              const totalPaid = payment.pembayaran?.totalPaid || 0;
              const totalBiaya = payment.pembayaran?.totalBiaya || 1500000;

              return (
                <tr key={payment.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors">
                  <td className="px-3 py-3">
                    <div className="text-sm font-mono font-bold text-gray-900">{payment.nomor_pendaftaran || '-'}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{payment.nama_siswa || '-'}</div>
                    {payment.email && <div className="text-xs text-gray-600 font-medium truncate max-w-[150px]">{payment.email}</div>}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="bg-gray-300 rounded-full h-2.5 shadow-inner">
                          <div className={`h-2.5 rounded-full transition-all shadow-sm ${progress.percentage === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`} style={{ width: `${progress.percentage}%` }} />
                        </div>
                        <p className="text-xs font-semibold text-gray-700 mt-1">{progress.paid}/{progress.total} cicilan</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="text-sm font-bold text-gray-900">{formatCurrency(totalPaid)}</div>
                    <div className="text-xs text-gray-600 font-medium">dari {formatCurrency(totalBiaya)}</div>
                  </td>
                  <td className="px-3 py-3">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold shadow-sm ${statusBadge.color}`}>
                      {statusBadge.icon}
                      <div>
                        <div className="font-bold leading-tight">{statusBadge.label}</div>
                        {statusBadge.sub && <div className="text-xs opacity-80 font-medium leading-tight">{statusBadge.sub}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <button onClick={() => onViewDetail(payment)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm font-bold">
                      <FiEye className="w-4 h-4" />
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
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-3 border-t-2 border-gray-300">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
          <span>Menampilkan {payments.length} data</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" /> Lunas: {payments.filter(p => (p.pembayaran?.cicilan || []).filter(c => c.status === 'paid').length === 3).length}</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" /> Pending: {payments.filter(p => (p.pembayaran?.cicilan || []).some(c => c.status === 'pending')).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
