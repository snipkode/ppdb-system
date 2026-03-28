import { useState, useEffect } from 'react';
import { FiEdit, FiCheck, FiX, FiAward, FiClipboard, FiTrendingUp } from 'react-icons/fi';
import examApi from '@/services/examApi';
import { studentApi } from '@/services/api';
import { EmptyStateExamResults as EmptyState } from '@/components/ui/EmptyState';
import AdminLayout from '@/components/layout/AdminLayout';
import StatCard from '@/components/ui/StatCard';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import Breadcrumb from '@/components/ui/Breadcrumb';

const AdminExamResults = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showResultForm, setShowResultForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [filter, setFilter] = useState('scheduled');
  const [searchTerm, setSearchTerm] = useState('');
  const [scores, setScores] = useState({ tpq: '', akademik: '', wawancara: '' });

  useEffect(() => { fetchExams(); }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const result = await examApi.getAll();
      if (result.success) setExams(result.data);
    } catch (error) {
      console.error('Error:', error);
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

    if (Object.values(scoreData).some(s => s > 100)) {
      alert('Nilai maksimal 100');
      return;
    }

    const result = await examApi.inputResults(selectedExam.id, scoreData);
    if (result.success) {
      alert(`Nilai disimpan. ${result.data.passed ? 'LULUS' : 'TIDAK LULUS'}`);
      setShowResultForm(false);
      fetchExams();
    } else {
      alert('Gagal: ' + result.error);
    }
  };

  const filteredExams = exams.filter(exam => {
    if (filter !== 'all' && exam.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return exam.nomor_peserta?.toLowerCase().includes(term) ||
             exam.student?.nomor_pendaftaran?.toLowerCase().includes(term) ||
             exam.student?.data_siswa?.nama_lengkap?.toLowerCase().includes(term);
    }
    return true;
  });

  const formatDate = (ts) => {
    if (!ts) return '-';
    const date = ts.toDate?.() || new Date(ts);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const stats = {
    total: exams.length,
    scheduled: exams.filter(e => e.status === 'scheduled').length,
    completed: exams.filter(e => e.status === 'completed').length,
    passed: exams.filter(e => e.keterangan === 'Lulus').length
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-center"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p className="text-gray-600">Loading...</p></div></div>;

  return (
    <AdminLayout title="Input Nilai Ujian" subtitle="Kelola nilai ujian seleksi PPDB">
      {/* Breadcrumb */}
      <div className="bg-white border-b sticky top-14 z-30">
        <div className="container mx-auto px-4 py-2">
          <Breadcrumb showHome={false} items={[{ label: 'Nilai Ujian', href: '/admin/exam-results' }]} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <FiAward className="w-6 h-6" />
                Input Nilai Ujian
              </h1>
              <p className="text-white/80 text-xs mt-1">Kelola nilai ujian seleksi PPDB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<FiAward />} label="Total Peserta" value={stats.total} color="from-blue-500 to-cyan-500" size="md" />
          <StatCard icon={<FiClipboard />} label="Belum Dinilai" value={stats.scheduled} color="from-yellow-500 to-orange-500" size="md" />
          <StatCard icon={<FiCheck />} label="Sudah Dinilai" value={stats.completed} color="from-green-500 to-emerald-500" size="md" />
          <StatCard icon={<FiTrendingUp />} label="Lulus" value={stats.passed} color="from-purple-500 to-pink-500" size="md" />
        </div>

        {/* Tabs & Search */}
        <div className="bg-white rounded-xl shadow-lg p-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex gap-1.5 flex-1">
              {[
                { id: 'all', label: 'Semua', count: stats.total },
                { id: 'scheduled', label: 'Belum Dinilai', count: stats.scheduled },
                { id: 'completed', label: 'Sudah Dinilai', count: stats.completed }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold text-xs transition-all ${
                    filter === tab.id
                      ? tab.id === 'scheduled' ? 'bg-yellow-500 text-white' :
                        tab.id === 'completed' ? 'bg-green-500 text-white' :
                        'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <div className="relative md:w-64">
              <input
                type="text"
                placeholder="Cari peserta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table or Empty State */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredExams.length === 0 ? (
            <EmptyState filter={filter} hasSearch={searchTerm.length > 0} />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700 text-xs">No. Peserta</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700 text-xs">Nama Siswa</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700 text-xs">Tanggal</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700 text-xs">Nilai</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700 text-xs">Status</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700 text-xs">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} className="border-t hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2 font-mono text-xs">{exam.nomor_peserta}</td>
                      <td className="px-4 py-2">
                        <div>
                          <div className="font-medium text-gray-900">{exam.student?.data_siswa?.nama_lengkap || '-'}</div>
                          <div className="text-xs text-gray-500">{exam.student?.nomor_pendaftaran}</div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs">{formatDate(exam.tanggal_ujian)}</td>
                      <td className="px-4 py-2">
                        {exam.status === 'completed' && exam.nilai ? (
                          <div className="space-y-0.5">
                            <div className="text-xs"><span className="text-gray-500">TPQ:</span> <span className="font-medium">{exam.nilai.tpq}</span></div>
                            <div className="text-xs"><span className="text-gray-500">Akd:</span> <span className="font-medium">{exam.nilai.akademik}</span></div>
                            <div className="text-xs"><span className="text-gray-500">Waw:</span> <span className="font-medium">{exam.nilai.wawancara}</span></div>
                            <div className="text-xs font-bold text-blue-600">Total: {exam.nilai.total}</div>
                          </div>
                        ) : <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-2">
                        <div className="space-y-1">
                          <StatusBadge status={exam.status} />
                          {exam.keterangan && (
                            <div className={`text-xs font-bold ${exam.keterangan === 'Lulus' ? 'text-green-600' : 'text-red-600'}`}>
                              {exam.keterangan}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleOpenResultForm(exam)}
                          className={`flex items-center gap-1.5 font-medium text-xs ${
                            exam.status === 'completed'
                              ? 'text-green-600 hover:text-green-800'
                              : 'text-blue-600 hover:text-blue-800'
                          }`}
                        >
                          {exam.status === 'completed' ? <><FiCheck className="w-3.5 h-3.5" /> Lihat</> : <><FiEdit className="w-3.5 h-3.5" /> Input</>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Result Form Modal */}
      {showResultForm && selectedExam && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {selectedExam.status === 'completed' ? '📊 Detail Nilai' : '✏️ Input Nilai'}
              </h2>
              <button onClick={() => setShowResultForm(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitScores} className="p-5 space-y-4">
              {/* Student Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <p className="text-xs text-gray-600 mb-1">Peserta Ujian</p>
                <p className="font-bold text-gray-800">{selectedExam.student?.data_siswa?.nama_lengkap}</p>
                <p className="text-xs text-gray-500 font-mono">{selectedExam.nomor_peserta}</p>
                {selectedExam.status === 'completed' && (
                  <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    selectedExam.keterangan === 'Lulus' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedExam.keterangan}
                  </div>
                )}
              </div>

              {/* Score Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <ScoreInput label="TPQ" value={scores.tpq} onChange={(v) => setScores({...scores, tpq: v})} disabled={selectedExam.status === 'completed'} />
                <ScoreInput label="Akademik" value={scores.akademik} onChange={(v) => setScores({...scores, akademik: v})} disabled={selectedExam.status === 'completed'} />
                <ScoreInput label="Wawancara" value={scores.wawancara} onChange={(v) => setScores({...scores, wawancara: v})} disabled={selectedExam.status === 'completed'} />
              </div>

              {/* Total Preview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800 font-medium">Total Nilai:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {(parseInt(scores.tpq)||0) + (parseInt(scores.akademik)||0) + (parseInt(scores.wawancara)||0)}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-xs text-blue-600">
                  <span>Rata-rata: {((parseInt(scores.tpq)||0) + (parseInt(scores.akademik)||0) + (parseInt(scores.wawancara)||0)) / 3 || 0}</span>
                  <span>Min. Lulus: 60/mapel</span>
                </div>
              </div>

              {/* Actions */}
              {selectedExam.status === 'scheduled' ? (
                <div className="flex gap-3 pt-3 border-t">
                  <button type="button" onClick={() => setShowResultForm(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm">Batal</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg font-medium text-sm">Simpan Nilai</button>
                </div>
              ) : (
                <button type="button" onClick={() => setShowResultForm(false)} className="w-full px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium text-sm">Tutup</button>
              )}
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

const ScoreInput = ({ label, value, onChange, disabled }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
    <input type="number" min="0" max="100" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}
      className="w-full px-2 py-2 border border-gray-300 rounded-lg text-center text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100" required />
  </div>
);

export default AdminExamResults;
