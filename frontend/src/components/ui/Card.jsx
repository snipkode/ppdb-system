/**
 * Reusable Card Component
 * 
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hoverable - Add hover effect
 * @param {function} onClick - Click handler (makes card clickable)
 */
const Card = ({ 
  children, 
  className = '', 
  hoverable = false,
  onClick,
  padding = true
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md';
  const hoverStyles = hoverable || onClick ? 'hover:shadow-lg transition-shadow cursor-pointer' : '';
  const paddingStyles = padding ? 'p-6' : '';

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${paddingStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * Card Header Component
 */
const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

/**
 * Card Title Component
 */
const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
    {children}
  </h3>
);

/**
 * Card Content Component
 */
const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

/**
 * Card Footer Component
 */
const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
export default Card;
