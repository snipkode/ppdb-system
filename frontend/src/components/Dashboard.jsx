import { useEffect, useState } from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiClock, FiAward } from 'react-icons/fi';
import { statsApi, studentApi } from '@/services/api';
import { useStatsStore, useUIStore } from '@/stores/useStore';

const Dashboard = () => {
  const { stats, setStats, setLoading } = useStatsStore();
  const { showNotification } = useUIStore();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchStudents();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const result = await statsApi.getStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      showNotification('Gagal memuat statistik', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const result = await studentApi.getAll();
      if (result.success) {
        setStudents(result.data.slice(0, 5)); // Show latest 5
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const statCards = stats ? [
    { icon: FiUsers, label: 'Total Pendaftar', value: stats.total, color: 'from-blue-500 to-blue-700' },
    { icon: FiClock, label: 'Menunggu', value: stats.pending, color: 'from-yellow-500 to-yellow-700' },
    { icon: FiUserCheck, label: 'Diterima', value: stats.accepted, color: 'from-green-500 to-green-700' },
    { icon: FiUserX, label: 'Ditolak', value: stats.rejected, color: 'from-red-500 to-red-700' },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className={`stat-card bg-gradient-to-br ${stat.color}`}>
            <stat.icon className="text-3xl mb-2 opacity-80" />
            <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
            <p className="text-sm md:text-base opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Gender Distribution */}
      {stats && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiAward className="text-primary-600" />
            Distribusi Jenis Kelamin
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.byGender.L}</p>
              <p className="text-gray-600">Laki-laki</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-pink-600">{stats.byGender.P}</p>
              <p className="text-gray-600">Perempuan</p>
            </div>
          </div>
        </div>
      )}

      {/* Major Distribution */}
      {stats && Object.keys(stats.byMajor).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Peminatan Jurusan</h3>
          <div className="space-y-3">
            {Object.entries(stats.byMajor).map(([major, count]) => (
              <div key={major} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{major}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 md:w-48 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-primary-600 font-semibold w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Registrations */}
      {students.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pendaftaran Terbaru</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Nama</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden sm:table-cell">Asal Sekolah</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Jurusan</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm text-gray-800">{student.nama_lengkap}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 hidden sm:table-cell">{student.asal_sekolah}</td>
                    <td className="py-3 px-2">
                      <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                        {student.jurusan_dipilih}
                      </span>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <StatusBadge status={student.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const labels = {
    pending: 'Menunggu',
    accepted: 'Diterima',
    rejected: 'Ditolak',
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
};

export default Dashboard;
