import { useState, useEffect } from 'react';
import { FiDollarSign, FiCheck, FiX, FiClock } from 'react-icons/fi';
import { paymentAPI, studentAPI } from '@/services/api';
import PaymentTable from '@/components/admin/PaymentTable';
import PaymentDetailModal from '@/components/admin/PaymentDetailModal';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui';
import StatCard from '@/components/ui/StatCard';
import SearchFilter from '@/components/ui/SearchFilter';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import AdminLayout from '@/components/layout/AdminLayout';
import Breadcrumb from '@/components/ui/Breadcrumb';

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

  const filters = [
    { value: 'all', label: 'Semua Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Lunas' },
    { value: 'rejected', label: 'Ditolak' }
  ];

  return (
    <AdminLayout title="Dashboard Pembayaran" subtitle="Kelola cicilan pendaftaran PPDB">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-14 z-30">
        <div className="container mx-auto px-4 py-2">
          <Breadcrumb showHome={false} items={[{ label: 'Pembayaran', href: '/admin/payments' }]} />
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard Pembayaran</h1>
              <p className="text-xs md:text-sm text-white/90">Kelola cicilan pendaftaran PPDB dengan mudah dan efisien</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/80">Admin Panel</p>
                <p className="text-sm font-bold text-white">PPDB 2024/2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats.total} color="from-blue-500 to-cyan-500" icon={<FiDollarSign />} size="md" />
          <StatCard label="Pending" value={stats.pending} color="from-yellow-500 to-orange-500" icon={<FiClock />} size="md" />
          <StatCard label="Lunas" value={stats.paid} color="from-green-500 to-emerald-500" icon={<FiCheck />} size="md" />
          <StatCard label="Ditolak" value={stats.rejected} color="from-red-500 to-rose-500" icon={<FiX />} size="md" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="container mx-auto px-4 mt-4">
        <SearchFilter
          onSearch={setSearchTerm}
          onFilterChange={setFilter}
          filters={filters}
          defaultFilter="all"
          placeholder="Cari no. pendaftaran, nama, atau email..."
        />
      </div>

      {/* Payment Table */}
      <div className="container mx-auto px-4 mt-4 mb-8">
        {loading ? (
          <LoadingState message="Memuat data cicilan..." />
        ) : filteredPayments.length === 0 ? (
          <EmptyState
            type={searchTerm ? 'noResults' : 'noPayments'}
            title={searchTerm ? 'Pembayaran Tidak Ditemukan' : 'Belum Ada Pembayaran'}
            message={searchTerm
              ? `Tidak ada pembayaran yang cocok dengan "${searchTerm}"`
              : 'Pembayaran akan muncul ketika siswa sudah melakukan pembayaran cicilan'
            }
            actionLabel={searchTerm ? 'Reset Pencarian' : null}
            onAction={searchTerm ? () => setSearchTerm('') : null}
          />
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
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedPayment(null);
          }}
          title="Detail Pembayaran"
          subtitle={`No. Pendaftaran: ${selectedPayment.nomor_pendaftaran}`}
          size="lg"
        >
          <PaymentDetailModal
            payment={selectedPayment}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedPayment(null);
            }}
            onVerify={handleVerifyPayment}
          />
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminPayments;
