import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import { useUIStore } from '@/stores/useStore';

const Notification = () => {
  const { notification, hideNotification } = useUIStore();

  if (!notification) return null;

  const icons = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    warning: FiAlertCircle,
    info: FiAlertCircle,
  };

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  const Icon = icons[notification.type] || icons.info;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div
        className={`${bgColors[notification.type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md`}
      >
        <Icon className="text-xl flex-shrink-0" />
        <p className="flex-1 font-medium">{notification.message}</p>
        <button
          onClick={hideNotification}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <FiX className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
