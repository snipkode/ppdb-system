import PPDBInfo from '@/components/ppdb/PPDBInfo';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const PPDB = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PPDB Online 2024/2025
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Pendaftaran Peserta Didik Baru SMK Nusantara
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <FiChevronRight className="w-5 h-5" />
                Daftar Sekarang
              </Link>
              <Link
                to="/status"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white font-semibold px-8 py-3 rounded-lg border border-white/30 hover:bg-primary-400 transition-all duration-200"
              >
                Cek Status Pendaftaran
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <PPDBInfo />
        </div>
      </div>
    </div>
  );
};

export default PPDB;
