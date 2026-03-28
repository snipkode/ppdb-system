import { FiBook, FiAward } from 'react-icons/fi';

const SchoolForm = ({ formData, handleChange, errors }) => {
  const currentYear = new Date().getFullYear();
  const tahunLulusOptions = [];
  
  // Generate tahun lulus options (5 tahun terakhir + 1 tahun depan)
  for (let i = currentYear + 1; i >= currentYear - 4; i--) {
    tahunLulusOptions.push(i);
  }

  const nilaiMapel = [
    { id: 'bahasa_indonesia', label: 'Bahasa Indonesia' },
    { id: 'matematika', label: 'Matematika' },
    { id: 'ipa', label: 'Ilmu Pengetahuan Alam' },
    { id: 'bahasa_inggris', label: 'Bahasa Inggris' },
  ];

  const renderInput = (name, label, type = 'text', placeholder = '', maxLength = null) => (
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
        maxLength={maxLength}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Info:</strong> Pastikan data sekolah asal sesuai dengan yang tertera di ijazah.
        </p>
      </div>

      {/* Data Sekolah */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiBook className="text-primary-600" />
          Data Sekolah Asal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput('npsn', 'NPSN Sekolah', 'text', '8 digit', 8)}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun Lulus <span className="text-red-500">*</span>
            </label>
            <select
              name="tahun_lulus"
              value={formData.tahun_lulus}
              onChange={handleChange}
              className={`input-field ${errors.tahun_lulus ? 'border-red-500' : ''}`}
            >
              {tahunLulusOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.tahun_lulus && (
              <p className="text-red-500 text-xs mt-1">{errors.tahun_lulus}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Sekolah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama_sekolah"
              value={formData.nama_sekolah}
              onChange={handleChange}
              className={`input-field ${errors.nama_sekolah ? 'border-red-500' : ''}`}
              placeholder="Sesuai dengan ijazah"
            />
            {errors.nama_sekolah && (
              <p className="text-red-500 text-xs mt-1">{errors.nama_sekolah}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Sekolah <span className="text-red-500">*</span>
            </label>
            <textarea
              name="alamat_sekolah"
              value={formData.alamat_sekolah}
              onChange={handleChange}
              className={`input-field ${errors.alamat_sekolah ? 'border-red-500' : ''}`}
              rows="3"
              placeholder="Alamat lengkap sekolah"
            />
            {errors.alamat_sekolah && (
              <p className="text-red-500 text-xs mt-1">{errors.alamat_sekolah}</p>
            )}
          </div>
        </div>
      </div>

      {/* Nilai Rapor */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiAward className="text-primary-600" />
          Nilai Rapor (Semester 1-5)
        </h3>
        <p className="text-sm text-gray-600">
          Masukkan nilai rata-rata rapor untuk setiap mata pelajaran
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nilaiMapel.map((mapel) => (
            <div key={mapel.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nilai {mapel.label}
              </label>
              <input
                type="number"
                name={`nilai_${mapel.id}`}
                value={formData[`nilai_${mapel.id}`] || ''}
                onChange={handleChange}
                className="input-field"
                placeholder="0-100"
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prestasi (Optional) */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiAward className="text-gray-400" />
          Prestasi Akademik/Non-Akademik (Opsional)
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Prestasi
          </label>
          <input
            type="text"
            name="nama_prestasi"
            value={formData.nama_prestasi || ''}
            onChange={handleChange}
            className="input-field"
            placeholder="Contoh: Juara 1 Olimpiade Matematika Tingkat Kota"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Prestasi
            </label>
            <select
              name="tingkat_prestasi"
              value={formData.tingkat_prestasi || ''}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Pilih Tingkat</option>
              <option value="Sekolah">Sekolah</option>
              <option value="Kecamatan">Kecamatan</option>
              <option value="Kota/Kabupaten">Kota/Kabupaten</option>
              <option value="Provinsi">Provinsi</option>
              <option value="Nasional">Nasional</option>
              <option value="Internasional">Internasional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun Prestasi
            </label>
            <input
              type="number"
              name="tahun_prestasi"
              value={formData.tahun_prestasi || ''}
              onChange={handleChange}
              className="input-field"
              placeholder={currentYear.toString()}
              min="2020"
              max={currentYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolForm;
