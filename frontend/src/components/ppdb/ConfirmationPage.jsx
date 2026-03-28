import { FiCheck, FiUser, FiUsers, FiBook, FiMapPin, FiFileText, FiDownload, FiPrinter } from 'react-icons/fi';

const ConfirmationPage = ({ formData, onConfirm, onBack }) => {
  const majorNames = {
    RPL: 'Rekayasa Perangkat Lunak',
    TKJ: 'Teknik Komputer & Jaringan',
    AKL: 'Akuntansi & Keuangan Lembaga',
    MM: 'Multimedia',
    TBSM: 'Teknik Bisnis Sepeda Motor',
  };

  const printConfirmation = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800 flex items-start gap-2">
          <FiCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Periksa Data:</strong> Periksa kembali semua data yang telah diisi. 
            Pastikan tidak ada kesalahan sebelum mengirim pendaftaran.
          </span>
        </p>
      </div>

      {/* Data Siswa Section */}
      <div className="card">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <FiUser className="text-primary-600" />
          Data Pribadi Siswa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Nama Lengkap</span>
            <p className="font-medium text-gray-800">{formData.nama_lengkap}</p>
          </div>
          <div>
            <span className="text-gray-500">NISN</span>
            <p className="font-medium text-gray-800">{formData.nisn}</p>
          </div>
          <div>
            <span className="text-gray-500">NIK</span>
            <p className="font-medium text-gray-800">{formData.nik}</p>
          </div>
          <div>
            <span className="text-gray-500">Tempat, Tanggal Lahir</span>
            <p className="font-medium text-gray-800">
              {formData.tempat_lahir}, {new Date(formData.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Jenis Kelamin</span>
            <p className="font-medium text-gray-800">
              {formData.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Agama</span>
            <p className="font-medium text-gray-800">{formData.agama}</p>
          </div>
          <div>
            <span className="text-gray-500">No. Telepon</span>
            <p className="font-medium text-gray-800">{formData.telepon}</p>
          </div>
          <div>
            <span className="text-gray-500">Email</span>
            <p className="font-medium text-gray-800">{formData.email || '-'}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-500">Alamat</span>
            <p className="font-medium text-gray-800">{formData.alamat}</p>
          </div>
        </div>
      </div>

      {/* Data Orang Tua Section */}
      <div className="card">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <FiUsers className="text-primary-600" />
          Data Orang Tua
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Nama Ayah</span>
            <p className="font-medium text-gray-800">{formData.nama_ayah}</p>
          </div>
          <div>
            <span className="text-gray-500">Pendidikan Ayah</span>
            <p className="font-medium text-gray-800">{formData.pendidikan_ayah}</p>
          </div>
          <div>
            <span className="text-gray-500">Pekerjaan Ayah</span>
            <p className="font-medium text-gray-800">{formData.pekerjaan_ayah}</p>
          </div>
          <div>
            <span className="text-gray-500">Penghasilan Ayah</span>
            <p className="font-medium text-gray-800">{formData.penghasilan_ayah}</p>
          </div>
          <div>
            <span className="text-gray-500">Nama Ibu</span>
            <p className="font-medium text-gray-800">{formData.nama_ibu}</p>
          </div>
          <div>
            <span className="text-gray-500">Pendidikan Ibu</span>
            <p className="font-medium text-gray-800">{formData.pendidikan_ibu}</p>
          </div>
          <div>
            <span className="text-gray-500">Pekerjaan Ibu</span>
            <p className="font-medium text-gray-800">{formData.pekerjaan_ibu}</p>
          </div>
          <div>
            <span className="text-gray-500">Penghasilan Ibu</span>
            <p className="font-medium text-gray-800">{formData.penghasilan_ibu}</p>
          </div>
          <div>
            <span className="text-gray-500">No. Telepon Orang Tua</span>
            <p className="font-medium text-gray-800">{formData.telepon_ortu}</p>
          </div>
          <div>
            <span className="text-gray-500">Email</span>
            <p className="font-medium text-gray-800">{formData.email_ortu || '-'}</p>
          </div>
        </div>
      </div>

      {/* Data Sekolah Section */}
      <div className="card">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <FiBook className="text-primary-600" />
          Data Sekolah Asal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">NPSN</span>
            <p className="font-medium text-gray-800">{formData.npsn}</p>
          </div>
          <div>
            <span className="text-gray-500">Tahun Lulus</span>
            <p className="font-medium text-gray-800">{formData.tahun_lulus}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-500">Nama Sekolah</span>
            <p className="font-medium text-gray-800">{formData.nama_sekolah}</p>
          </div>
          <div className="md:col-span-2">
            <span className="text-gray-500">Alamat Sekolah</span>
            <p className="font-medium text-gray-800">{formData.alamat_sekolah}</p>
          </div>
        </div>
      </div>

      {/* Pilihan Jurusan Section */}
      <div className="card">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <FiMapPin className="text-primary-600" />
          Pilihan Jurusan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <span className="text-gray-500 text-xs">Pilihan Pertama</span>
            <p className="font-bold text-primary-700 text-lg">
              {majorNames[formData.pilihan_1] || formData.pilihan_1}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <span className="text-gray-500 text-xs">Pilihan Kedua</span>
            <p className="font-bold text-gray-700 text-lg">
              {majorNames[formData.pilihan_2] || formData.pilihan_2}
            </p>
          </div>
        </div>
      </div>

      {/* Dokumen Section */}
      <div className="card">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <FiFileText className="text-primary-600" />
          Dokumen Terupload
        </h3>
        <div className="space-y-2 text-sm">
          {[
            { id: 'foto_3x4', label: 'Pas Foto 3x4' },
            { id: 'kk_file', label: 'Kartu Keluarga' },
            { id: 'akta_kelahiran', label: 'Akta Kelahiran' },
            { id: 'ktp_ortu', label: 'KTP Orang Tua' },
            { id: 'ijazah_skl', label: 'Ijazah/SKL' },
            { id: 'transkrip_nilai', label: 'Transkrip Nilai' },
            { id: 'surat_prestasi', label: 'Sertifikat Prestasi' },
          ].map((doc) => (
            <div key={doc.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="text-gray-700">{doc.label}</span>
              {formData[doc.id] ? (
                <span className="text-green-600 text-xs flex items-center gap-1">
                  <FiCheck className="w-4 h-4" />
                  Uploaded
                </span>
              ) : (
                <span className="text-gray-400 text-xs">-</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t">
        <button
          type="button"
          onClick={printConfirmation}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FiPrinter className="w-5 h-5" />
          Cetak Ringkasan
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-all"
          >
            <FiMapPin className="w-5 h-5 rotate-180" />
            Kembali
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-8 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <FiCheck className="w-5 h-5" />
            Kirim Pendaftaran
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .card {
            visibility: visible;
            page-break-inside: avoid;
          }
          .card * {
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmationPage;
