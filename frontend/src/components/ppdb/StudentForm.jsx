import { FiUser, FiPhone, FiMail, FiMapPin, FiLoader } from 'react-icons/fi';

const StudentForm = ({ formData, handleChange, errors, wilayahData, loadingWilayah }) => {
  const { provinsiList, kabupatenList, kecamatanList, kelurahanList } = wilayahData;

  const InputField = ({ label, name, type = 'text', placeholder, maxLength, required = true, ...props }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} name={name} value={formData[name]} onChange={handleChange} maxLength={maxLength} placeholder={placeholder} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors[name] ? 'border-red-500' : ''}`} {...props} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const SelectField = ({ label, name, options, required = true, disabled = false }) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select name={name} value={formData[name]} onChange={handleChange} disabled={disabled} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors[name] ? 'border-red-500' : ''}`}>
        <option value="">Pilih {label.replace(' Tempat', '').replace(' Agama', '').replace(' Jenis Kelamin', '')}</option>
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  const agamaOptions = [{ value: 'Islam', label: 'Islam' }, { value: 'Kristen', label: 'Kristen' }, { value: 'Katolik', label: 'Katolik' }, { value: 'Hindu', label: 'Hindu' }, { value: 'Buddha', label: 'Buddha' }, { value: 'Konghucu', label: 'Konghucu' }];
  const genderOptions = [{ value: 'L', label: 'Laki-laki' }, { value: 'P', label: 'Perempuan' }];

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800"><strong>Info:</strong> Isi data siswa sesuai dokumen resmi (Ijazah, KK, Akta).</p>
      </div>

      {/* Nama & Identitas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="md:col-span-2">
          <InputField label="Nama Lengkap" name="nama_lengkap" placeholder="Sesuai ijazah" />
        </div>
        <InputField label="NISN" name="nisn" placeholder="10 digit" maxLength={10} />
        <InputField label="NIK" name="nik" placeholder="16 digit" maxLength={16} />
        <InputField label="Tempat Lahir" name="tempat_lahir" />
        <InputField label="Tanggal Lahir" name="tanggal_lahir" type="date" />
        <SelectField label="Jenis Kelamin" name="jenis_kelamin" options={genderOptions} />
        <SelectField label="Agama" name="agama" options={agamaOptions} />
        <InputField label="No. Telepon" name="telepon" type="tel" placeholder="08xxxxxxxxxx" />
        <InputField label="Email" name="email" type="email" placeholder="email@example.com" required={false} />
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1.5">
          Alamat Lengkap <span className="text-red-500">*</span>
        </label>
        <textarea name="alamat" value={formData.alamat} onChange={handleChange} rows={2} placeholder="Nama jalan, nomor rumah, RT/RW" className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.alamat ? 'border-red-500' : ''}`} />
        {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
      </div>

      {/* Wilayah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Provinsi <span className="text-red-500">*</span></label>
          <select name="provinsi" value={formData.provinsi} onChange={wilayahData.handleProvinsiChange} disabled={loadingWilayah} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.provinsi ? 'border-red-500' : ''}`}>
            <option value="">Pilih Provinsi</option>
            {provinsiList.map((prov) => <option key={prov.id} value={prov.id}>{prov.name}</option>)}
          </select>
          {loadingWilayah && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><FiLoader className="animate-spin w-3 h-3" /> Loading...</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Kota/Kabupaten <span className="text-red-500">*</span></label>
          <select name="kota" value={formData.kota} onChange={wilayahData.handleKabupatenChange} disabled={loadingWilayah || !formData.provinsi} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.kota ? 'border-red-500' : ''}`}>
            <option value="">Pilih Kota/Kabupaten</option>
            {kabupatenList.map((kab) => <option key={kab.id} value={kab.id}>{kab.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Kecamatan <span className="text-red-500">*</span></label>
          <select name="kecamatan" value={formData.kecamatan} onChange={wilayahData.handleKecamatanChange} disabled={loadingWilayah || !formData.kota} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.kecamatan ? 'border-red-500' : ''}`}>
            <option value="">Pilih Kecamatan</option>
            {kecamatanList.map((kec) => <option key={kec.id} value={kec.id}>{kec.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Kelurahan <span className="text-red-500">*</span></label>
          <select name="kelurahan" value={formData.kelurahan} onChange={wilayahData.handleKelurahanChange} disabled={loadingWilayah || !formData.kecamatan} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.kelurahan ? 'border-red-500' : ''}`}>
            <option value="">Pilih Kelurahan</option>
            {kelurahanList.map((kel) => <option key={kel.id} value={kel.id}>{kel.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Kode Pos <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="kode_pos" 
            value={formData.kode_pos} 
            readOnly 
            className={`w-full px-3 py-2 border rounded-lg text-sm ${
              formData.kode_pos 
                ? 'bg-green-50 border-green-300 text-green-700 font-semibold' 
                : 'bg-gray-100 border-gray-300 text-gray-500'
            }`} 
            placeholder="Auto-filled setelah pilih kelurahan" 
          />
          {formData.kode_pos && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              ✓ Terisi otomatis
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
