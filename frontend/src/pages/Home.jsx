import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiBook, FiUserPlus, FiAward } from 'react-icons/fi';
import Dashboard from '@/components/Dashboard';

const Home = () => {
  const features = [
    {
      icon: FiBook,
      title: 'Pendaftaran Mudah',
      description: 'Proses pendaftaran online yang cepat dan mudah diakses kapan saja.',
    },
    {
      icon: FiUserPlus,
      title: 'Verifikasi Cepat',
      description: 'Sistem verifikasi yang efisien untuk mempercepat proses seleksi.',
    },
    {
      icon: FiAward,
      title: 'Transparan',
      description: 'Pantau status pendaftaran Anda secara real-time.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Selamat Datang di PPDB Online
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-6 max-w-2xl">
            Sistem Penerimaan Peserta Didik Baru - Mudah, Cepat, dan Transparan
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              <FiUserPlus />
              Daftar Sekarang
            </Link>
            <Link to="/status" className="btn-secondary border-white text-white hover:bg-white/20">
              <FiCheck />
              Cek Status
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Dashboard */}
      <Dashboard />

      {/* CTA Section */}
      <div className="card bg-gradient-to-r from-green-500 to-green-700 text-white text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Siap untuk Mendaftar?</h2>
        <p className="opacity-90 mb-6 max-w-xl mx-auto">
          Segera daftarkan diri Anda dan bergabunglah dengan ribuan siswa lainnya.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200"
        >
          Mulai Pendaftaran
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Home;
