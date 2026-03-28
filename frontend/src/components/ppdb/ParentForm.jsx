import { FiUser, FiUsers, FiPhone, FiMail } from 'react-icons/fi';

// Move these outside to prevent re-creation on every render
const InputField = ({ formData, handleChange, errors, label, name, type = 'text', placeholder, required = true }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
    <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[name] ? 'border-red-500' : ''}`} />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
  </div>
);

const SelectField = ({ formData, handleChange, errors, label, name, options, required = true }) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
    <select name={name} value={formData[name]} onChange={handleChange} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors[name] ? 'border-red-500' : ''}`}>
      <option value="">Pilih {label.replace(' Ayah', '').replace(' Ibu', '')}</option>
      {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
  </div>
);

const SectionHeader = ({ icon, title }) => (
  <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2 pb-2 border-b">{icon}<span>{title}</span></h3>
);

const ParentForm = ({ formData, handleChange, errors }) => {
  const pendidikanOptions = [{ value: 'SD', label: 'SD' }, { value: 'SMP', label: 'SMP' }, { value: 'SMA', label: 'SMA' }, { value: 'SMK', label: 'SMK' }, { value: 'D3', label: 'D3' }, { value: 'S1', label: 'S1' }, { value: 'S2', label: 'S2' }, { value: 'S3', label: 'S3' }];
  const pekerjaanOptions = [{ value: 'Wiraswasta', label: 'Wiraswasta' }, { value: 'PNS', label: 'PNS' }, { value: 'TNI/Polri', label: 'TNI/Polri' }, { value: 'Petani', label: 'Petani' }, { value: 'Nelayan', label: 'Nelayan' }, { value: 'Karyawan Swasta', label: 'Karyawan Swasta' }, { value: 'Buruh', label: 'Buruh' }, { value: 'Guru', label: 'Guru' }, { value: 'Dokter', label: 'Dokter' }, { value: 'Lainnya', label: 'Lainnya' }];
  const penghasilanOptions = [{ value: '< 1 Juta', label: '< 1 Juta' }, { value: '1-3 Juta', label: '1-3 Juta' }, { value: '3-5 Juta', label: '3-5 Juta' }, { value: '5-10 Juta', label: '5-10 Juta' }, { value: '> 10 Juta', label: '> 10 Juta' }];

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800"><strong>Info:</strong> Isi data orang tua/wali dengan lengkap untuk komunikasi PPDB.</p>
      </div>

      {/* Data Ayah */}
      <div className="space-y-3">
        <SectionHeader icon={<FiUser className="text-blue-600" />} title="Data Ayah" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField formData={formData} errors={errors} handleChange={handleChange} label="Nama Ayah" name="nama_ayah" />
          <SelectField formData={formData} errors={errors} handleChange={handleChange} label="Pendidikan" name="pendidikan_ayah" options={pendidikanOptions} />
          <SelectField formData={formData} errors={errors} handleChange={handleChange} label="Pekerjaan" name="pekerjaan_ayah" options={pekerjaanOptions} />
          <SelectField formData={formData} errors={errors} handleChange={handleChange} label="Penghasilan" name="penghasilan_ayah" options={penghasilanOptions} />
        </div>
      </div>

      {/* Data Ibu */}
      <div className="space-y-3 pt-3 border-t">
        <SectionHeader icon={<FiUser className="text-purple-600" />} title="Data Ibu" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField formData={formData} errors={errors} handleChange={handleChange} label="Nama Ibu" name="nama_ibu" />
          <SelectField formData={formData} errors={errors} handleChange={handleChange} label="Pendidikan" name="pendidikan_ibu" options={pendidikanOptions} />
          <SelectField formData={formData} errors={errors} handleChange={handleChange} label="Pekerjaan" name="pekerjaan_ibu" options={pekerjaanOptions} />
          <SelectField formData={formData} errors={errors} handleChange={handleChange} label="Penghasilan" name="penghasilan_ibu" options={penghasilanOptions} />
        </div>
      </div>

      {/* Kontak Orang Tua */}
      <div className="space-y-3 pt-3 border-t">
        <SectionHeader icon={<FiUsers className="text-green-600" />} title="Kontak Orang Tua" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField formData={formData} errors={errors} handleChange={handleChange} label="No. Telepon" name="telepon_ortu" type="tel" placeholder="08xxxxxxxxxx" />
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5"><FiMail className="inline w-3 h-3 mr-1" />Email (Opsional)</label>
            <input type="email" name="email_ortu" value={formData.email_ortu} onChange={handleChange} placeholder="email@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
        </div>
      </div>

      {/* Data Wali */}
      <div className="space-y-3 pt-3 border-t">
        <SectionHeader icon={<FiUser className="text-gray-400" />} title="Data Wali (Opsional)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField formData={formData} errors={errors} handleChange={handleChange} label="Nama Wali" name="nama_wali" required={false} />
          <InputField formData={formData} errors={errors} handleChange={handleChange} label="No. Telepon Wali" name="telepon_wali" type="tel" placeholder="08xxxxxxxxxx" required={false} />
        </div>
      </div>
    </div>
  );
};

export default ParentForm;
