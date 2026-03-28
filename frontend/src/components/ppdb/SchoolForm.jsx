import { FiBook, FiAward } from 'react-icons/fi';

const SchoolForm = ({ formData, handleChange, errors }) => {
  const currentYear = new Date().getFullYear();
  const tahunLulusOptions = [];
  for (let i = currentYear + 1; i >= currentYear - 4; i--) { tahunLulusOptions.push({ value: i, label: i }); }

  const InputField = ({ label, name, type = 'text', placeholder, maxLength, required = true }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
      <input type={type} name={name} value={formData[name]} onChange={handleChange} maxLength={maxLength} placeholder={placeholder} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[name] ? 'border-red-500' : ''}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const SelectField = ({ label, name, options, required = true }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
      <select name={name} value={formData[name]} onChange={handleChange} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[name] ? 'border-red-500' : ''}`}>
        <option value="">Pilih {label.replace(' Tahun', '')}</option>
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const SectionHeader = ({ icon, title, desc }) => (
    <div className="pb-2 border-b"><h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2">{icon}<span>{title}</span></h3>{desc && <p className="text-xs text-gray-500 mt-1">{desc}</p>}</div>
  );

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-xs text-green-800"><strong>Info:</strong> Pastikan data sekolah sesuai dengan yang tertera di ijazah.</p>
      </div>

      {/* Data Sekolah */}
      <div className="space-y-3">
        <SectionHeader icon={<FiBook className="text-green-600" />} title="Data Sekolah Asal" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField label="NPSN" name="npsn" placeholder="8 digit" maxLength={8} />
          <SelectField label="Tahun Lulus" name="tahun_lulus" options={tahunLulusOptions} />
          <div className="md:col-span-2"><InputField label="Nama Sekolah" name="nama_sekolah" placeholder="Sesuai ijazah" /></div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Alamat Sekolah <span className="text-red-500">*</span></label>
            <textarea name="alamat_sekolah" value={formData.alamat_sekolah} onChange={handleChange} rows={2} placeholder="Alamat lengkap sekolah" className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.alamat_sekolah ? 'border-red-500' : ''}`} />
            {errors.alamat_sekolah && <p className="text-red-500 text-xs mt-1">{errors.alamat_sekolah}</p>}
          </div>
        </div>
      </div>

      {/* Nilai Rapor */}
      <div className="space-y-3 pt-3 border-t">
        <SectionHeader icon={<FiAward className="text-purple-600" />} title="Nilai Rapor (Semester 1-5)" desc="Masukkan nilai rata-rata rapor untuk setiap mata pelajaran" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputField label="B. Indonesia" name="nilai_bahasa_indonesia" type="number" placeholder="0-100" />
          <InputField label="Matematika" name="nilai_matematika" type="number" placeholder="0-100" />
          <InputField label="IPA" name="nilai_ipa" type="number" placeholder="0-100" />
          <InputField label="B. Inggris" name="nilai_bahasa_inggris" type="number" placeholder="0-100" />
        </div>
      </div>

      {/* Prestasi */}
      <div className="space-y-3 pt-3 border-t">
        <SectionHeader icon={<FiAward className="text-gray-400" />} title="Prestasi (Opsional)" />
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Nama Prestasi</label>
          <input type="text" name="nama_prestasi" value={formData.nama_prestasi || ''} onChange={handleChange} placeholder="Contoh: Juara 1 Olimpiade Matematika" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Tingkat Prestasi</label>
            <select name="tingkat_prestasi" value={formData.tingkat_prestasi || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
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
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Tahun</label>
            <input type="number" name="tahun_prestasi" value={formData.tahun_prestasi || ''} onChange={handleChange} placeholder={currentYear.toString()} min="2020" max={currentYear} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolForm;
