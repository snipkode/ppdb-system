import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Reusable Modal Component
 * 
 * Features:
 * - Backdrop blur
 * - Animation on open/close
 * - Close on backdrop click
 * - Close on ESC key
 * - Scroll lock
 * - Responsive sizing
 * 
 * Usage:
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Modal Title"
 *   size="md"
 * >
 *   Modal content here
 * </Modal>
 */

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  headerClassName = '',
  contentClassName = '',
  className = ''
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };
    if (isOpen && closeOnEsc) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95%]'
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} ${className} animate-scale-up`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`flex items-start justify-between px-4 md:px-6 py-4 border-b ${
            headerClassName ? 'border-transparent' : 'border-gray-100'
          } ${headerClassName}`}>
            <div className="flex-1 min-w-0">
              {title && (
                <h2 id="modal-title" className={`text-lg md:text-xl font-bold truncate ${
                  headerClassName ? 'text-white' : 'text-gray-800'
                }`}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={`text-xs md:text-sm mt-1 ${
                  headerClassName ? 'text-white/80' : 'text-gray-500'
                }`}>{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`ml-2 p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                  headerClassName 
                    ? 'text-white/80 hover:text-white hover:bg-white/20' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`px-4 md:px-6 py-4 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
