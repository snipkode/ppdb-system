import { useState, useEffect } from 'react';
import { FiDollarSign, FiCheck, FiX, FiClock, FiAlertCircle, FiSearch, FiFilter } from 'react-icons/fi';
import { paymentAPI, studentAPI } from '@/services/api';
import PaymentTable from '@/components/admin/PaymentTable';
import PaymentDetailModal from '@/components/admin/PaymentDetailModal';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0, rejected: 0 });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await studentAPI.getStudents();
      const paymentsData = response.data
        .filter(data => data.pembayaran)
        .map(data => ({
          id: data.id,
          nomor_pendaftaran: data.nomor_pendaftaran,
          nama_siswa: data.data_siswa?.nama_lengkap || '-',
          email: data.data_siswa?.email || '-',
          telepon: data.data_siswa?.telepon || '-',
          pembayaran: data.pembayaran,
          created_at: data.created_at
        }));

      setPayments(paymentsData);
      setStats({
        total: paymentsData.length,
        pending: paymentsData.filter(p => p.pembayaran.status === 'pending').length,
        paid: paymentsData.filter(p => p.pembayaran.status === 'paid').length,
        rejected: paymentsData.filter(p => p.pembayaran.status === 'rejected').length
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPayment = async (studentId, approved, notes = '') => {
    try {
      await paymentAPI.verifyPayment(studentId, approved ? 'paid' : 'rejected', notes);
      await fetchPayments();
      setShowDetailModal(false);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (filter !== 'all' && payment.pembayaran.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return payment.nomor_pendaftaran?.toLowerCase().includes(term) ||
             payment.nama_siswa?.toLowerCase().includes(term) ||
             payment.email?.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header - Larger Height */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard Pembayaran</h1>
              <p className="text-sm md:text-base text-white/90">Kelola cicilan pendaftaran PPDB dengan mudah dan efisien</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/80">Admin Panel</p>
                <p className="text-sm font-bold text-white">PPDB 2024/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Stats */}
      <div className="container mx-auto px-4 -mt-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats.total} color="from-blue-500 to-cyan-500" icon={<FiDollarSign />} />
          <StatCard label="Pending" value={stats.pending} color="from-yellow-500 to-orange-500" icon={<FiClock />} />
          <StatCard label="Lunas" value={stats.paid} color="from-green-500 to-emerald-500" icon={<FiCheck />} />
          <StatCard label="Ditolak" value={stats.rejected} color="from-red-500 to-rose-500" icon={<FiX />} />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="container mx-auto px-4 mt-4">
        <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <FiFilter className="w-4 h-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 md:w-40 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Lunas</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari no. pendaftaran, nama, atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="container mx-auto px-4 mt-4 mb-8">
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Memuat data...</p>
          </div>
        ) : (
          <PaymentTable
            payments={filteredPayments}
            loading={loading}
            onViewDetail={(payment) => {
              setSelectedPayment(payment);
              setShowDetailModal(true);
            }}
          />
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedPayment(null);
          }}
          onVerify={handleVerifyPayment}
        />
      )}
    </div>
  );
};

// Compact Stat Card
const StatCard = ({ label, value, color, icon }) => (
  <div className={`bg-gradient-to-br ${color} rounded-lg p-3 text-white shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs opacity-90">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
  </div>
);

export default AdminPayments;
