/**
 * Reusable StatCard Component
 * 
 * Usage examples:
 * <StatCard label="Total" value={100} color="from-blue-500 to-cyan-500" icon={<FiDollarSign />} />
 * <StatCard label="Total" value={100} color="from-blue-500 to-cyan-500" icon={<FiDollarSign />} trend="+12%" />
 * <StatCard label="Total" value={100} color="from-blue-500 to-cyan-500" icon={<FiDollarSign />} variant="outlined" />
 */

const StatCard = ({ 
  label, 
  value, 
  color = 'from-blue-500 to-cyan-500', 
  icon, 
  trend,
  trendUp = true,
  variant = 'gradient', // 'gradient' | 'outlined' | 'soft'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = ''
}) => {
  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const valueSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  const baseClasses = `rounded-lg text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${sizeClasses[size]} ${className}`;

  const variantClasses = {
    gradient: `bg-gradient-to-br ${color} shadow-lg`,
    outlined: `bg-white border-2 border-${color.split(' ')[0].replace('from-', '')} text-gray-800`,
    soft: `bg-${color.split(' ')[0].replace('from-', '')}-100 text-gray-800`
  };

  return (
    <div className={`${baseClasses} ${variant === 'gradient' ? variantClasses.gradient : variantClasses[variant]}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className={`${labelSizes[size]} font-medium truncate text-white/90`}>{label}</p>
          <p className={`${valueSizes[size]} font-bold truncate drop-shadow-sm`}>{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-1 ${trendUp ? 'text-green-200' : 'text-red-200'}`}>
              <span className="text-xs font-semibold">
                {trendUp ? '↑' : '↓'} {trend}
              </span>
            </div>
          )}
        </div>
        <div className={`${iconSizes[size]} bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 ml-2 shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
