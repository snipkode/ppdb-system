import { useState } from 'react';
import { FiSearch, FiCreditCard, FiCalendar, FiUser, FiMapPin, FiPhone, FiMail, FiBook } from 'react-icons/fi';
import { studentApi } from '@/services/api';
import { useUIStore } from '@/stores/useStore';

const StatusChecker = () => {
  const { showNotification } = useUIStore();
  const [searchId, setSearchId] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      showNotification('Masukkan ID Pendaftaran', 'warning');
      return;
    }

    setLoading(true);
    try {
      const result = await studentApi.getById(searchId);
      if (result.success) {
        setStudent(result.data);
      } else {
        setStudent(null);
        showNotification('ID Pendaftaran tidak ditemukan', 'error');
      }
    } catch (error) {
      setStudent(null);
      showNotification('Terjadi kesalahan. Coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      accepted: 'bg-green-100 text-green-700 border-green-300',
      rejected: 'bg-red-100 text-red-700 border-red-300',
    };

    const labels = {
      pending: 'Menunggu Verifikasi',
      accepted: 'DITERIMA',
      rejected: 'DITOLAK',
    };

    return (
      <span className={`inline-block px-6 py-3 text-lg font-bold rounded-lg border-2 ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiSearch className="text-primary-600" />
          Cek Status Pendaftaran
        </h3>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Masukkan ID Pendaftaran (STD-...)"
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap"
          >
            <FiSearch />
            {loading ? 'Mencari...' : 'Cek Status'}
          </button>
        </form>
      </div>

      {/* Student Result */}
      {student && (
        <div className="space-y-4">
          {/* Status Card */}
          <div className="card text-center py-8">
            <FiCreditCard className="text-5xl text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {student.nama_lengkap}
            </h2>
            <p className="text-gray-500 mb-4">ID: {student.id}</p>
            <StatusBadge status={student.status} />
            {student.keterangan && (
              <p className="mt-4 text-gray-600 italic">"{student.keterangan}"</p>
            )}
          </div>

          {/* Student Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUser className="text-primary-600" />
              Data Siswa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="NISN" value={student.nisn} />
              <InfoRow label="Tanggal Lahir" value={formatDate(student.tanggal_lahir)} />
              <InfoRow label="Jenis Kelamin" value={student.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'} />
              <InfoRow label="Agama" value={student.agama} />
              <InfoRow label="Jurusan Dipilih" value={student.jurusan_dipilih} icon={FiBook} />
            </div>
          </div>

          {/* Address Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiMapPin className="text-primary-600" />
              Alamat
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">{student.alamat}</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <InfoRow label="Kota/Kabupaten" value={student.kota} />
                <InfoRow label="Provinsi" value={student.provinsi} />
                <InfoRow label="Kode Pos" value={student.kode_pos} />
              </div>
            </div>
          </div>

          {/* Parent Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUser className="text-primary-600" />
              Data Orang Tua/Wali
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Nama Orang Tua/Wali" value={student.nama_ortu} />
              <InfoRow label="No. Telepon" value={student.no_telp_ortu} icon={FiPhone} />
              <InfoRow label="Email" value={student.email_ortu} icon={FiMail} />
            </div>
          </div>

          {/* School Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiBook className="text-primary-600" />
              Asal Sekolah
            </h3>
            <InfoRow label="Sekolah Asal" value={student.asal_sekolah} />
            <InfoRow label="Tanggal Daftar" value={formatDate(student.tanggal_daftar)} icon={FiCalendar} />
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-2">
    {Icon && <Icon className="text-gray-400 mt-0.5 flex-shrink-0" />}
    <div>
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default StatusChecker;
