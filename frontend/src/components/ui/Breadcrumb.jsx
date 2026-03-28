import { Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

/**
 * Reusable Breadcrumb Component
 * 
 * Features:
 * - Automatic home link
 * - Custom separator
 * - Mobile responsive with horizontal scroll
 * - Compact design
 * 
 * Usage:
 * <Breadcrumb
 *   items={[
 *     { label: 'Dashboard', href: '/admin' },
 *     { label: 'Pembayaran', href: '/admin/payments' },
 *     { label: 'Detail', href: '#' }
 *   ]}
 * />
 */

const Breadcrumb = ({
  items = [],
  homeLabel = 'Home',
  homeHref = '/',
  separator = 'breadcrumb',
  className = '',
  showHome = true
}) => {
  return (
    <nav className={`flex items-center gap-1 overflow-x-auto ${className}`} aria-label="Breadcrumb">
      {/* Home Link */}
      {showHome && (
        <>
          <Link
            to={homeHref}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors flex-shrink-0"
          >
            <FiHome className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">{homeLabel}</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </>
      )}

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.href || item.label} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="px-2 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className="px-2 py-1.5 rounded-lg text-xs font-medium text-purple-600 bg-purple-50 whitespace-nowrap">
                {item.label}
              </span>
            )}
            {!isLast && (
              <FiChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
