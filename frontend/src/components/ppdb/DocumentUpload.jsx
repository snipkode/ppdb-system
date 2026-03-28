import { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const DocumentUpload = ({ formData, setFormData, errors }) => {
  const [uploadProgress, setUploadProgress] = useState({});

  const documents = [
    { id: 'foto_3x4', label: 'Pas Foto 3x4', required: true, maxSize: 2, formats: ['jpg', 'jpeg', 'png'], desc: 'Foto berwarna, latar merah/biru' },
    { id: 'kk_file', label: 'Kartu Keluarga', required: true, maxSize: 2, formats: ['jpg', 'jpeg', 'png', 'pdf'], desc: 'Scan/foto KK yang berlaku' },
    { id: 'akta_kelahiran', label: 'Akta Kelahiran', required: true, maxSize: 2, formats: ['jpg', 'jpeg', 'png', 'pdf'], desc: 'Scan/foto akta kelahiran' },
    { id: 'ktp_ortu', label: 'KTP Orang Tua', required: true, maxSize: 2, formats: ['jpg', 'jpeg', 'png', 'pdf'], desc: 'Scan/foto KTP ayah/ibu' },
    { id: 'ijazah_skl', label: 'Ijazah/SKL', required: false, maxSize: 2, formats: ['jpg', 'jpeg', 'png', 'pdf'], desc: 'Ijazah atau SKL' },
    { id: 'transkrip_nilai', label: 'Transkrip Nilai', required: true, maxSize: 2, formats: ['jpg', 'jpeg', 'png', 'pdf'], desc: 'Rapor semester 1-5' },
    { id: 'surat_prestasi', label: 'Sertifikat Prestasi', required: false, maxSize: 2, formats: ['jpg', 'jpeg', 'png', 'pdf'], desc: 'Sertifikat prestasi (jika ada)' },
  ];

  const handleFileChange = (e, docId) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Ukuran file terlalu besar. Maksimal 2MB.'); return; }
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const doc = documents.find((d) => d.id === docId);
    if (doc && !doc.formats.includes(fileExtension)) { alert(`Format file tidak didukung. Hanya ${doc.formats.join(', ')}.`); return; }
    setUploadProgress((prev) => ({ ...prev, [docId]: 0 }));
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev[docId] + 20;
        if (newProgress >= 100) { clearInterval(interval); return { ...prev, [docId]: 100 }; }
        return { ...prev, [docId]: newProgress };
      });
    }, 100);
    setFormData((prev) => ({ ...prev, [docId]: file }));
  };

  const removeFile = (docId) => {
    setFormData((prev) => ({ ...prev, [docId]: null }));
    setUploadProgress((prev) => ({ ...prev, [docId]: undefined }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800 flex items-start gap-2"><FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span><strong>Upload Dokumen:</strong> Format JPG, PNG, atau PDF. Maksimal 2MB per dokumen.</span></p>
      </div>

      {/* Status Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h4 className="font-semibold text-gray-800 text-xs mb-2">Status Dokumen:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {documents.filter((d) => d.required).map((doc) => {
            const hasFile = formData[doc.id] !== null && formData[doc.id] !== undefined;
            return (
              <div key={doc.id} className={`flex items-center gap-1.5 text-xs ${hasFile ? 'text-green-600' : 'text-gray-500'}`}>
                {hasFile ? <FiCheck className="w-3.5 h-3.5" /> : <FiAlertCircle className="w-3.5 h-3.5" />}
                <span className="truncate">{doc.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Fields */}
      <div className="space-y-3">
        {documents.map((doc) => {
          const file = formData[doc.id];
          const progress = uploadProgress[doc.id];
          return (
            <div key={doc.id} className={`bg-white border rounded-lg p-3 ${errors[doc.id] ? 'border-red-300' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <label className="font-medium text-gray-800 text-sm">{doc.label} {doc.required && <span className="text-red-500">*</span>}</label>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.desc}</p>
                </div>
                {file && (<button type="button" onClick={() => removeFile(doc.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors"><FiX className="w-4 h-4" /></button>)}
              </div>

              {!file ? (
                <label className="block mt-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <FiUpload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
                    <p className="text-xs text-gray-600"><span className="font-medium text-blue-600">Klik upload</span> atau drag & drop</p>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.formats.join(', ')} • Max {doc.maxSize}MB</p>
                  </div>
                  <input type="file" accept={doc.formats.map((f) => `.${f}`).join(',')} onChange={(e) => handleFileChange(e, doc.id)} className="hidden" />
                </label>
              ) : (
                <div className="mt-2 bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><FiFile className="w-4 h-4 text-blue-600" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    {progress !== undefined && progress < 100 ? (
                      <div className="w-20">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 text-center">{progress}%</p>
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center"><FiCheck className="w-3.5 h-3.5 text-green-600" /></div>
                    )}
                  </div>
                </div>
              )}
              {errors[doc.id] && <p className="text-red-500 text-xs mt-2">{errors[doc.id]}</p>}
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800"><strong>Catatan:</strong> Pastikan dokumen jelas dan dapat dibaca.</p>
      </div>
    </div>
  );
};

export default DocumentUpload;
