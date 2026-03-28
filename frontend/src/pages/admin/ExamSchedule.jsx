import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiPlus, FiDownload, FiTrash2, FiCheck, FiSearch, FiX } from 'react-icons/fi';
import examApi from '@/services/examApi';
import { studentApi } from '@/services/api';
import ExamCardGenerator from '@/components/admin/ExamCardGenerator';
import { EmptyState } from '@/components/ui/EmptyState';
import AdminLayout from '@/components/layout/AdminLayout';

const AdminExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showCardGenerator, setShowCardGenerator] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filter, setFilter] = useState('all');
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
      const [examsResult, studentsResult] = await Promise.all([
        examApi.getAll(),
        studentApi.getAll()
      ]);

      if (examsResult.success) setExams(examsResult.data);
      if (studentsResult.success) {
        setStudents(studentsResult.data.filter(s =>
          !['ujian', 'accepted', 'rejected'].includes(s.status)
        ));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await examApi.create(formData);

    if (result.success) {
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
    }
  };

  const handleDelete = async (examId) => {
    if (!confirm('Hapus jadwal ujian ini?')) return;
    await examApi.delete(examId);
    fetchData();
  };

  const filteredExams = exams.filter(exam => {
    if (filter !== 'all' && exam.status !== filter) return false;
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    return (
      exam.nomor_peserta?.toLowerCase().includes(term) ||
      exam.student?.nomor_pendaftaran?.toLowerCase().includes(term) ||
      exam.student?.data_siswa?.nama_lengkap?.toLowerCase().includes(term)
    );
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const stats = {
    total: exams.length,
    scheduled: exams.filter(e => e.status === 'scheduled').length,
    completed: exams.filter(e => e.status === 'completed').length,
    students: students.length
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-14 z-30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Jadwal Ujian</h1>
                <p className="text-xs text-gray-500">Kelola jadwal ujian seleksi</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg rounded-lg transition-all text-white text-sm font-semibold"
              >
                <FiPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Tambah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            <StatItem label="Total" value={stats.total} color="bg-blue-500" />
            <StatItem label="Terjadwal" value={stats.scheduled} color="bg-purple-500" />
            <StatItem label="Selesai" value={stats.completed} color="bg-green-500" />
            <StatItem label="Peserta" value={stats.students} color="bg-orange-500" />
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 pb-3">
          <div className="bg-white rounded-lg shadow-sm border p-2">
            <div className="flex gap-2">
              <div className="flex gap-1 overflow-x-auto flex-1">
                {[
                  { key: 'all', label: 'Semua', count: stats.total },
                  { key: 'scheduled', label: 'Terjadwal', count: stats.scheduled },
                  { key: 'completed', label: 'Selesai', count: stats.completed }
                ].map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                      filter === key
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label} ({count})
                  </button>
                ))}
              </div>

              <div className="relative w-40 md:w-56">
                <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 pb-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-500 text-xs">Memuat...</p>
              </div>
            </div>
          ) : filteredExams.length === 0 ? (
            <EmptyState
              type={searchTerm ? 'noResults' : 'default'}
              title={searchTerm ? 'Jadwal Tidak Ditemukan' : 'Belum Ada Jadwal'}
              message={searchTerm
                ? `Tidak ada jadwal yang cocok dengan "${searchTerm}"`
                : 'Tambahkan jadwal ujian untuk siswa'
              }
              actionLabel={!searchTerm ? 'Tambah Jadwal' : null}
              onAction={!searchTerm ? () => setShowForm(true) : () => setSearchTerm('')}
            />
          ) : (
            <div className="space-y-1.5">
              {filteredExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  formatDate={formatDate}
                  onGenerateCard={() => {
                    setSelectedExam(exam);
                    setShowCardGenerator(true);
                  }}
                  onDelete={() => handleDelete(exam.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Form Modal */}
      {showForm && (
        <Modal
          title="Tambah Jadwal Ujian"
          onClose={() => setShowForm(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Siswa <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.tanggal_ujian}
                  onChange={(e) => setFormData({ ...formData, tanggal_ujian: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Waktu <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={formData.waktu_ujian}
                  onChange={(e) => setFormData({ ...formData, waktu_ujian: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Ruangan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.ruangan}
                  onChange={(e) => setFormData({ ...formData, ruangan: e.target.value })}
                  placeholder="R.101"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg text-sm font-medium"
              >
                Simpan
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Card Generator Modal */}
      {showCardGenerator && selectedExam && (
        <ExamCardGenerator
          exam={selectedExam}
          onClose={() => setShowCardGenerator(false)}
        />
      )}
    </AdminLayout>
  );
};

// Stat Item
const StatItem = ({ label, value, color }) => (
  <div className="bg-white rounded-lg p-2.5 border text-center">
    <div className={`text-2xl font-bold ${color.replace('bg-', 'text-')}`}>{value}</div>
    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
  </div>
);

// Compact Exam Card
const ExamCard = ({ exam, formatDate, onGenerateCard, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border hover:border-purple-300 hover:shadow-md transition-all p-3">
      <div className="flex items-center gap-3">
        {/* Status */}
        <div className={`w-1.5 h-10 rounded-full flex-shrink-0 ${
          exam.status === 'scheduled' ? 'bg-blue-500' : 'bg-green-500'
        }`} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {exam.student?.data_siswa?.nama_lengkap || '-'}
            </p>
            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
              exam.status === 'scheduled' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {exam.status === 'scheduled' ? 'Terjadwal' : 'Selesai'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3 text-purple-600" />
              {formatDate(exam.tanggal_ujian)}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-3 h-3 text-purple-600" />
              {exam.waktu_ujian}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin className="w-3 h-3 text-purple-600" />
              {exam.ruangan}
            </span>
          </div>

          <p className="text-[10px] text-gray-400 mt-1 font-mono truncate">
            {exam.nomor_peserta} • {exam.student?.nomor_pendaftaran}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            onClick={onGenerateCard}
            className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
            title="Download Kartu"
          >
            <FiDownload className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
            title="Hapus"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <FiX className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  </div>
);

export default AdminExamSchedule;
