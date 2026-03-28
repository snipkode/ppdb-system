import { useState } from 'react';
import { studentApi } from '@/services/api';
import { FiSearch, FiCheck, FiClipboard, FiCalendar, FiUser } from 'react-icons/fi';

const Status = () => {
  const [searchType, setSearchType] = useState('nomor'); // 'nomor' or 'nisn'
  const [nomorPendaftaran, setNomorPendaftaran] = useState('');
  const [nisn, setNisn] = useState('');
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setStudent(null);

    try {
      let result;
      
      if (searchType === 'nomor') {
        if (!nomorPendaftaran.trim()) {
          setError('Masukkan nomor pendaftaran');
          setLoading(false);
          return;
        }
        result = await studentApi.getByNomorPendaftaran(nomorPendaftaran.trim());
      } else {
        if (!nisn.trim()) {
          setError('Masukkan NISN');
          setLoading(false);
          return;
        }
        // Fallback: search all and filter (since Firestore doesn't support multiple where on different fields)
        const allStudents = await studentApi.getAll();
        if (allStudents.success) {
          const found = allStudents.data.find(s => s.data_siswa?.nisn === nisn.trim());
          result = found ? { success: true, data: found } : { success: false, error: 'Tidak ditemukan' };
        } else {
          result = allStudents;
        }
      }

      if (result.success && result.data) {
        setStudent(result.data);
      } else {
        setError('Data tidak ditemukan. Periksa kembali nomor pendaftaran atau NISN Anda.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        label: 'Pending',
        icon: '⏳'
      },
      verified: {
        color: 'bg-blue-100 text-blue-800 border-blue-300',
        label: 'Terverifikasi',
        icon: '✓'
      },
      ujian: {
        color: 'bg-purple-100 text-purple-800 border-purple-300',
        label: 'Jadwal Ujian',
        icon: '📝'
      },
      accepted: {
        color: 'bg-green-100 text-green-800 border-green-300',
        label: 'Diterima',
        icon: '🎉'
      },
      rejected: {
        color: 'bg-red-100 text-red-800 border-red-300',
        label: 'Ditolak',
        icon: '✗'
      }
    };
    return badges[status] || badges.pending;
  };

  const timelineSteps = [
    { 
      status: 'pending', 
      label: 'Pendaftaran Diterima', 
      desc: 'Pendaftaran berhasil dikirim',
      icon: FiClipboard
    },
    { 
      status: 'verified', 
      label: 'Verifikasi Berkas', 
      desc: 'Berkas sedang diverifikasi',
      icon: FiCheck
    },
    { 
      status: 'ujian', 
      label: 'Ujian Seleksi', 
      desc: 'Jadwal ujian akan diumumkan',
      icon: FiCalendar
    },
    { 
      status: 'accepted', 
      label: 'Hasil Seleksi', 
      desc: 'Pengumuman kelulusan',
      icon: FiUser
    }
  ];

  const getCurrentStep = (status) => {
    const steps = {
      pending: 0,
      verified: 1,
      ujian: 2,
      accepted: 3,
      rejected: 3
    };
    return steps[status] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cek Status Pendaftaran
          </h1>
          <p className="text-gray-600">
            Masukkan nomor pendaftaran atau NISN untuk melihat status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSearchType('nomor')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                searchType === 'nomor'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Nomor Pendaftaran
            </button>
            <button
              onClick={() => setSearchType('nisn')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                searchType === 'nisn'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              NISN
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'nomor' ? 'Nomor Pendaftaran' : 'NISN'}
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchType === 'nomor' ? nomorPendaftaran : nisn}
                  onChange={(e) => searchType === 'nomor' ? setNomorPendaftaran(e.target.value) : setNisn(e.target.value)}
                  className="input-field flex-1"
                  placeholder={searchType === 'nomor' ? 'PPDB-xxxxxxxxxx' : '10 digit NISN'}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <FiSearch />
                  <span>{loading ? 'Mencari...' : 'Cari'}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Result */}
        {student && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Student Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-start justify-between mb-6 pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {student.data_siswa?.nama_lengkap}
                  </h2>
                  <p className="text-gray-600">
                    {student.nomor_pendaftaran}
                  </p>
                </div>
                {student.status && (
                  <div className={`px-4 py-2 rounded-full font-semibold border-2 ${getStatusBadge(student.status).color}`}>
                    <span className="mr-2">{getStatusBadge(student.status).icon}</span>
                    {getStatusBadge(student.status).label}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FiUser className="w-4 h-4" />
                    <span>NISN</span>
                  </div>
                  <p className="font-semibold text-gray-800">{student.data_siswa?.nisn || '-'}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FiClipboard className="w-4 h-4" />
                    <span>Jurusan Dipilih</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {student.pilihan_jurusan?.pilihan_1 || '-'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FiCalendar className="w-4 h-4" />
                    <span>Tanggal Daftar</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {student.status_detail?.submitted_at 
                      ? new Date(student.status_detail.submitted_at.seconds * 1000).toLocaleDateString('id-ID')
                      : '-'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <FiCheck className="w-4 h-4" />
                    <span>Status Berkas</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {student.status_detail?.verified_at ? '✓ Terverifikasi' : '⏳ Belum diverifikasi'}
                  </p>
                </div>
              </div>

              {student.status_detail?.notes && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Catatan dari Admin:</h4>
                  <p className="text-blue-700 text-sm">{student.status_detail.notes}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Timeline Pendaftaran
              </h3>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 md:left-8 top-4 bottom-4 w-0.5 bg-gray-200">
                  <div 
                    className="w-full bg-primary-600 transition-all duration-500"
                    style={{ 
                      height: `${((getCurrentStep(student.status) + 1) / 4) * 100}%` 
                    }}
                  />
                </div>

                {/* Steps */}
                <div className="space-y-6">
                  {timelineSteps.map((step, index) => {
                    const currentStep = getCurrentStep(student.status);
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;
                    const Icon = step.icon;

                    return (
                      <div key={step.status} className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isCompleted
                              ? 'bg-primary-600 border-primary-600 text-white'
                              : 'bg-white border-gray-300 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-primary-200 scale-110' : ''}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <h4 className={`font-semibold ${isCurrent ? 'text-primary-600' : 'text-gray-800'}`}>
                            {step.label}
                          </h4>
                          <p className="text-sm text-gray-500">{step.desc}</p>
                          
                          {isCurrent && student.status === 'accepted' && (
                            <div className="mt-2 text-green-600 text-sm font-medium">
                              🎉 Selamat! Anda telah diterima
                            </div>
                          )}
                          
                          {isCurrent && student.status === 'rejected' && (
                            <div className="mt-2 text-red-600 text-sm font-medium">
                              Maaf, Anda belum diterima
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-semibold text-green-800 mb-3">
                ℹ️ Informasi Selanjutnya
              </h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Pantau status pendaftaran Anda secara berkala</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Periksa email/SMS untuk informasi verifikasi dan ujian</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Hubungi admin jika ada pertanyaan: (021) 1234-5678</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Empty State (when no result yet) */}
        {!student && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500">
              Masukkan nomor pendaftaran atau NISN untuk melihat status
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
