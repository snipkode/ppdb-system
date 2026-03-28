import { useState, useEffect } from 'react';
import { FiDollarSign, FiCheck, FiX, FiClock, FiAlertCircle } from 'react-icons/fi';
import { paymentAPI, studentAPI } from '@services/api';
import PaymentTable from '@/components/admin/PaymentTable';
import PaymentDetailModal from '@/components/admin/PaymentDetailModal';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, paid, rejected
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    paid: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getStudents();
      
      const paymentsData = [];
      response.data.forEach((data) => {
        if (data.pembayaran) {
          paymentsData.push({
            id: data.id,
            nomor_pendaftaran: data.nomor_pendaftaran,
            nama_siswa: data.data_siswa?.nama_lengkap || '-',
            email: data.data_siswa?.email || '-',
            telepon: data.data_siswa?.telepon || '-',
            pembayaran: data.pembayaran,
            created_at: data.created_at
          });
        }
      });

      setPayments(paymentsData);

      // Calculate stats
      const statsData = {
        total: paymentsData.length,
        pending: paymentsData.filter(p => p.pembayaran.status === 'pending').length,
        paid: paymentsData.filter(p => p.pembayaran.status === 'paid').length,
        rejected: paymentsData.filter(p => p.pembayaran.status === 'rejected').length
      };
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (studentId, approved, notes = '') => {
    try {
      await paymentAPI.verifyPayment(studentId, approved ? 'paid' : 'rejected', notes);

      // Refresh data
      await fetchPayments();
      setShowDetailModal(false);

      alert(`Pembayaran ${approved ? 'berhasil diverifikasi' : 'ditolak'}`);
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Gagal memverifikasi pembayaran: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleViewDetail = (payment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const filteredPayments = payments.filter(payment => {
    // Filter by status
    if (filter !== 'all' && payment.pembayaran.status !== filter) {
      return false;
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        payment.nomor_pendaftaran?.toLowerCase().includes(term) ||
        payment.nama_siswa?.toLowerCase().includes(term) ||
        payment.email?.toLowerCase().includes(term)
      );
    }

    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiDollarSign className="w-7 h-7 text-blue-600" />
            Manajemen Pembayaran
          </h1>
          <p className="text-gray-600 mt-1">
            Verifikasi pembayaran biaya pendaftaran PPDB
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pembayaran</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Menunggu Verifikasi</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiClock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lunas</p>
                <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ditolak</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiX className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua ({payments.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiClock className="inline w-4 h-4 mr-1" />
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter('paid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'paid'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiCheck className="inline w-4 h-4 mr-1" />
                Lunas ({stats.paid})
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiX className="inline w-4 h-4 mr-1" />
                Ditolak ({stats.rejected})
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari no. pendaftaran, nama, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Payment Table */}
        <PaymentTable
          payments={filteredPayments}
          loading={loading}
          onViewDetail={handleViewDetail}
        />
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setShowDetailModal(false)}
          onVerify={handleVerifyPayment}
        />
      )}
    </div>
  );
};

export default AdminPayments;
