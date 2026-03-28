import { FiCheckCircle, FiXCircle, FiClock, FiAlertCircle, FiMinus } from 'react-icons/fi';

/**
 * Reusable StatusBadge Component
 * 
 * Features:
 * - Consistent status colors
 * - Multiple variants (badge, dot, pill)
 * - Custom status support
 * - Icon integration
 * - Mobile responsive
 * 
 * Usage:
 * <StatusBadge status="paid" label="Lunas" />
 * <StatusBadge status="pending" variant="pill" />
 * <StatusBadge status="custom" label="Custom" color="blue" />
 */

const StatusBadge = ({
  status,
  label,
  variant = 'badge', // 'badge' | 'pill' | 'dot' | 'soft'
  size = 'md', // 'sm' | 'md' | 'lg'
  showIcon = true,
  className = ''
}) => {
  const statusConfig = {
    paid: {
      label: label || 'Lunas',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      icon: FiCheckCircle
    },
    pending: {
      label: label || 'Menunggu',
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200',
      icon: FiClock
    },
    rejected: {
      label: label || 'Ditolak',
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      icon: FiXCircle
    },
    unpaid: {
      label: label || 'Belum Bayar',
      color: 'bg-gray-500',
      lightColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      icon: FiMinus
    },
    verified: {
      label: label || 'Terverifikasi',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      icon: FiCheckCircle
    },
    process: {
      label: label || 'Proses',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      icon: FiClock
    },
    success: {
      label: label || 'Berhasil',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      icon: FiCheckCircle
    },
    error: {
      label: label || 'Gagal',
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      icon: FiXCircle
    },
    warning: {
      label: label || 'Peringatan',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      icon: FiAlertCircle
    },
    info: {
      label: label || 'Info',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      icon: FiAlertCircle
    },
    active: {
      label: label || 'Aktif',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      icon: FiCheckCircle
    },
    inactive: {
      label: label || 'Tidak Aktif',
      color: 'bg-gray-500',
      lightColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200',
      icon: FiMinus
    }
  };

  const config = statusConfig[status] || {
    label: label || status,
    color: 'bg-gray-500',
    lightColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200',
    icon: FiMinus
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: {
      badge: 'px-2 py-0.5 text-xs',
      pill: 'px-2.5 py-0.5 text-xs',
      dot: 'w-2 h-2',
      soft: 'px-2 py-1 text-xs'
    },
    md: {
      badge: 'px-2.5 py-1 text-xs',
      pill: 'px-3 py-1 text-sm',
      dot: 'w-2.5 h-2.5',
      soft: 'px-2.5 py-1 text-sm'
    },
    lg: {
      badge: 'px-3 py-1.5 text-sm',
      pill: 'px-4 py-1.5 text-sm',
      dot: 'w-3 h-3',
      soft: 'px-3 py-1.5 text-sm'
    }
  };

  // Badge variant - solid background with white text
  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${config.color} text-white font-medium rounded-lg ${sizeClasses[size].badge} ${className}`}>
        {showIcon && <Icon className="w-3.5 h-3.5" />}
        {config.label}
      </span>
    );
  }

  // Pill variant - rounded full
  if (variant === 'pill') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${config.color} text-white font-medium rounded-full ${sizeClasses[size].pill} ${className}`}>
        {showIcon && <Icon className="w-3.5 h-3.5" />}
        {config.label}
      </span>
    );
  }

  // Dot variant - just a colored dot
  if (variant === 'dot') {
    return (
      <span className="inline-flex items-center gap-2">
        <span className={`${config.color} rounded-full ${sizeClasses[size].dot} ${className}`} />
        {config.label}
      </span>
    );
  }

  // Soft variant - light background with colored text
  if (variant === 'soft') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${config.lightColor} ${config.textColor} font-medium rounded-lg border ${config.borderColor} ${sizeClasses[size].soft} ${className}`}>
        {showIcon && <Icon className="w-3.5 h-3.5" />}
        {config.label}
      </span>
    );
  }

  return null;
};

export default StatusBadge;
