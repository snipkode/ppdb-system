import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiBook, FiSave } from 'react-icons/fi';
import { studentApi } from '@/services/api';
import { useUIStore } from '@/stores/useStore';

const RegistrationForm = () => {
  const { showNotification } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    nisn: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    agama: 'Islam',
    alamat: '',
    kota: '',
    provinsi: '',
    kode_pos: '',
    nama_ortu: '',
    no_telp_ortu: '',
    email_ortu: '',
    asal_sekolah: '',
    jurusan_dipilih: 'IPA',
    keterangan: '',
  });

  const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
  const jurusanOptions = ['IPA', 'IPS', 'Bahasa', 'TKJ', 'RPL', 'AKL', 'MM'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await studentApi.create(formData);
      if (result.success) {
        showNotification('Pendaftaran berhasil! ID: ' + result.data.id, 'success');
        setFormData({
          nama_lengkap: '',
          nisn: '',
          tanggal_lahir: '',
          jenis_kelamin: 'L',
          agama: 'Islam',
          alamat: '',
          kota: '',
          provinsi: '',
          kode_pos: '',
          nama_ortu: '',
          no_telp_ortu: '',
          email_ortu: '',
          asal_sekolah: '',
          jurusan_dipilih: 'IPA',
          keterangan: '',
        });
      } else {
        showNotification(result.error || 'Gagal mendaftar', 'error');
      }
    } catch (error) {
      showNotification('Terjadi kesalahan. Coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* Data Siswa */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiUser className="text-primary-600" />
          Data Siswa
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="nama_lengkap"
              value={formData.nama_lengkap}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
            <input
              type="text"
              name="nisn"
              value={formData.nisn}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan NISN"
              maxLength="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={handleChange}
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
            <select
              name="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
              className="input-field"
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
            <select
              name="agama"
              value={formData.agama}
              onChange={handleChange}
              className="input-field"
            >
              {agamaOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan Dipilih</label>
            <select
              name="jurusan_dipilih"
              value={formData.jurusan_dipilih}
              onChange={handleChange}
              className="input-field"
            >
              {jurusanOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Alamat */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiMapPin className="text-primary-600" />
          Alamat
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
              rows="3"
              className="input-field resize-none"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan kota/kabupaten"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
            <input
              type="text"
              name="provinsi"
              value={formData.provinsi}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan provinsi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
            <input
              type="text"
              name="kode_pos"
              value={formData.kode_pos}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan kode pos"
              maxLength="5"
            />
          </div>
        </div>
      </div>

      {/* Data Orang Tua */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiUser className="text-primary-600" />
          Data Orang Tua/Wali
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua/Wali</label>
            <input
              type="text"
              name="nama_ortu"
              value={formData.nama_ortu}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan nama orang tua/wali"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="no_telp_ortu"
                value={formData.no_telp_ortu}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="Masukkan no. telepon"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email_ortu"
                value={formData.email_ortu}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="Masukkan email"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Asal Sekolah */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiBook className="text-primary-600" />
          Asal Sekolah
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah Asal</label>
            <input
              type="text"
              name="asal_sekolah"
              value={formData.asal_sekolah}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Masukkan nama sekolah asal"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan Tambahan</label>
            <textarea
              name="keterangan"
              value={formData.keterangan}
              onChange={handleChange}
              rows="2"
              className="input-field resize-none"
              placeholder="Keterangan tambahan (opsional)"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3 text-lg"
      >
        <FiSave />
        {loading ? 'Menyimpan...' : 'Daftar Sekarang'}
      </button>
    </form>
  );
};

export default RegistrationForm;
