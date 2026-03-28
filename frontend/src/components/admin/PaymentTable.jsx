import { FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiEye } from 'react-icons/fi';

const PaymentTable = ({ payments, loading, onViewDetail }) => {
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
        label: 'Pending'
      },
      paid: {
        color: 'bg-green-100 text-green-800',
        icon: <FiCheckCircle className="w-4 h-4" />,
        label: 'Lunas'
      },
      rejected: {
        color: 'bg-red-100 text-red-800',
        icon: <FiXCircle className="w-4 h-4" />,
        label: 'Ditolak'
      }
    };
    return badges[status] || badges.unpaid;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Memuat data pembayaran...</p>
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <FiAlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Belum ada data pembayaran</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. Pendaftaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Siswa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank / Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nominal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => {
              const statusBadge = getStatusBadge(payment.pembayaran.status);
              return (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.nomor_pendaftaran}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.nama_siswa}
                      </div>
                      <div className="text-sm text-gray-500">
                        {payment.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {payment.pembayaran.bank_name || '-'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.pembayaran.transfer_date
                        ? new Date(payment.pembayaran.transfer_date).toLocaleDateString('id-ID')
                        : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payment.pembayaran.amount || 0)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}
                    >
                      {statusBadge.icon}
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.pembayaran.bukti_transfer ? (
                      <a
                        href={payment.pembayaran.bukti_transfer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
                      >
                        📄 Lihat Bukti
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onViewDetail(payment)}
                      className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
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

      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Menampilkan {payments.length} dari {payments.length} pembayaran
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
