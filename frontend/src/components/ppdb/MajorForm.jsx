import { FiMapPin, FiInfo, FiCheck } from 'react-icons/fi';

const MajorForm = ({ formData, handleChange, errors }) => {
  const majors = [
    { code: 'RPL', name: 'Rekayasa Perangkat Lunak', desc: 'Coding, web & mobile development', quota: 100, icon: '💻', color: 'from-blue-500 to-cyan-500' },
    { code: 'TKJ', name: 'Teknik Komputer & Jaringan', desc: 'Jaringan, server, cloud computing', quota: 80, icon: '🖥️', color: 'from-green-500 to-emerald-500' },
    { code: 'AKL', name: 'Akuntansi', desc: 'Akuntansi, perpajakan, keuangan', quota: 60, icon: '📊', color: 'from-purple-500 to-pink-500' },
    { code: 'MM', name: 'Multimedia', desc: 'Desain grafis, foto, video, animasi', quota: 60, icon: '🎨', color: 'from-orange-500 to-red-500' },
    { code: 'TBSM', name: 'Teknik Bisnis Sepeda Motor', desc: 'Otomotif, manajemen bengkel', quota: 50, icon: '🏍️', color: 'from-red-500 to-orange-500' },
  ];

  const getMajorInfo = (code) => majors.find((m) => m.code === code);

  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
        <p className="text-xs text-purple-800 flex items-start gap-2"><FiInfo className="w-4 h-4 flex-shrink-0 mt-0.5" /><span><strong>Pilih Jurusan:</strong> Pilih 2 jurusan yang diminati. Jurusan pertama adalah prioritas utama.</span></p>
      </div>

      {/* Quick Quota Info */}
      <div className="grid grid-cols-5 gap-2">
        {majors.map((major) => (
          <div key={major.code} className="bg-white border border-gray-200 rounded-lg p-2 text-center hover:shadow-md transition-shadow">
            <div className="text-xl mb-0.5">{major.icon}</div>
            <p className="text-xs font-semibold text-gray-800">{major.code}</p>
            <p className="text-xs text-gray-500">{major.quota}</p>
          </div>
        ))}
      </div>

      {/* Pilihan 1 */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2"><FiMapPin className="text-blue-600" />Pilihan Jurusan Pertama</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {majors.map((major) => (
            <label key={major.code} className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${formData.pilihan_1 === major.code ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'} ${formData.pilihan_2 === major.code ? 'opacity-50' : ''}`}>
              <input type="radio" name="pilihan_1" value={major.code} checked={formData.pilihan_1 === major.code} onChange={handleChange} className="sr-only" disabled={formData.pilihan_2 === major.code} />
              <div className="flex items-start gap-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${major.color} flex items-center justify-center text-xl flex-shrink-0`}>{major.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm">{major.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{major.desc}</p>
                  <p className="text-xs text-gray-600 mt-1 font-medium">Kuota: {major.quota}</p>
                </div>
              </div>
              {formData.pilihan_1 === major.code && (<div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><FiCheck className="w-3 h-3 text-white" /></div>)}
            </label>
          ))}
        </div>
        {errors.pilihan_1 && <p className="text-red-500 text-xs">{errors.pilihan_1}</p>}
      </div>

      {/* Pilihan 2 */}
      <div className="space-y-3 pt-3 border-t">
        <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-2"><FiMapPin className="text-gray-400" />Pilihan Jurusan Kedua</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {majors.map((major) => (
            <label key={major.code} className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${formData.pilihan_2 === major.code ? 'border-gray-600 bg-gray-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'} ${formData.pilihan_1 === major.code ? 'opacity-50' : ''}`}>
              <input type="radio" name="pilihan_2" value={major.code} checked={formData.pilihan_2 === major.code} onChange={handleChange} className="sr-only" disabled={formData.pilihan_1 === major.code} />
              <div className="flex items-start gap-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${major.color} flex items-center justify-center text-xl flex-shrink-0 grayscale`}>{major.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm">{major.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{major.desc}</p>
                  <p className="text-xs text-gray-600 mt-1 font-medium">Kuota: {major.quota}</p>
                </div>
              </div>
              {formData.pilihan_2 === major.code && (<div className="absolute top-2 right-2 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"><FiCheck className="w-3 h-3 text-white" /></div>)}
            </label>
          ))}
        </div>
        {errors.pilihan_2 && <p className="text-red-500 text-xs">{errors.pilihan_2}</p>}
      </div>

      {/* Summary */}
      {(formData.pilihan_1 || formData.pilihan_2) && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-semibold text-gray-800 text-xs mb-2">Ringkasan Pilihan:</h4>
          <div className="space-y-1">
            {formData.pilihan_1 && (<p className="text-xs"><span className="font-medium text-blue-600">Pilihan 1:</span> {getMajorInfo(formData.pilihan_1)?.name}</p>)}
            {formData.pilihan_2 && (<p className="text-xs"><span className="font-medium text-gray-600">Pilihan 2:</span> {getMajorInfo(formData.pilihan_2)?.name}</p>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorForm;
