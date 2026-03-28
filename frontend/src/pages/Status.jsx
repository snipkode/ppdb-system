import { useState } from 'react';
import { studentApi } from '@/services/api';
import { 
  FiSearch, FiCheck, FiClipboard, FiCalendar, FiUser, 
  FiAward, FiX, FiClock, FiChevronRight, FiFileText 
} from 'react-icons/fi';

const Status = () => {
  const [searchType, setSearchType] = useState('nomor');
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
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-700',
        label: 'Pending',
        icon: '⏳',
        message: 'Pendaftaran sedang diproses'
      },
      verified: {
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        label: 'Terverifikasi',
        icon: '✓',
        message: 'Berkas telah diverifikasi'
      },
      ujian: {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        label: 'Jadwal Ujian',
        icon: '📝',
        message: 'Siap mengikuti ujian'
      },
      accepted: {
        gradient: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        label: 'Diterima',
        icon: '🎉',
        message: 'Selamat! Anda telah diterima'
      },
      rejected: {
        gradient: 'from-red-500 to-rose-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        label: 'Ditolak',
        icon: '✗',
        message: 'Maaf, pendaftaran ditolak'
      }
    };
    return configs[status] || configs.pending;
  };

  const timelineSteps = [
    { status: 'pending', label: 'Pendaftaran', desc: 'Dokumen submitted', icon: FiClipboard },
    { status: 'verified', label: 'Verifikasi', desc: 'Berkas diverifikasi', icon: FiCheck },
    { status: 'ujian', label: 'Ujian', desc: 'Mengikuti seleksi', icon: FiAward },
    { status: 'accepted', label: 'Hasil', desc: 'Pengumuman', icon: FiUser }
  ];

  const getCurrentStep = (status) => {
    const steps = { pending: 0, verified: 1, ujian: 2, accepted: 3, rejected: 3 };
    return steps[status] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-6 md:py-8">
      <div className="container mx-auto px-3 max-w-4xl">
        {/* Header - Ultra Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-xl px-3 py-1.5 rounded-full mb-3 shadow-lg">
            <FiSearch className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">Cek Status</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-1.5">
            Lacak Progress Pendaftaran
          </h1>
          <p className="text-gray-600 text-xs md:text-sm">
            Masukkan nomor pendaftaran atau NISN
          </p>
        </div>

        {/* Search Form - Compact Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/60 shadow-xl mb-5">
          {/* Tab Switcher */}
          <div className="flex gap-1.5 mb-4 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setSearchType('nomor')}
              className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all duration-300 ${
                searchType === 'nomor'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              Nomor Pendaftaran
            </button>
            <button
              onClick={() => setSearchType('nisn')}
              className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all duration-300 ${
                searchType === 'nisn'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              NISN
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchType === 'nomor' ? nomorPendaftaran : nisn}
                onChange={(e) => searchType === 'nomor' ? setNomorPendaftaran(e.target.value) : setNisn(e.target.value)}
                className="w-full pl-10 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder={searchType === 'nomor' ? 'PPDB-xxxxxxxxxx' : '10 digit NISN'}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                type="submit"
                disabled={loading}
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
                  loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? '...' : 'Cari'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg flex items-center gap-2 text-sm">
                <FiX className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Result */}
        {student && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Status Card - Compact */}
            <StatusHero student={student} getConfig={getStatusConfig} />

            {/* Info Grid - Ultra Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <InfoCard
                icon={<FiUser />}
                label="Nama"
                value={student.data_siswa?.nama_lengkap || '-'}
                truncate
              />
              <InfoCard
                icon={<FiClipboard />}
                label="No. Daftar"
                value={student.nomor_pendaftaran}
              />
              <InfoCard
                icon={<FiAward />}
                label="Jurusan"
                value={student.pilihan_jurusan?.pilihan_1 || '-'}
                truncate
              />
              <InfoCard
                icon={<FiCalendar />}
                label="Tanggal"
                value={formatDate(student.created_at)}
              />
            </div>

            {/* Timeline - Compact */}
            <Timeline steps={timelineSteps} currentStep={getCurrentStep(student.status)} status={student.status} />

            {/* Payment Info */}
            {student.pembayaran && (
              <PaymentInfo pembayaran={student.pembayaran} />
            )}

            {/* Next Steps */}
            <NextSteps status={student.status} />
          </div>
        )}

        {/* Empty State */}
        {!student && !error && (
          <div className="text-center py-10 bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Belum Ada Hasil</h3>
            <p className="text-gray-600 text-sm">
              Masukkan nomor pendaftaran atau NISN
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusHero = ({ student, getConfig }) => {
  const config = getConfig(student.status);

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 ${config.bg} border-2 ${config.border} shadow-xl`}>
      {/* Background Decoration */}
      <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${config.gradient} opacity-10 rounded-full blur-2xl`}></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-0.5">
              {student.data_siswa?.nama_lengkap}
            </h2>
            <p className="text-xs text-gray-600">{student.nomor_pendaftaran}</p>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r ${config.gradient} shadow-lg`}>
            <span className="text-xl">{config.icon}</span>
            <div className="text-left">
              <div className="text-[10px] opacity-80 leading-3">Status</div>
              <div className="text-sm leading-4">{config.label}</div>
            </div>
          </div>
        </div>

        <p className={`text-xs ${config.text} bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 inline-block`}>
          {config.message}
        </p>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, truncate }) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </div>
    <p className={`font-bold text-slate-800 text-sm ${truncate ? 'truncate' : ''}`}>{value}</p>
  </div>
);

const Timeline = ({ steps, currentStep, status }) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/60 shadow-xl">
    <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
      <FiClock className="w-4 h-4 text-blue-600" />
      Timeline Pendaftaran
    </h3>

    <div className="relative">
      {/* Progress Line */}
      <div className="absolute left-5 md:left-6 top-5 bottom-4 w-0.5 bg-gray-200">
        <div
          className="w-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transition-all duration-500"
          style={{ height: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.status} className="relative flex items-start gap-3">
              {/* Icon */}
              <div
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 border-transparent text-white shadow-lg'
                    : 'bg-white border-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-blue-200 scale-110' : ''}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <h4 className={`font-bold text-sm ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>
                    {step.label}
                  </h4>
                  {isCompleted && <FiCheck className="w-3.5 h-3.5 text-green-500" />}
                </div>
                <p className="text-xs text-gray-500">{step.desc}</p>

                {isCurrent && status === 'accepted' && (
                  <div className="mt-1.5 text-green-600 text-xs font-semibold flex items-center gap-1">
                    🎉 Selamat! Anda telah diterima
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const PaymentInfo = ({ pembayaran }) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 md:p-5 border border-white/60 shadow-xl">
    <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
      <FiFileText className="w-4 h-4 text-green-600" />
      Status Pembayaran
    </h3>

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          pembayaran.status === 'paid' ? 'bg-green-100 text-green-600' :
          pembayaran.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
          'bg-red-100 text-red-600'
        }`}>
          {pembayaran.status === 'paid' ? <FiCheck className="w-5 h-5" /> :
           pembayaran.status === 'pending' ? <FiClock className="w-5 h-5" /> :
           <FiX className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm capitalize">{pembayaran.status}</p>
          <p className="text-xs text-gray-500">
            {pembayaran.uploaded_at ? formatDate(pembayaran.uploaded_at) : 'Belum upload bukti'}
          </p>
        </div>
      </div>

      {pembayaran.bukti_url && (
        <a
          href={pembayaran.bukti_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold text-xs hover:bg-blue-100 transition-all"
        >
          <FiFileText className="w-3.5 h-3.5" />
          Lihat Bukti
        </a>
      )}
    </div>
  </div>
);

const NextSteps = ({ status }) => {
  const steps = {
    pending: [
      'Tunggu verifikasi dari admin',
      'Periksa email/SMS secara berkala',
      'Upload bukti pembayaran jika sudah diverifikasi'
    ],
    verified: [
      'Tunggu jadwal ujian seleksi',
      'Persiapkan dokumen asli untuk verifikasi',
      'Periksa email/SMS untuk informasi ujian'
    ],
    ujian: [
      'Ikuti ujian seleksi sesuai jadwal',
      'Bawa dokumen asli saat ujian',
      'Tunggu pengumuman hasil seleksi'
    ],
    accepted: [
      'Lakukan daftar ulang sesuai jadwal',
      'Bayar biaya pendaftaran ulang',
      'Ikuti Masa Orientasi Siswa (MOS)'
    ],
    rejected: [
      'Hubungi admin untuk informasi lebih lanjut',
      'Pertimbangkan untuk mendaftar tahun depan',
      'Cari alternatif sekolah lain'
    ]
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4 md:p-5">
      <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
        <FiChevronRight className="w-4 h-4 text-blue-600" />
        Langkah Selanjutnya
      </h4>
      <ul className="space-y-2">
        {steps[status]?.map((step, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-blue-600">{idx + 1}</span>
            </div>
            <span className="text-gray-700 text-sm">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default Status;
