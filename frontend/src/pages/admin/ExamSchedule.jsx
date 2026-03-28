import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiPlus, FiEdit2, FiTrash2, FiDownload, FiCheck, FiX } from 'react-icons/fi';
import examApi from '@/services/examApi';
import { studentApi } from '@/services/api';
import ExamCardGenerator from '@/components/admin/ExamCardGenerator';

const AdminExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showCardGenerator, setShowCardGenerator] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filter, setFilter] = useState('all'); // all, scheduled, completed
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    studentId: '',
    tanggal_ujian: '',
    waktu_ujian: '',
    ruangan: '',
    lokasi: 'Gedung Utama',
    mata_ujian: ['TPQ', 'Akademik', 'Wawancara']
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch exams
      const examsResult = await examApi.getAll();
      if (examsResult.success) {
        setExams(examsResult.data);
      }

      // Fetch students without exam
      const studentsResult = await studentApi.getAll();
      if (studentsResult.success) {
        setStudents(studentsResult.data.filter(s => s.status !== 'ujian' && s.status !== 'accepted' && s.status !== 'rejected'));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.tanggal_ujian || !formData.waktu_ujian) {
      alert('Lengkapi semua field wajib');
      return;
    }

    const result = await examApi.create(formData);
    
    if (result.success) {
      alert('Jadwal ujian berhasil dibuat');
      setShowForm(false);
      fetchData();
      setFormData({
        studentId: '',
        tanggal_ujian: '',
        waktu_ujian: '',
        ruangan: '',
        lokasi: 'Gedung Utama',
        mata_ujian: ['TPQ', 'Akademik', 'Wawancara']
      });
    } else {
      alert('Gagal membuat jadwal: ' + result.error);
    }
  };

  const handleGenerateCard = (exam) => {
    setSelectedExam(exam);
    setShowCardGenerator(true);
  };

  const handleDelete = async (examId) => {
    if (!confirm('Hapus jadwal ujian ini?')) return;

    const result = await examApi.delete(examId);
    if (result.success) {
      alert('Jadwal ujian dihapus');
      fetchData();
    } else {
      alert('Gagal menghapus: ' + result.error);
    }
  };

  const filteredExams = exams.filter(exam => {
    if (filter !== 'all' && exam.status !== filter) return false;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        exam.nomor_peserta?.toLowerCase().includes(term) ||
        exam.student?.nomor_pendaftaran?.toLowerCase().includes(term) ||
        exam.student?.data_siswa?.nama_lengkap?.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Terjadwal' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Selesai' }
    };
    return badges[status] || { color: 'bg-gray-100 text-gray-800', label: status };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6">
      {/* Compact Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b sticky top-16 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiCalendar className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-800">Jadwal Ujian</h1>
                <p className="text-xs text-gray-600">Kelola jadwal ujian seleksi PPDB</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-xs font-bold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FiPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Tambah Jadwal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {/* Stats - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <StatCard 
            title="Total Ujian" 
            value={exams.length} 
            icon={<FiCalendar className="w-5 h-5" />}
            color="from-blue-500 via-cyan-500 to-blue-600"
          />
          <StatCard 
            title="Terjadwal" 
            value={exams.filter(e => e.status === 'scheduled').length} 
            icon={<FiClock className="w-5 h-5" />}
            color="from-blue-500 via-purple-500 to-blue-600"
          />
          <StatCard 
            title="Selesai" 
            value={exams.filter(e => e.status === 'completed').length} 
            icon={<FiCheck className="w-5 h-5" />}
            color="from-green-500 via-emerald-500 to-green-600"
          />
          <StatCard 
            title="Peserta" 
            value={students.length} 
            icon={<FiUsers className="w-5 h-5" />}
            color="from-purple-500 via-pink-500 to-purple-600"
          />
        </div>

        {/* Filters - Compact */}
        <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-white/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex gap-2">
              <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                Semua ({exams.length})
              </FilterButton>
              <FilterButton active={filter === 'scheduled'} onClick={() => setFilter('scheduled')}>
                Terjadwal
              </FilterButton>
              <FilterButton active={filter === 'completed'} onClick={() => setFilter('completed')}>
                Selesai
              </FilterButton>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Cari no. peserta, nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Exams Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Peserta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Siswa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal & Waktu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExams.map((exam) => {
                  const statusBadge = getStatusBadge(exam.status);
                  return (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-medium text-gray-900">{exam.nomor_peserta}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {exam.student?.data_siswa?.nama_lengkap || '-'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {exam.student?.nomor_pendaftaran || '-'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {formatDate(exam.tanggal_ujian)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {exam.waktu_ujian}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{exam.ruangan}</div>
                        <div className="text-sm text-gray-500">{exam.lokasi}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleGenerateCard(exam)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <FiDownload className="w-4 h-4" />
                            Kartu
                          </button>
                          <button
                            onClick={() => handleDelete(exam.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Exam Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Tambah Jadwal Ujian</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Siswa <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Pilih Siswa</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.data_siswa?.nama_lengkap} - {student.nomor_pendaftaran}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Ujian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.tanggal_ujian}
                    onChange={(e) => setFormData({ ...formData, tanggal_ujian: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.waktu_ujian}
                    onChange={(e) => setFormData({ ...formData, waktu_ujian: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ruangan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ruangan}
                    onChange={(e) => setFormData({ ...formData, ruangan: e.target.value })}
                    placeholder="Contoh: R.101"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Card Generator Modal */}
      {showCardGenerator && selectedExam && (
        <ExamCardGenerator
          exam={selectedExam}
          onClose={() => setShowCardGenerator(false)}
        />
      )}
    </div>
  );
};

// Compact Components
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-white/50">
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-semibold truncate">{title}</p>
        <p className="text-2xl font-black text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
        {icon}
      </div>
    </div>
  </div>
);

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md hover:shadow-lg ${
      active
        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white scale-105'
        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
    }`}
  >
    {children}
  </button>
);

export default AdminExamSchedule;
