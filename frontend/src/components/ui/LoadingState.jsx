import { FiLoader } from 'react-icons/fi';

/**
 * LoadingState Component
 * For inline loading states with message
 * 
 * Usage:
 * <LoadingState message="Memuat data..." />
 */
const LoadingState = ({ message = 'Memuat...' }) => {
  return (
    <div className="py-16 px-4 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <FiLoader className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
      <p className="text-gray-600 font-medium animate-pulse">
        {message}
      </p>
      <p className="text-gray-400 text-sm mt-2">
        Mohon tunggu sebentar
      </p>
    </div>
  );
};

export default LoadingState;
