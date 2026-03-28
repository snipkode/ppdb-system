import { FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

const PaymentTable = ({ payments, loading, onViewDetail }) => {
  const getCicilanProgress = (payment) => {
    const cicilan = payment.pembayaran?.cicilan || [];
    const paid = cicilan.filter(c => c.status === 'paid').length;
    const total = cicilan.length || 3;
    const percentage = Math.round((paid / total) * 100);
    
    return { paid, total, percentage };
  };

  const getStatusBadge = (cicilan) => {
    const paidCount = cicilan.filter(c => c.status === 'paid').length;
    const totalCount = cicilan.length || 3;
    const pendingCount = cicilan.filter(c => c.status === 'pending').length;
    const rejectedCount = cicilan.filter(c => c.status === 'rejected').length;

    if (rejectedCount > 0) {
      return {
        color: 'bg-red-100 text-red-800',
        icon: <FiXCircle className="w-4 h-4" />,
        label: 'Ada Ditolak',
        sublabel: `${rejectedCount} cicilan`
      };
    }
    
    if (pendingCount > 0) {
      return {
        color: 'bg-blue-100 text-blue-800',
        icon: <FiClock className="w-4 h-4" />,
        label: 'Menunggu Verifikasi',
        sublabel: `${pendingCount} cicilan`
      };
    }
    
    if (paidCount === totalCount) {
      return {
        color: 'bg-green-100 text-green-800',
        icon: <FiCheckCircle className="w-4 h-4" />,
        label: 'Lunas',
        sublabel: `${paidCount}/${totalCount} cicilan`
      };
    }

    return {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <FiAlertCircle className="w-4 h-4" />,
      label: 'Belum Lunas',
      sublabel: `${paidCount}/${totalCount} cicilan`
    };
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Memuat data cicilan...</p>
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Belum ada data cicilan</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                No. Pendaftaran
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nama Siswa
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Progress Cicilan
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Dibayar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {payments.map((payment) => {
              const progress = getCicilanProgress(payment);
              const statusBadge = getStatusBadge(payment.pembayaran?.cicilan || []);
              const totalPaid = payment.pembayaran?.totalPaid || 0;
              const totalBiaya = payment.pembayaran?.totalBiaya || 1500000;

              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-mono font-medium text-gray-900">
                      {payment.nomor_pendaftaran || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.nama_siswa || '-'}
                    </div>
                    {payment.email && (
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">
                        {payment.email}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-500 ${
                              progress.percentage === 100
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            }`}
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {progress.paid} dari {progress.total} cicilan
                        </p>
                      </div>
                      <FiTrendingUp className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(totalPaid)}
                    </div>
                    <div className="text-xs text-gray-500">
                      dari {formatCurrency(totalBiaya)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                      {statusBadge.icon}
                      <div>
                        <div className="font-medium">{statusBadge.label}</div>
                        {statusBadge.sublabel && (
                          <div className="text-xs opacity-75">{statusBadge.sublabel}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onViewDetail(payment)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
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

      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>
            Menampilkan {payments.length} data cicilan
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Lunas: {payments.filter(p => (p.pembayaran?.cicilan || []).filter(c => c.status === 'paid').length === 3).length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Pending: {payments.filter(p => (p.pembayaran?.cicilan || []).some(c => c.status === 'pending')).length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              Belum Lunas: {payments.filter(p => !(p.pembayaran?.cicilan || []).some(c => c.status === 'pending' || c.status === 'paid')).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
