import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiDownload, FiCheck, FiX, FiAward, FiUser, FiBook, FiTrophy } from 'react-icons/fi';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm font-medium animate-pulse">Memuat data ujian...</p>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiX className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Jadwal Tidak Ditemukan</h2>
          <p className="text-gray-600 text-sm mb-6">{error || 'Jadwal ujian belum tersedia'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl transition-all font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105"
          >
            ← Kembali ke Beranda
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
      scheduled: { 
        gradient: 'from-blue-500 via-cyan-500 to-blue-600', 
        bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', 
        text: 'text-blue-700', 
        label: 'Terjadwal', 
        icon: <FiCalendar />,
        border: 'border-blue-200'
      },
      completed: { 
        gradient: 'from-green-500 via-emerald-500 to-green-600', 
        bg: 'bg-gradient-to-br from-green-50 to-emerald-50', 
        text: 'text-green-700', 
        label: 'Selesai', 
        icon: <FiCheck />,
        border: 'border-green-200'
      }
    };
    return badges[status] || { gradient: 'from-gray-500', bg: 'bg-gray-50', text: 'text-gray-700', label: status, icon: <FiClock />, border: 'border-gray-200' };
  };

  const statusBadge = getStatusBadge(exam.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 md:py-6">
      {/* Compact Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b sticky top-16 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiCalendar className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base md:text-lg font-black text-gray-800">Ujian Seleksi</h1>
                <p className="text-xs text-gray-600 font-mono">No: <span className="font-bold">{exam.nomor_peserta}</span></p>
              </div>
            </div>
            {exam.status === 'scheduled' && (
              <button
                onClick={handleDownloadCard}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiDownload className="w-4 h-4" />
                <span className="hidden sm:inline">Kartu Ujian</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
        {/* Status Banner - Enhanced */}
        <div className={`${statusBadge.bg} border-2 ${statusBadge.border} rounded-3xl p-4 backdrop-blur-sm shadow-lg`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statusBadge.gradient} flex items-center justify-center text-white shadow-xl flex-shrink-0`}>
              {statusBadge.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={`text-lg font-black ${statusBadge.text} mb-1`}>
                {exam.status === 'scheduled' ? 'Ujian Terjadwal' : 'Ujian Selesai'}
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                {exam.status === 'scheduled'
                  ? 'Persiapkan diri dan hadir tepat waktu'
                  : `Status: ${exam.keterangan || '-'}`}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-bold ${statusBadge.bg} ${statusBadge.text} border-2 ${statusBadge.border} shadow-md`}>
              {statusBadge.label}
            </span>
          </div>
        </div>

        {/* Info Grid - Enhanced */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* Student Info */}
          <div className="bg-white rounded-3xl shadow-xl p-4 border-2 border-white/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiUser className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-gray-800">Data Peserta</h3>
            </div>
            <div className="space-y-2.5">
              <InfoRow label="Nama" value={student?.data_siswa?.nama_lengkap || '-'} />
              <InfoRow label="No. Daftar" value={student?.nomor_pendaftaran || '-'} />
              <InfoRow label="NISN" value={student?.data_siswa?.nisn || '-'} />
              <InfoRow label="Jurusan" value={student?.pilihan_jurusan?.pilihan_1 || '-'} />
            </div>
          </div>

          {/* Exam Info */}
          <div className="bg-white rounded-3xl shadow-xl p-4 border-2 border-white/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <FiBook className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-gray-800">Detail Ujian</h3>
            </div>
            <div className="space-y-2.5">
              <InfoRow 
                label="Tanggal" 
                value={formatDate(exam.tanggal_ujian)}
                icon={<FiCalendar className="w-4 h-4 text-blue-500" />}
              />
              <InfoRow 
                label="Waktu" 
                value={exam.waktu_ujian || '-'}
                icon={<FiClock className="w-4 h-4 text-purple-500" />}
              />
              <InfoRow 
                label="Lokasi" 
                value={`${exam.ruangan || '-'}, ${exam.lokasi || '-'}`}
                icon={<FiMapPin className="w-4 h-4 text-pink-500" />}
              />
            </div>
          </div>
        </div>

        {/* Subjects - Enhanced */}
        <div className="bg-white rounded-3xl shadow-xl p-4 border-2 border-white/50">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
            <h3 className="text-sm font-black text-gray-800">Mata Ujian</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(exam.mata_ujian || ['TPQ', 'Akademik', 'Wawancara']).map((subject, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-2xl p-3 text-center border-2 border-gray-100 hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-2xl mb-1.5 group-hover:scale-125 transition-transform duration-300">
                  {subject === 'TPQ' ? '📖' : subject === 'Akademik' ? '✏️' : '🎤'}
                </div>
                <p className="text-xs font-bold text-gray-700">{subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results - Enhanced */}
        {exam.status === 'completed' && exam.nilai && (
          <div className="bg-white rounded-3xl shadow-xl p-4 border-2 border-white/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full"></div>
              <h3 className="text-sm font-black text-gray-800 flex items-center gap-2">
                <FiTrophy className="w-4 h-4 text-yellow-500" />
                Hasil Ujian
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <ScoreCard label="TPQ" score={exam.nilai.tpq} color="from-blue-500 via-cyan-500 to-blue-600" icon="📖" />
              <ScoreCard label="Akademik" score={exam.nilai.akademik} color="from-purple-500 via-pink-500 to-purple-600" icon="✏️" />
              <ScoreCard label="Wawancara" score={exam.nilai.wawancara} color="from-green-500 via-emerald-500 to-green-600" icon="🎤" />
            </div>
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-4 text-center shadow-xl">
              <p className="text-xs text-white/90 font-semibold mb-1">Total Nilai</p>
              <p className="text-3xl font-black text-white drop-shadow-lg">{exam.nilai.total}</p>
            </div>

            {exam.keterangan && (
              <div className={`mt-4 p-5 rounded-2xl border-2 text-center ${
                exam.keterangan === 'Lulus'
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                  : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300'
              }`}>
                <p className={`text-lg font-black ${
                  exam.keterangan === 'Lulus' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {exam.keterangan === 'Lulus' ? '🎉 SELAMAT! ANDA LULUS' : '😞 MAAF, BELUM LULUS'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Important Notes - Enhanced */}
        <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-300 rounded-3xl p-4 shadow-lg">
          <h3 className="font-black text-yellow-800 mb-3 text-sm flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            Hal Penting:
          </h3>
          <ul className="space-y-2 text-xs text-yellow-700 font-medium">
            {[
              { icon: '⏰', text: 'Hadir 30 menit sebelum ujian' },
              { icon: '🎫', text: 'Bawa kartu peserta ujian' },
              { icon: '✏️', text: 'Bawa alat tulis sendiri' },
              { icon: '👔', text: 'Pakaian rapi dan sopan' },
              { icon: '📵', text: 'Tidak bawa HP/tas ke ruangan' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
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

// Enhanced Components
const InfoRow = ({ label, value, icon }) => (
  <div className="flex items-center gap-2 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-2.5 border border-gray-100">
    {icon && <div className="flex-shrink-0">{icon}</div>}
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 font-semibold">{label}</p>
      <p className="text-sm font-bold text-gray-800 truncate">{value}</p>
    </div>
  </div>
);

const ScoreCard = ({ label, score, color, icon }) => (
  <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-2xl p-3 text-center border-2 border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
    <div className="text-lg mb-1">{icon}</div>
    <p className="text-xs text-gray-500 font-semibold mb-1">{label}</p>
    <div className={`text-xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      {score}
    </div>
  </div>
);

export default StudentExamPage;
