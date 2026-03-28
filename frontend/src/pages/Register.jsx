import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiUsers, FiBook, FiMapPin, FiUpload, FiCheck, FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';
import { studentApi } from '@/services/api';
import { wilayahApi } from '@/services/wilayah';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Wilayah state
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [loadingWilayah, setLoadingWilayah] = useState(false);

  const [formData, setFormData] = useState({
    // Data Siswa
    nama_lengkap: '',
    nisn: '',
    nik: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    agama: 'Islam',
    alamat: '',
    rt_rw: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    provinsi: '',
    kode_pos: '',
    telepon: '',
    email: '',
    
    // Data Orang Tua
    nama_ayah: '',
    pendidikan_ayah: '',
    pekerjaan_ayah: '',
    penghasilan_ayah: '',
    nama_ibu: '',
    pendidikan_ibu: '',
    pekerjaan_ibu: '',
    penghasilan_ibu: '',
    telepon_ortu: '',
    email_ortu: '',
    
    // Data Sekolah
    npsn: '',
    nama_sekolah: '',
    alamat_sekolah: '',
    tahun_lulus: new Date().getFullYear(),
    
    // Pilihan Jurusan
    pilihan_1: '',
    pilihan_2: '',
  });

  // Load provinces on mount
  useEffect(() => {
    loadProvinsi();
  }, []);

  const loadProvinsi = async () => {
    setLoadingWilayah(true);
    const data = await wilayahApi.getProvinsi();
    setProvinsiList(data);
    setLoadingWilayah(false);
  };

  const handleProvinsiChange = async (e) => {
    const provinsiId = e.target.value;
    setFormData(prev => ({ ...prev, provinsi: provinsiId, kota: '', kecamatan: '', kelurahan: '', kode_pos: '' }));
    
    if (provinsiId) {
      setLoadingWilayah(true);
      const data = await wilayahApi.getKabupaten(provinsiId);
      setKabupatenList(data);
      setLoadingWilayah(false);
    } else {
      setKabupatenList([]);
      setKecamatanList([]);
      setKelurahanList([]);
    }
  };

  const handleKabupatenChange = async (e) => {
    const kabupatenId = e.target.value;
    setFormData(prev => ({ ...prev, kota: kabupatenId, kecamatan: '', kelurahan: '', kode_pos: '' }));
    
    if (kabupatenId) {
      setLoadingWilayah(true);
      const data = await wilayahApi.getKecamatan(kabupatenId);
      setKecamatanList(data);
      setLoadingWilayah(false);
    } else {
      setKecamatanList([]);
      setKelurahanList([]);
    }
  };

  const handleKecamatanChange = async (e) => {
    const kecamatanId = e.target.value;
    setFormData(prev => ({ ...prev, kecamatan: kecamatanId, kelurahan: '', kode_pos: '' }));
    
    if (kecamatanId) {
      setLoadingWilayah(true);
      const data = await wilayahApi.getKelurahan(kecamatanId);
      setKelurahanList(data);
      setLoadingWilayah(false);
    } else {
      setKelurahanList([]);
    }
  };

  const handleKelurahanChange = (e) => {
    const kelurahan = e.target.value;
    const selectedKelurahan = kelurahanList.find(k => k.id === kelurahan);
    setFormData(prev => ({ 
      ...prev, 
      kelurahan, 
      kode_pos: selectedKelurahan?.postal_code || '' 
    }));
  };

  const steps = [
    { number: 1, title: 'Data Siswa', icon: FiUser },
    { number: 2, title: 'Data Orang Tua', icon: FiUsers },
    { number: 3, title: 'Data Sekolah', icon: FiBook },
    { number: 4, title: 'Pilihan Jurusan', icon: FiMapPin },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (step) => {
    setError(null);
    
    switch(step) {
      case 1:
        const required1 = ['nama_lengkap', 'nisn', 'nik', 'tempat_lahir', 'tanggal_lahir', 'agama', 'alamat', 'kelurahan', 'kecamatan', 'kota', 'provinsi', 'kode_pos', 'telepon'];
        const missing1 = required1.filter(field => !formData[field]);
        if (missing1.length > 0) {
          setError('Mohon lengkapi semua field yang wajib diisi');
          return false;
        }
        if (formData.nisn.length !== 10) {
          setError('NISN harus 10 digit');
          return false;
        }
        if (formData.nik.length !== 16) {
          setError('NIK harus 16 digit');
          return false;
        }
        break;
      case 2:
        const required2 = ['nama_ayah', 'pendidikan_ayah', 'pekerjaan_ayah', 'nama_ibu', 'pendidikan_ibu', 'pekerjaan_ibu', 'telepon_ortu'];
        const missing2 = required2.filter(field => !formData[field]);
        if (missing2.length > 0) {
          setError('Mohon lengkapi semua field yang wajib diisi');
          return false;
        }
        break;
      case 3:
        const required3 = ['npsn', 'nama_sekolah', 'alamat_sekolah', 'tahun_lulus'];
        const missing3 = required3.filter(field => !formData[field]);
        if (missing3.length > 0) {
          setError('Mohon lengkapi semua field yang wajib diisi');
          return false;
        }
        if (formData.npsn.length !== 8) {
          setError('NPSN harus 8 digit');
          return false;
        }
        break;
      case 4:
        if (!formData.pilihan_1 || !formData.pilihan_2) {
          setError('Mohon pilih 2 jurusan');
          return false;
        }
        if (formData.pilihan_1 === formData.pilihan_2) {
          setError('Pilihan jurusan 1 dan 2 tidak boleh sama');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setLoading(true);
    setError(null);

    try {
      const result = await studentApi.create(formData);
      if (result.success) {
        navigate('/success', { state: { studentId: result.data.id, nomorPendaftaran: result.data.id } });
      } else {
        setError(result.error || 'Terjadi kesalahan');
      }
    } catch (err) {
      setError('Gagal menyimpan data. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            className="input-field"
            placeholder="Sesuai dengan ijazah"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NISN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nisn"
            value={formData.nisn}
            onChange={handleChange}
            className="input-field"
            placeholder="10 digit"
            maxLength="10"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NIK <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            className="input-field"
            placeholder="16 digit"
            maxLength="16"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempat Lahir <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggal Lahir <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agama <span className="text-red-500">*</span>
          </label>
          <select
            name="agama"
            value={formData.agama}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Pilih Agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="input-field"
            placeholder="08xxxxxxxxxx"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alamat Lengkap <span className="text-red-500">*</span>
        </label>
        <textarea
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          className="input-field"
          rows="3"
          placeholder="Nama jalan, nomor rumah, RT/RW"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provinsi <span className="text-red-500">*</span>
          </label>
          <select
            name="provinsi"
            value={formData.provinsi}
            onChange={handleProvinsiChange}
            className="input-field"
            required
            disabled={loadingWilayah}
          >
            <option value="">Pilih Provinsi</option>
            {provinsiList.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
              </option>
            ))}
          </select>
          {loadingWilayah && formData.provinsi && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <FiLoader className="animate-spin w-3 h-3" /> Loading kabupaten...
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kota/Kabupaten <span className="text-red-500">*</span>
          </label>
          <select
            name="kota"
            value={formData.kota}
            onChange={handleKabupatenChange}
            className="input-field"
            required
            disabled={loadingWilayah || !formData.provinsi}
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {kabupatenList.map((kab) => (
              <option key={kab.id} value={kab.id}>
                {kab.name}
              </option>
            ))}
          </select>
          {loadingWilayah && formData.kota && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <FiLoader className="animate-spin w-3 h-3" /> Loading kecamatan...
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kecamatan <span className="text-red-500">*</span>
          </label>
          <select
            name="kecamatan"
            value={formData.kecamatan}
            onChange={handleKecamatanChange}
            className="input-field"
            required
            disabled={loadingWilayah || !formData.kota}
          >
            <option value="">Pilih Kecamatan</option>
            {kecamatanList.map((kec) => (
              <option key={kec.id} value={kec.id}>
                {kec.name}
              </option>
            ))}
          </select>
          {loadingWilayah && formData.kecamatan && (
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <FiLoader className="animate-spin w-3 h-3" /> Loading kelurahan...
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kelurahan <span className="text-red-500">*</span>
          </label>
          <select
            name="kelurahan"
            value={formData.kelurahan}
            onChange={handleKelurahanChange}
            className="input-field"
            required
            disabled={loadingWilayah || !formData.kecamatan}
          >
            <option value="">Pilih Kelurahan</option>
            {kelurahanList.map((kel) => (
              <option key={kel.id} value={kel.id}>
                {kel.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kode Pos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="kode_pos"
            value={formData.kode_pos}
            onChange={handleChange}
            className="input-field"
            placeholder="Auto-filled"
            readOnly
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Info:</strong> Isi data orang tua/wali dengan lengkap dan benar. Data ini akan digunakan untuk komunikasi selama proses PPDB.
        </p>
      </div>

      {/* Data Ayah */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiUser className="text-primary-600" />
          Data Ayah
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Ayah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama_ayah"
              value={formData.nama_ayah}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pendidikan Ayah <span className="text-red-500">*</span>
            </label>
            <select
              name="pendidikan_ayah"
              value={formData.pendidikan_ayah}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Pilih Pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pekerjaan Ayah <span className="text-red-500">*</span>
            </label>
            <select
              name="pekerjaan_ayah"
              value={formData.pekerjaan_ayah}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Pilih Pekerjaan</option>
              <option value="Wiraswasta">Wiraswasta</option>
              <option value="PNS">PNS</option>
              <option value="TNI/Polri">TNI/Polri</option>
              <option value="Petani">Petani</option>
              <option value="Nelayan">Nelayan</option>
              <option value="Karyawan Swasta">Karyawan Swasta</option>
              <option value="Buruh">Buruh</option>
              <option value="Guru">Guru</option>
              <option value="Dokter">Dokter</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penghasilan Ayah <span className="text-red-500">*</span>
            </label>
            <select
              name="penghasilan_ayah"
              value={formData.penghasilan_ayah}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Pilih Penghasilan</option>
              <option value="< 1 Juta">&lt; 1 Juta</option>
              <option value="1-3 Juta">1-3 Juta</option>
              <option value="3-5 Juta">3-5 Juta</option>
              <option value="5-10 Juta">5-10 Juta</option>
              <option value="> 10 Juta">&gt; 10 Juta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Ibu */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiUser className="text-primary-600" />
          Data Ibu
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Ibu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama_ibu"
              value={formData.nama_ibu}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pendidikan Ibu <span className="text-red-500">*</span>
            </label>
            <select
              name="pendidikan_ibu"
              value={formData.pendidikan_ibu}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Pilih Pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pekerjaan Ibu <span className="text-red-500">*</span>
            </label>
            <select
              name="pekerjaan_ibu"
              value={formData.pekerjaan_ibu}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Pilih Pekerjaan</option>
              <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
              <option value="Wiraswasta">Wiraswasta</option>
              <option value="PNS">PNS</option>
              <option value="TNI/Polri">TNI/Polri</option>
              <option value="Petani">Petani</option>
              <option value="Nelayan">Nelayan</option>
              <option value="Karyawan Swasta">Karyawan Swasta</option>
              <option value="Buruh">Buruh</option>
              <option value="Guru">Guru</option>
              <option value="Dokter">Dokter</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penghasilan Ibu <span className="text-red-500">*</span>
            </label>
            <select
              name="penghasilan_ibu"
              value={formData.penghasilan_ibu}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Pilih Penghasilan</option>
              <option value="< 1 Juta">&lt; 1 Juta</option>
              <option value="1-3 Juta">1-3 Juta</option>
              <option value="3-5 Juta">3-5 Juta</option>
              <option value="5-10 Juta">5-10 Juta</option>
              <option value="> 10 Juta">&gt; 10 Juta</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kontak Orang Tua */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiUsers className="text-primary-600" />
          Kontak Orang Tua
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="telepon_ortu"
              value={formData.telepon_ortu}
              onChange={handleChange}
              className="input-field"
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email_ortu"
              value={formData.email_ortu}
              onChange={handleChange}
              className="input-field"
              placeholder="email@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
          <strong>Info:</strong> Pastikan data sekolah asal sesuai dengan yang tertera di ijazah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NPSN Sekolah <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="npsn"
            value={formData.npsn}
            onChange={handleChange}
            className="input-field"
            placeholder="8 digit"
            maxLength="8"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tahun Lulus <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="tahun_lulus"
            value={formData.tahun_lulus}
            onChange={handleChange}
            className="input-field"
            min="2020"
            max={new Date().getFullYear() + 1}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Sekolah Asal <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama_sekolah"
          value={formData.nama_sekolah}
          onChange={handleChange}
          className="input-field"
          placeholder="SMP/MTs ..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alamat Sekolah <span className="text-red-500">*</span>
        </label>
        <textarea
          name="alamat_sekolah"
          value={formData.alamat_sekolah}
          onChange={handleChange}
          className="input-field"
          rows="3"
          placeholder="Alamat lengkap sekolah"
          required
        />
      </div>
    </div>
  );

  const renderStep4 = () => {
    const majors = [
      { code: 'RPL', name: 'Rekayasa Perangkat Lunak', desc: 'Belajar coding, web, mobile development', quota: 100, icon: '💻' },
      { code: 'TKJ', name: 'Teknik Komputer & Jaringan', desc: 'Hardware, networking, sistem komputer', quota: 80, icon: '🖥️' },
      { code: 'AKL', name: 'Akuntansi', desc: 'Keuangan, akuntansi, perpajakan', quota: 60, icon: '📊' },
      { code: 'MM', name: 'Multimedia', desc: 'Desain grafis, video, animasi', quota: 60, icon: '🎨' },
      { code: 'TBSM', name: 'Teknik Bisnis Sepeda Motor', desc: 'Otomotif, mesin sepeda motor', quota: 80, icon: '🏍️' },
    ];

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-purple-800">
            <strong>Info:</strong> Pilih 2 jurusan yang berbeda. Pilihan 1 adalah prioritas utama.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Pilihan Jurusan 1 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {majors.map((major) => (
              <label
                key={major.code}
                className={`relative cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                  formData.pilihan_1 === major.code
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="radio"
                  name="pilihan_1"
                  value={major.code}
                  checked={formData.pilihan_1 === major.code}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-4xl mb-2">{major.icon}</div>
                  <div className="font-semibold text-gray-800">{major.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{major.desc}</div>
                  <div className="text-xs text-primary-600 mt-2 font-medium">
                    Kuota: {major.quota} siswa
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Pilihan Jurusan 2 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {majors.map((major) => (
              <label
                key={major.code}
                className={`relative cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                  formData.pilihan_2 === major.code
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                } ${formData.pilihan_1 === major.code ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="radio"
                  name="pilihan_2"
                  value={major.code}
                  checked={formData.pilihan_2 === major.code}
                  onChange={handleChange}
                  className="sr-only"
                  disabled={formData.pilihan_1 === major.code}
                />
                <div className="text-center">
                  <div className="text-4xl mb-2">{major.icon}</div>
                  <div className="font-semibold text-gray-800">{major.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{major.desc}</div>
                  <div className="text-xs text-primary-600 mt-2 font-medium">
                    Kuota: {major.quota} siswa
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pendaftaran PPDB Online
          </h1>
          <p className="text-gray-600">
            Isi formulir dengan lengkap dan benar
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? <FiCheck className="w-5 h-5" /> : step.number}
                  </div>
                  <div className="text-xs mt-2 text-center font-medium text-gray-600 hidden md:block">
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 md:w-24 h-1 mx-2 rounded ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            {steps[currentStep - 1].icon && (
              (() => {
                const IconComponent = steps[currentStep - 1].icon;
                return <IconComponent className="text-primary-600" />;
              })()
            )}
            {steps[currentStep - 1].title}
          </h2>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <FiChevronLeft />
            <span>Kembali</span>
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 hover:shadow-lg"
            >
              <span>Lanjut</span>
              <FiChevronRight />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FiCheck />
                  <span>Submit Pendaftaran</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
