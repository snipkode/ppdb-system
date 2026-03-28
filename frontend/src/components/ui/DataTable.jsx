import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

/**
 * Reusable DataTable Component
 * 
 * Features:
 * - Responsive design with mobile card view
 * - Pagination
 * - Sortable columns
 * - Row selection
 * - Custom cell rendering
 * 
 * Usage:
 * <DataTable
 *   columns={columns}
 *   data={data}
 *   onRowClick={handleRowClick}
 *   pagination
 *   itemsPerPage={10}
 * />
 */

const DataTable = ({ 
  columns = [],
  data = [],
  loading = false,
  onRowClick,
  pagination = false,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  totalItems,
  emptyMessage = 'Tidak ada data',
  className = '',
  mobileCard = true
}) => {
  const totalPages = Math.ceil((totalItems || data.length) / itemsPerPage);

  const renderCell = (item, column, rowIndex) => {
    if (column.render) {
      return column.render(item, rowIndex);
    }
    if (column.accessor) {
      return typeof column.accessor === 'function' 
        ? column.accessor(item)
        : item[column.accessor];
    }
    return item[column.field];
  };

  // Mobile Card View
  if (mobileCard) {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
              <tr>
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer hover:bg-purple-100' : ''
                    }`}
                    onClick={() => column.sortable && column.onSort && column.onSort(column.field)}
                  >
                    <div className="flex items-center gap-1">
                      {column.header}
                      {column.sortable && (
                        <FiChevronsLeft className="w-3 h-3 opacity-50" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, rowIndex) => (
                  <tr
                    key={item.id || rowIndex}
                    className={`hover:bg-purple-50 transition-colors ${
                      onRowClick ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                        {renderCell(item, column, rowIndex)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Memuat data...</span>
              </div>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {emptyMessage}
            </div>
          ) : (
            data.map((item, index) => (
              <div
                key={item.id || index}
                className={`bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="mb-3 last:mb-0">
                    {column.mobileLabel && (
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        {column.mobileLabel}
                      </div>
                    )}
                    <div className="text-sm text-gray-800">
                      {renderCell(item, column, index)}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="text-xs text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange && onPageChange(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPageChange && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page Numbers - Compact */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange && onPageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onPageChange && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onPageChange && onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Only Table View
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <table className="w-full">
        <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
          <tr>
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-purple-100' : ''
                }`}
                onClick={() => column.sortable && column.onSort && column.onSort(column.field)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && (
                    <FiChevronsLeft className="w-3 h-3 opacity-50" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Memuat data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className={`hover:bg-purple-50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                    {renderCell(item, column, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <div className="text-xs text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange && onPageChange(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange && onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
