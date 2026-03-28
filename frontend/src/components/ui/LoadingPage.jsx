import { FiLoader } from 'react-icons/fi';

/**
 * Loading Page Component
 * Full-page loading state for lazy-loaded routes
 */
const LoadingPage = ({ message = 'Memuat...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
          <FiLoader className="w-6 h-6 text-blue-600 absolute inset-0 m-auto" />
        </div>
        <p className="text-gray-600 font-medium mt-8 animate-pulse">
          {message}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  );
};

/**
 * Loading Card Component
 * For inline loading states
 */
const LoadingCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

/**
 * Loading Table Component
 * For table loading states
 */
const LoadingTable = ({ rows = 5 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

export { LoadingPage, LoadingCard, LoadingTable };
export default LoadingPage;
