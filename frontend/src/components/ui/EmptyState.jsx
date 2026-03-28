import { FiInbox, FiSearch, FiFile, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';
import Button from './Button';

/**
 * Empty State Component
 * Used when there's no data to display
 */
const EmptyState = ({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
  className = ''
}) => {
  const defaultIcons = {
    inbox: FiInbox,
    search: FiSearch,
    file: FiFile,
    help: FiHelpCircle,
    success: FiCheckCircle
  };

  const DisplayIcon = Icon || defaultIcons.inbox;

  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <DisplayIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

/**
 * No Data Empty State
 */
const NoDataEmpty = ({ onRefresh, loading }) => (
  <EmptyState
    icon={FiInbox}
    title="Belum Ada Data"
    message="Belum ada data yang tersedia. Silakan refresh atau coba lagi nanti."
    actionLabel={loading ? 'Memuat...' : 'Refresh'}
    onAction={onRefresh}
  />
);

/**
 * No Search Results Empty State
 */
const NoResultsEmpty = ({ searchTerm, onClear }) => (
  <EmptyState
    icon={FiSearch}
    title="Tidak Ditemukan"
    message={`Tidak ada hasil yang cocok untuk "${searchTerm}". Coba kata kunci lain atau hapus filter.`}
    actionLabel="Hapus Pencarian"
    onAction={onClear}
  />
);

/**
 * No Access Empty State
 */
const NoAccessEmpty = ({ onBack }) => (
  <EmptyState
    icon={FiHelpCircle}
    title="Akses Ditolak"
    message="Anda tidak memiliki akses untuk melihat halaman ini. Silakan hubungi administrator."
    actionLabel="Kembali"
    onAction={onBack}
  />
);

/**
 * Success Empty State
 */
const SuccessEmpty = ({ title, message, actionLabel, onAction }) => (
  <EmptyState
    icon={FiCheckCircle}
    title={title || 'Berhasil!'}
    message={message}
    actionLabel={actionLabel}
    onAction={onAction}
  />
);

export {
  EmptyState,
  NoDataEmpty,
  NoResultsEmpty,
  NoAccessEmpty,
  SuccessEmpty
};

export default EmptyState;
