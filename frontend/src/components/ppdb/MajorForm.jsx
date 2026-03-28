import { FiMapPin, FiInfo } from 'react-icons/fi';

const MajorForm = ({ formData, handleChange, errors }) => {
  const majors = [
    {
      code: 'RPL',
      name: 'Rekayasa Perangkat Lunak',
      description: 'Belajar coding, pengembangan aplikasi web & mobile, UI/UX design',
      quota: 100,
      icon: '💻',
      color: 'from-blue-500 to-blue-700',
    },
    {
      code: 'TKJ',
      name: 'Teknik Komputer & Jaringan',
      description: 'Jaringan komputer, administrasi server, cloud computing',
      quota: 80,
      icon: '🖥️',
      color: 'from-green-500 to-green-700',
    },
    {
      code: 'AKL',
      name: 'Akuntansi & Keuangan Lembaga',
      description: 'Akuntansi, perpajakan, administrasi keuangan',
      quota: 60,
      icon: '📊',
      color: 'from-purple-500 to-purple-700',
    },
    {
      code: 'MM',
      name: 'Multimedia',
      description: 'Desain grafis, fotografi, videografi, animasi',
      quota: 60,
      icon: '🎨',
      color: 'from-orange-500 to-orange-700',
    },
    {
      code: 'TBSM',
      name: 'Teknik Bisnis Sepeda Motor',
      description: 'Teknik sepeda motor, bisnis otomotif, manajemen bengkel',
      quota: 50,
      icon: '🏍️',
      color: 'from-red-500 to-red-700',
    },
  ];

  const getMajorInfo = (code) => {
    return majors.find((m) => m.code === code);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-800 flex items-start gap-2">
          <FiInfo className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Pilih Jurusan:</strong> Pilih 2 jurusan yang diminati. 
            Jurusan pertama adalah prioritas utama. Pastikan pilihan sesuai dengan minat dan bakat Anda.
          </span>
        </p>
      </div>

      {/* Info Kuota */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {majors.map((major) => (
          <div
            key={major.code}
            className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-1">{major.icon}</div>
            <p className="text-xs font-semibold text-gray-800">{major.code}</p>
            <p className="text-xs text-gray-500">Kuota: {major.quota}</p>
          </div>
        ))}
      </div>

      {/* Pilihan Jurusan 1 */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiMapPin className="text-primary-600" />
          Pilihan Jurusan Pertama
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {majors.map((major) => (
            <label
              key={major.code}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                formData.pilihan_1 === major.code
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              } ${formData.pilihan_2 === major.code ? 'opacity-50' : ''}`}
            >
              <input
                type="radio"
                name="pilihan_1"
                value={major.code}
                checked={formData.pilihan_1 === major.code}
                onChange={handleChange}
                className="sr-only"
                disabled={formData.pilihan_2 === major.code}
              />
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${major.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {major.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{major.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{major.description}</p>
                  <p className="text-xs text-gray-600 mt-2 font-medium">
                    Kuota: {major.quota} siswa
                  </p>
                </div>
              </div>
              {formData.pilihan_1 === major.code && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
        {errors.pilihan_1 && (
          <p className="text-red-500 text-sm">{errors.pilihan_1}</p>
        )}
      </div>

      {/* Pilihan Jurusan 2 */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
          <FiMapPin className="text-gray-400" />
          Pilihan Jurusan Kedua
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {majors.map((major) => (
            <label
              key={major.code}
              className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                formData.pilihan_2 === major.code
                  ? 'border-gray-600 bg-gray-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              } ${formData.pilihan_1 === major.code ? 'opacity-50' : ''}`}
            >
              <input
                type="radio"
                name="pilihan_2"
                value={major.code}
                checked={formData.pilihan_2 === major.code}
                onChange={handleChange}
                className="sr-only"
                disabled={formData.pilihan_1 === major.code}
              />
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${major.color} flex items-center justify-center text-2xl flex-shrink-0 grayscale`}>
                  {major.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{major.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{major.description}</p>
                  <p className="text-xs text-gray-600 mt-2 font-medium">
                    Kuota: {major.quota} siswa
                  </p>
                </div>
              </div>
              {formData.pilihan_2 === major.code && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
        {errors.pilihan_2 && (
          <p className="text-red-500 text-sm">{errors.pilihan_2}</p>
        )}
      </div>

      {/* Summary */}
      {(formData.pilihan_1 || formData.pilihan_2) && (
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Ringkasan Pilihan:</h4>
          <div className="space-y-2">
            {formData.pilihan_1 && (
              <p className="text-sm">
                <span className="font-medium text-primary-600">Pilihan 1:</span>{' '}
                {getMajorInfo(formData.pilihan_1)?.name}
              </p>
            )}
            {formData.pilihan_2 && (
              <p className="text-sm">
                <span className="font-medium text-gray-600">Pilihan 2:</span>{' '}
                {getMajorInfo(formData.pilihan_2)?.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorForm;
