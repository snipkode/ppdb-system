import { FiUser, FiUsers, FiPhone, FiMail } from 'react-icons/fi';

const ParentForm = ({ formData, handleChange, errors }) => {
  const pendidikanOptions = [
    { value: 'SD', label: 'SD' },
    { value: 'SMP', label: 'SMP' },
    { value: 'SMA', label: 'SMA' },
    { value: 'SMK', label: 'SMK' },
    { value: 'D3', label: 'D3' },
    { value: 'S1', label: 'S1' },
    { value: 'S2', label: 'S2' },
    { value: 'S3', label: 'S3' },
  ];

  const pekerjaanOptions = [
    { value: 'Wiraswasta', label: 'Wiraswasta' },
    { value: 'PNS', label: 'PNS' },
    { value: 'TNI/Polri', label: 'TNI/Polri' },
    { value: 'Petani', label: 'Petani' },
    { value: 'Nelayan', label: 'Nelayan' },
    { value: 'Karyawan Swasta', label: 'Karyawan Swasta' },
    { value: 'Buruh', label: 'Buruh' },
    { value: 'Guru', label: 'Guru' },
    { value: 'Dokter', label: 'Dokter' },
    { value: 'Lainnya', label: 'Lainnya' },
  ];

  const penghasilanOptions = [
    { value: '< 1 Juta', label: '< 1 Juta' },
    { value: '1-3 Juta', label: '1-3 Juta' },
    { value: '3-5 Juta', label: '3-5 Juta' },
    { value: '5-10 Juta', label: '5-10 Juta' },
    { value: '> 10 Juta', label: '> 10 Juta' },
  ];

  const renderSelect = (name, label, options, required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`input-field ${errors[name] ? 'border-red-500' : ''}`}
      >
        <option value="">Pilih {label.replace(' Ayah', '').replace(' Ibu', '')}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderInput = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`input-field ${errors[name] ? 'border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
          {renderInput('nama_ayah', 'Nama Ayah')}
          {renderSelect('pendidikan_ayah', 'Pendidikan Ayah', pendidikanOptions, true)}
          {renderSelect('pekerjaan_ayah', 'Pekerjaan Ayah', pekerjaanOptions, true)}
          {renderSelect('penghasilan_ayah', 'Penghasilan Ayah', penghasilanOptions, true)}
        </div>
      </div>

      {/* Data Ibu */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiUser className="text-primary-600" />
          Data Ibu
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('nama_ibu', 'Nama Ibu')}
          {renderSelect('pendidikan_ibu', 'Pendidikan Ibu', pendidikanOptions, true)}
          {renderSelect('pekerjaan_ibu', 'Pekerjaan Ibu', pekerjaanOptions, true)}
          {renderSelect('penghasilan_ibu', 'Penghasilan Ibu', penghasilanOptions, true)}
        </div>
      </div>

      {/* Kontak Orang Tua */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiUsers className="text-primary-600" />
          Kontak Orang Tua
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('telepon_ortu', 'No. Telepon', 'tel', '08xxxxxxxxxx')}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMail className="inline w-4 h-4 mr-1" />
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

      {/* Data Wali (Optional) */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiUser className="text-gray-400" />
          Data Wali (Opsional - Jika ada)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('nama_wali', 'Nama Wali', 'text', '')}
          {renderInput('telepon_wali', 'No. Telepon Wali', 'tel', '08xxxxxxxxxx')}
        </div>
      </div>
    </div>
  );
};

export default ParentForm;
