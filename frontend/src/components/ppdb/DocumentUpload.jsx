import { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const DocumentUpload = ({ formData, setFormData, errors }) => {
  const [uploadProgress, setUploadProgress] = useState({});

  const documents = [
    {
      id: 'foto_3x4',
      label: 'Pas Foto 3x4',
      required: true,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png'],
      description: 'Foto berwarna, latar belakang merah/biru',
    },
    {
      id: 'kk_file',
      label: 'Kartu Keluarga (KK)',
      required: true,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png', 'pdf'],
      description: 'Scan/foto KK yang masih berlaku',
    },
    {
      id: 'akta_kelahiran',
      label: 'Akta Kelahiran',
      required: true,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png', 'pdf'],
      description: 'Scan/foto akta kelahiran',
    },
    {
      id: 'ktp_ortu',
      label: 'KTP Orang Tua',
      required: true,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png', 'pdf'],
      description: 'Scan/foto KTP ayah/ibu',
    },
    {
      id: 'ijazah_skl',
      label: 'Ijazah/SKL',
      required: false,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png', 'pdf'],
      description: 'Ijazah atau Surat Keterangan Lulus',
    },
    {
      id: 'transkrip_nilai',
      label: 'Transkrip Nilai',
      required: true,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png', 'pdf'],
      description: 'Rapor semester 1-5',
    },
    {
      id: 'surat_prestasi',
      label: 'Sertifikat Prestasi',
      required: false,
      maxSize: 2,
      formats: ['jpg', 'jpeg', 'png', 'pdf'],
      description: 'Sertifikat prestasi (jika ada)',
    },
  ];

  const handleFileChange = (e, docId) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    // Validate file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const doc = documents.find((d) => d.id === docId);
    if (doc && !doc.formats.includes(fileExtension)) {
      alert(`Format file tidak didukung. Hanya ${doc.formats.join(', ')}.`);
      return;
    }

    // Simulate upload progress
    setUploadProgress((prev) => ({ ...prev, [docId]: 0 }));
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev[docId] + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [docId]: 100 };
        }
        return { ...prev, [docId]: newProgress };
      });
    }, 100);

    // Store file in formData
    setFormData((prev) => ({
      ...prev,
      [docId]: file,
    }));
  };

  const removeFile = (docId) => {
    setFormData((prev) => ({
      ...prev,
      [docId]: null,
    }));
    setUploadProgress((prev) => ({
      ...prev,
      [docId]: undefined,
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800 flex items-start gap-2">
          <FiAlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Upload Dokumen:</strong> Upload semua dokumen yang diperlukan dalam format 
            JPG, PNG, atau PDF. Maksimal ukuran file 2MB per dokumen.
          </span>
        </p>
      </div>

      {/* Required Documents Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Status Dokumen:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {documents.filter((d) => d.required).map((doc) => {
            const hasFile = formData[doc.id] !== null && formData[doc.id] !== undefined;
            return (
              <div
                key={doc.id}
                className={`flex items-center gap-2 text-sm ${
                  hasFile ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {hasFile ? (
                  <FiCheck className="w-4 h-4" />
                ) : (
                  <FiAlertCircle className="w-4 h-4" />
                )}
                <span className="truncate">{doc.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Fields */}
      <div className="space-y-4">
        {documents.map((doc) => {
          const file = formData[doc.id];
          const progress = uploadProgress[doc.id];

          return (
            <div
              key={doc.id}
              className={`bg-white border rounded-lg p-4 ${
                errors[doc.id] ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <label className="font-medium text-gray-800">
                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                </div>
                {file && (
                  <button
                    type="button"
                    onClick={() => removeFile(doc.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!file ? (
                <label className="block mt-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                    <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-primary-600">Klik untuk upload</span>{' '}
                      atau drag & drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {doc.formats.join(', ')} • Max {doc.maxSize}MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept={doc.formats.map((f) => `.${f}`).join(',')}
                    onChange={(e) => handleFileChange(e, doc.id)}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FiFile className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    {progress !== undefined && progress < 100 ? (
                      <div className="w-24">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-600 transition-all duration-200"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {progress}%
                        </p>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {errors[doc.id] && (
                <p className="text-red-500 text-xs mt-2">{errors[doc.id]}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Catatan:</strong> Pastikan dokumen yang diupload jelas dan dapat dibaca. 
          Dokumen yang tidak jelas akan ditolak saat verifikasi.
        </p>
      </div>
    </div>
  );
};

export default DocumentUpload;
