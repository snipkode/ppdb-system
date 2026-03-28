import { forwardRef } from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

/**
 * Reusable Input Component
 * 
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {string} success - Success message
 * @param {boolean} required - Required field
 * @param {string} helpText - Help text below input
 * @param {React.ReactNode} icon - Icon to display
 * @param {string} className - Additional CSS classes
 */
const Input = forwardRef(({
  label,
  error,
  success,
  required = false,
  helpText,
  icon: Icon,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const states = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50'
  };

  const currentState = error ? 'error' : success ? 'success' : 'default';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${states[currentState]}`}
          {...props}
        />
        {Icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <FiAlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-1 text-sm text-green-600">
          <FiCheckCircle className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      {helpText && !error && !success && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
