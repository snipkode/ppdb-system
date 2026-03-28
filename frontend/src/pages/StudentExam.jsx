import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiDownload, FiCheck, FiX } from 'react-icons/fi';
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
      
      // Fetch exam
      const examResult = await examApi.getByStudentId(id);
      if (examResult.success) {
        setExam(examResult.data);
        
        // Fetch student data
        const studentRef = examResult.data.student_id;
        // Student data is already included in exam
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data ujian...</p>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <FiX className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Jadwal Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">{error || 'Jadwal ujian belum tersedia'}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
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
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Terjadwal' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Selesai' }
    };
    return badges[status] || { color: 'bg-gray-100 text-gray-800', label: status };
  };

  const statusBadge = getStatusBadge(exam.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FiCalendar className="w-7 h-7 text-blue-600" />
                Informasi Ujian Seleksi
              </h1>
              <p className="text-gray-600 mt-1">
                No. Peserta: <span className="font-mono font-semibold">{exam.nomor_peserta}</span>
              </p>
            </div>
            {exam.status === 'scheduled' && (
              <button
                onClick={handleDownloadCard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FiDownload className="w-5 h-5" />
                Download Kartu Ujian
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Status Banner */}
        <div className={`rounded-lg p-6 ${
          exam.status === 'scheduled' 
            ? 'bg-blue-50 border border-blue-200' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              exam.status === 'scheduled' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-green-100 text-green-600'
            }`}>
              {exam.status === 'scheduled' ? <FiCalendar className="w-6 h-6" /> : <FiCheck className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {exam.status === 'scheduled' ? 'Ujian Terjadwal' : 'Ujian Selesai'}
              </h2>
              <p className="text-gray-600">
                {exam.status === 'scheduled' 
                  ? 'Silakan persiapkan diri Anda dan hadir tepat waktu' 
                  : `Status: ${exam.keterangan || '-'}`}
              </p>
              <div className="mt-3">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusBadge.color}`}>
                  {statusBadge.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Peserta</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nama Lengkap</p>
              <p className="font-medium text-gray-800">{student?.data_siswa?.nama_lengkap || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">No. Pendaftaran</p>
              <p className="font-medium text-gray-800">{student?.nomor_pendaftaran || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NISN</p>
              <p className="font-medium text-gray-800">{student?.data_siswa?.nisn || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Jurusan Pilihan</p>
              <p className="font-medium text-gray-800">{student?.pilihan_jurusan?.pilihan_1 || '-'}</p>
            </div>
          </div>
        </div>

        {/* Exam Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Ujian</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiCalendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Ujian</p>
                <p className="font-medium text-gray-800">{formatDate(exam.tanggal_ujian)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiClock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Waktu</p>
                <p className="font-medium text-gray-800">{exam.waktu_ujian || '-'}</p>
                <p className="text-sm text-gray-500">Hadir 30 menit sebelum ujian dimulai</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiMapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lokasi Ujian</p>
                <p className="font-medium text-gray-800">{exam.ruangan || '-'}</p>
                <p className="text-sm text-gray-500">{exam.lokasi || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mata Ujian</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {(exam.mata_ujian || ['TPQ', 'Akademik', 'Wawancara']).map((subject, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-300 transition-colors">
                <div className="text-2xl mb-2">
                  {subject === 'TPQ' ? '📖' : subject === 'Akademik' ? '✏️' : '🎤'}
                </div>
                <p className="font-medium text-gray-800">{subject}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results (if completed) */}
        {exam.status === 'completed' && exam.nilai && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hasil Ujian</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Nilai TPQ</span>
                <span className="font-medium text-gray-800">{exam.nilai.tpq}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Nilai Akademik</span>
                <span className="font-medium text-gray-800">{exam.nilai.akademik}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Nilai Wawancara</span>
                <span className="font-medium text-gray-800">{exam.nilai.wawancara}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-4 mt-4">
                <span className="font-semibold text-blue-800">Total Nilai</span>
                <span className="text-xl font-bold text-blue-600">{exam.nilai.total}</span>
              </div>
            </div>

            {exam.keterangan && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                exam.keterangan === 'Lulus' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-center font-bold ${
                  exam.keterangan === 'Lulus' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {exam.keterangan === 'Lulus' ? '🎉 SELAMAT! ANDA LULUS' : '😞 MAAF, ANDA BELUM LULUS'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Hal Penting:</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Hadir minimal 30 menit sebelum ujian dimulai</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Membawa kartu tanda peserta ujian (download di atas)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Membawa alat tulis sendiri (pensil, pulpen, penghapus)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Menggunakan pakaian rapi dan sopan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Tidak membawa HP, tas, atau barang berharga ke ruangan ujian</span>
            </li>
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

export default StudentExamPage;
