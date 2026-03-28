import { createContext, useContext, useState, useCallback } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now();
    const newToast = {
      id,
      type: toast.type || 'info',
      title: toast.title,
      message: toast.message,
      duration: toast.duration || 5000
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove
    if (newToast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (title, message, options) => 
      addToast({ type: 'success', title, message, ...options }),
    error: (title, message, options) => 
      addToast({ type: 'error', title, message, ...options }),
    warning: (title, message, options) => 
      addToast({ type: 'warning', title, message, ...options }),
    info: (title, message, options) => 
      addToast({ type: 'info', title, message, ...options })
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const icons = {
    success: { icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
    error: { icon: FiAlertCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    warning: { icon: FiAlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    info: { icon: FiInfo, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' }
  };

  const { icon: Icon, color, bg, border } = icons[toast.type];

  return (
    <div
      className={`${bg} ${border} border rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in-right`}
      role="alert"
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-semibold text-gray-800 text-sm">{toast.title}</p>
        )}
        {toast.message && (
          <p className="text-gray-600 text-sm mt-1">{toast.message}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastProvider;
