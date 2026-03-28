import { FiUser, FiPhone, FiMail, FiMapPin, FiLoader } from 'react-icons/fi';

const StudentForm = ({ formData, handleChange, errors, wilayahData, loadingWilayah }) => {
  const { provinsiList, kabupatenList, kecamatanList, kelurahanList } = wilayahData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Info:</strong> Isi data pribadi siswa dengan lengkap dan benar sesuai dengan dokumen resmi (Ijazah, KK, Akta Kelahiran).
        </p>
      </div>

      {/* Nama & Identitas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiUser className="inline w-4 h-4 mr-1" />
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            className={`input-field ${errors.nama_lengkap ? 'border-red-500' : ''}`}
            placeholder="Sesuai dengan ijazah"
          />
          {errors.nama_lengkap && (
            <p className="text-red-500 text-xs mt-1">{errors.nama_lengkap}</p>
          )}
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
            className={`input-field ${errors.nisn ? 'border-red-500' : ''}`}
            placeholder="10 digit"
            maxLength="10"
          />
          {errors.nisn && (
            <p className="text-red-500 text-xs mt-1">{errors.nisn}</p>
          )}
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
            className={`input-field ${errors.nik ? 'border-red-500' : ''}`}
            placeholder="16 digit"
            maxLength="16"
          />
          {errors.nik && (
            <p className="text-red-500 text-xs mt-1">{errors.nik}</p>
          )}
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
            className={`input-field ${errors.tempat_lahir ? 'border-red-500' : ''}`}
          />
          {errors.tempat_lahir && (
            <p className="text-red-500 text-xs mt-1">{errors.tempat_lahir}</p>
          )}
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
            className={`input-field ${errors.tanggal_lahir ? 'border-red-500' : ''}`}
          />
          {errors.tanggal_lahir && (
            <p className="text-red-500 text-xs mt-1">{errors.tanggal_lahir}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <select
            name="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            className={`input-field ${errors.jenis_kelamin ? 'border-red-500' : ''}`}
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          {errors.jenis_kelamin && (
            <p className="text-red-500 text-xs mt-1">{errors.jenis_kelamin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agama <span className="text-red-500">*</span>
          </label>
          <select
            name="agama"
            value={formData.agama}
            onChange={handleChange}
            className={`input-field ${errors.agama ? 'border-red-500' : ''}`}
          >
            <option value="">Pilih Agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
          {errors.agama && (
            <p className="text-red-500 text-xs mt-1">{errors.agama}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiPhone className="inline w-4 h-4 mr-1" />
            No. Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            className={`input-field ${errors.telepon ? 'border-red-500' : ''}`}
            placeholder="08xxxxxxxxxx"
          />
          {errors.telepon && (
            <p className="text-red-500 text-xs mt-1">{errors.telepon}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiMail className="inline w-4 h-4 mr-1" />
            Email (Optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="email@example.com"
          />
        </div>
      </div>

      {/* Alamat */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FiMapPin className="inline w-4 h-4 mr-1" />
          Alamat Lengkap <span className="text-red-500">*</span>
        </label>
        <textarea
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          className={`input-field ${errors.alamat ? 'border-red-500' : ''}`}
          rows="3"
          placeholder="Nama jalan, nomor rumah, RT/RW"
        />
        {errors.alamat && (
          <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>
        )}
      </div>

      {/* Wilayah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provinsi <span className="text-red-500">*</span>
          </label>
          <select
            name="provinsi"
            value={formData.provinsi}
            onChange={wilayahData.handleProvinsiChange}
            className={`input-field ${errors.provinsi ? 'border-red-500' : ''}`}
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
            onChange={wilayahData.handleKabupatenChange}
            className={`input-field ${errors.kota ? 'border-red-500' : ''}`}
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
            onChange={wilayahData.handleKecamatanChange}
            className={`input-field ${errors.kecamatan ? 'border-red-500' : ''}`}
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
            onChange={wilayahData.handleKelurahanChange}
            className={`input-field ${errors.kelurahan ? 'border-red-500' : ''}`}
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
            className="input-field bg-gray-50"
            placeholder="Auto-filled"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
