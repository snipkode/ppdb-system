import { useState, useEffect } from 'react';
import { FiEdit, FiCheck, FiX, FiAward } from 'react-icons/fi';
import examApi from '@/services/examApi';
import { studentApi } from '@/services/api';

const AdminExamResults = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResultForm, setShowResultForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filter, setFilter] = useState('scheduled'); // scheduled, completed
  const [searchTerm, setSearchTerm] = useState('');

  const [scores, setScores] = useState({
    tpq: '',
    akademik: '',
    wawancara: ''
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const result = await examApi.getAll();
      if (result.success) {
        setExams(result.data);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenResultForm = (exam) => {
    setSelectedExam(exam);
    setScores({
      tpq: exam.nilai?.tpq?.toString() || '',
      akademik: exam.nilai?.akademik?.toString() || '',
      wawancara: exam.nilai?.wawancara?.toString() || ''
    });
    setShowResultForm(true);
  };

  const handleSubmitScores = async (e) => {
    e.preventDefault();

    const scoreData = {
      tpq: parseInt(scores.tpq) || 0,
      akademik: parseInt(scores.akademik) || 0,
      wawancara: parseInt(scores.wawancara) || 0
    };

    // Validate scores (0-100)
    if (scoreData.tpq > 100 || scoreData.akademik > 100 || scoreData.wawancara > 100) {
      alert('Nilai maksimal adalah 100');
      return;
    }

    const result = await examApi.inputResults(selectedExam.id, scoreData);

    if (result.success) {
      alert(`Nilai berhasil disimpan. Siswa ${result.data.passed ? 'LULUS' : 'TIDAK LULUS'}`);
      setShowResultForm(false);
      fetchExams();
    } else {
      alert('Gagal menyimpan nilai: ' + result.error);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FiAward className="w-7 h-7 text-blue-600" />
                Input Nilai Ujian
              </h1>
              <p className="text-gray-600 mt-1">
                Kelola dan input nilai ujian seleksi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Peserta</p>
                <p className="text-2xl font-bold text-gray-800">{exams.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiAward className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Belum Dinilai</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {exams.filter(e => e.status === 'scheduled').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiEdit className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sudah Dinilai</p>
                <p className="text-2xl font-bold text-green-600">
                  {exams.filter(e => e.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua ({exams.length})
              </button>
              <button
                onClick={() => setFilter('scheduled')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'scheduled'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Belum Dinilai
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sudah Dinilai
              </button>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Ujian</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nilai</th>
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
                      </td>
                      <td className="px-6 py-4">
                        {exam.status === 'completed' && exam.nilai ? (
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-600">TPQ:</span> <span className="font-medium">{exam.nilai.tpq}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Akademik:</span> <span className="font-medium">{exam.nilai.akademik}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Wawancara:</span> <span className="font-medium">{exam.nilai.wawancara}</span>
                            </div>
                            <div className="text-sm font-bold text-blue-600">
                              Total: {exam.nilai.total}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                          {exam.keterangan && (
                            <div className={`text-xs font-medium ${
                              exam.keterangan === 'Lulus' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {exam.keterangan}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {exam.status === 'scheduled' ? (
                          <button
                            onClick={() => handleOpenResultForm(exam)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <FiEdit className="w-4 h-4" />
                            Input Nilai
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenResultForm(exam)}
                            className="text-green-600 hover:text-green-800 flex items-center gap-1"
                          >
                            <FiCheck className="w-4 h-4" />
                            Lihat Nilai
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Result Form Modal */}
      {showResultForm && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {selectedExam.status === 'completed' ? 'Detail Nilai' : 'Input Nilai Ujian'}
              </h2>
              <button onClick={() => setShowResultForm(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitScores} className="p-6 space-y-4">
              {/* Student Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">Peserta Ujian</p>
                <p className="font-medium text-gray-800">{selectedExam.student?.data_siswa?.nama_lengkap}</p>
                <p className="text-sm text-gray-500">{selectedExam.nomor_peserta}</p>
              </div>

              {/* Score Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nilai TPQ (0-100) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scores.tpq}
                  onChange={(e) => setScores({ ...scores, tpq: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={selectedExam.status === 'completed'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nilai Akademik (0-100) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scores.akademik}
                  onChange={(e) => setScores({ ...scores, akademik: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={selectedExam.status === 'completed'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nilai Wawancara (0-100) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scores.wawancara}
                  onChange={(e) => setScores({ ...scores, wawancara: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={selectedExam.status === 'completed'}
                />
              </div>

              {/* Preview Total */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800">Total Nilai:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {(parseInt(scores.tpq) || 0) + (parseInt(scores.akademik) || 0) + (parseInt(scores.wawancara) || 0)}
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Minimal kelulusan: 60 per mata ujian, 180 total
                </p>
              </div>

              {/* Actions */}
              {selectedExam.status === 'scheduled' && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowResultForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Simpan Nilai
                  </button>
                </div>
              )}

              {selectedExam.status === 'completed' && (
                <div className="pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowResultForm(false)}
                    className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Tutup
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExamResults;
