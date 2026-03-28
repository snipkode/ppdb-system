import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiDownload, FiCheck, FiX, FiAward, FiUser, FiBook } from 'react-icons/fi';
import examApi from '@/services/examApi';
import ExamCardGenerator from '@/components/admin/ExamCardGenerator';

const StudentExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCardGenerator, setShowCardGenerator] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExamData();
  }, [id]);

  const fetchExamData = async () => {
    try {
      setLoading(true);
      const examResult = await examApi.getByStudentId(id);
      if (examResult.success) {
        setExam(examResult.data);
        setStudent(examResult.data.student);
      } else {
        setError('Jadwal ujian belum tersedia');
      }
    } catch (err) {
      setError('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCard = () => {
    setShowCardGenerator(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 text-sm font-medium">Memuat data ujian...</p>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiX className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Jadwal Tidak Ditemukan</h2>
          <p className="text-gray-600 text-sm mb-5">{error || 'Jadwal ujian belum tersedia'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl transition-all font-medium text-sm shadow-lg hover:shadow-xl"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: { color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-700', label: 'Terjadwal', icon: <FiCalendar /> },
      completed: { color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'text-green-700', label: 'Selesai', icon: <FiCheck /> }
    };
    return badges[status] || { color: 'from-gray-500', bg: 'bg-gray-50', text: 'text-gray-700', label: status, icon: <FiClock /> };
  };

  const statusBadge = getStatusBadge(exam.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6">
      {/* Compact Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <FiCalendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <span className="hidden sm:inline">Ujian Seleksi</span>
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5 font-mono">
                No. Peserta: <span className="font-semibold">{exam.nomor_peserta}</span>
              </p>
            </div>
            {exam.status === 'scheduled' && (
              <button
                onClick={handleDownloadCard}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiDownload className="w-4 h-4" />
                <span className="hidden sm:inline">Kartu Ujian</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Status Banner - Compact */}
        <div className={`${statusBadge.bg} border border-white/50 rounded-2xl p-4 backdrop-blur-sm`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statusBadge.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
              {statusBadge.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={`text-base font-bold ${statusBadge.text} mb-0.5`}>
                {exam.status === 'scheduled' ? 'Ujian Terjadwal' : 'Ujian Selesai'}
              </h2>
              <p className="text-xs text-gray-600 truncate">
                {exam.status === 'scheduled'
                  ? 'Persiapkan diri dan hadir tepat waktu'
                  : `Status: ${exam.keterangan || '-'}`}
              </p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text} border`}>
              {statusBadge.label}
            </span>
          </div>
        </div>

        {/* Info Grid - Compact */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Student Info */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-white/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                <FiUser className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">Data Peserta</h3>
            </div>
            <div className="space-y-2.5">
              <InfoRow label="Nama" value={student?.data_siswa?.nama_lengkap || '-'} />
              <InfoRow label="No. Daftar" value={student?.nomor_pendaftaran || '-'} />
              <InfoRow label="NISN" value={student?.data_siswa?.nisn || '-'} />
              <InfoRow label="Jurusan" value={student?.pilihan_jurusan?.pilihan_1 || '-'} />
            </div>
          </div>

          {/* Exam Info */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-white/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                <FiBook className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">Detail Ujian</h3>
            </div>
            <div className="space-y-2.5">
              <InfoRow 
                label="Tanggal" 
                value={formatDate(exam.tanggal_ujian)}
                icon={<FiCalendar className="w-3.5 h-3.5 text-blue-500" />}
              />
              <InfoRow 
                label="Waktu" 
                value={exam.waktu_ujian || '-'}
                icon={<FiClock className="w-3.5 h-3.5 text-purple-500" />}
              />
              <InfoRow 
                label="Lokasi" 
                value={`${exam.ruangan || '-'}, ${exam.lokasi || '-'}`}
                icon={<FiMapPin className="w-3.5 h-3.5 text-pink-500" />}
              />
            </div>
          </div>
        </div>

        {/* Subjects - Compact Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-white/50">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            Mata Ujian
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {(exam.mata_ujian || ['TPQ', 'Akademik', 'Wawancara']).map((subject, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-3 text-center border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-xl mb-1.5 group-hover:scale-110 transition-transform">
                  {subject === 'TPQ' ? '📖' : subject === 'Akademik' ? '✏️' : '🎤'}
                </div>
                <p className="text-xs font-semibold text-gray-700">{subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results - Compact */}
        {exam.status === 'completed' && exam.nilai && (
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-white/50">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              Hasil Ujian
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <ScoreCard label="TPQ" score={exam.nilai.tpq} color="from-blue-500 to-cyan-500" />
              <ScoreCard label="Akademik" score={exam.nilai.akademik} color="from-purple-500 to-pink-500" />
              <ScoreCard label="Wawancara" score={exam.nilai.wawancara} color="from-green-500 to-emerald-500" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3 text-center">
              <p className="text-xs text-white/80 mb-0.5">Total Nilai</p>
              <p className="text-2xl font-bold text-white">{exam.nilai.total}</p>
            </div>

            {exam.keterangan && (
              <div className={`mt-4 p-4 rounded-xl border-2 text-center ${
                exam.keterangan === 'Lulus'
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}>
                <p className={`text-base font-black ${
                  exam.keterangan === 'Lulus' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {exam.keterangan === 'Lulus' ? '🎉 SELAMAT! ANDA LULUS' : '😞 MAAF, BELUM LULUS'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Important Notes - Compact */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
          <h3 className="font-bold text-yellow-800 mb-2.5 text-sm flex items-center gap-2">
            <span className="text-base">⚠️</span>
            Hal Penting:
          </h3>
          <ul className="space-y-1.5 text-xs text-yellow-700">
            {[
              'Hadir 30 menit sebelum ujian',
              'Bawa kartu peserta ujian',
              'Bawa alat tulis sendiri',
              'Pakaian rapi dan sopan',
              'Tidak bawa HP/tas ke ruangan'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-yellow-600 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Generator Modal */}
      {showCardGenerator && (
        <ExamCardGenerator
          exam={{ ...exam, student }}
          onClose={() => setShowCardGenerator(false)}
        />
      )}
    </div>
  );
};

// Compact Components
const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-start gap-2">
    {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
    </div>
  </div>
);

const ScoreCard = ({ label, score, color }) => (
  <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-3 text-center border border-gray-100">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      {score}
    </div>
  </div>
);

export default StudentExamPage;
