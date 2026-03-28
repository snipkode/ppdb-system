import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiFilter, FiChevronDown } from 'react-icons/fi';

/**
 * Reusable SearchFilter Component
 * 
 * Features:
 * - Search input with debounce
 * - Filter dropdown
 * - Sort options
 * - Mobile responsive
 * - Compact design
 * 
 * Usage:
 * <SearchFilter
 *   onSearch={handleSearch}
 *   onFilterChange={handleFilterChange}
 *   filters={[{ value: 'all', label: 'Semua' }, { value: 'active', label: 'Aktif' }]}
 *   placeholder="Cari data..."
 * />
 */

const SearchFilter = ({
  onSearch,
  onFilterChange,
  onSortChange,
  filters = [],
  sorts = [],
  placeholder = 'Cari data...',
  defaultValue = '',
  defaultFilter = 'all',
  showFilter = true,
  showSort = false,
  className = '',
  debounceMs = 300
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [selectedSort, setSelectedSort] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch && onSearch(searchTerm);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onSearch]);

  // Notify filter change
  useEffect(() => {
    onFilterChange && onFilterChange(selectedFilter);
  }, [selectedFilter, onFilterChange]);

  // Notify sort change
  useEffect(() => {
    onSortChange && onSortChange(selectedSort);
  }, [selectedSort, onSortChange]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    setIsFilterOpen(false);
  };

  const handleSortSelect = (value) => {
    setSelectedSort(value);
    setIsSortOpen(false);
  };

  const activeFilterLabel = filters.find(f => f.value === selectedFilter)?.label || 'Filter';
  const activeSortLabel = sorts.find(s => s.value === selectedSort)?.label || 'Urutkan';

  return (
    <div className={`bg-white rounded-xl shadow-sm p-3 ${className}`}>
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter & Sort Buttons */}
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          {showFilter && filters.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  isFilterOpen || selectedFilter !== 'all'
                    ? 'bg-purple-50 border-purple-300 text-purple-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiFilter className="w-4 h-4" />
                <span className="hidden sm:inline">{activeFilterLabel}</span>
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFilterOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-scale-up">
                    {filters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => handleFilterSelect(filter.value)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedFilter === filter.value
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Sort Dropdown */}
          {showSort && sorts.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  isSortOpen || selectedSort
                    ? 'bg-purple-50 border-purple-300 text-purple-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                <span className="hidden sm:inline">{activeSortLabel}</span>
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-scale-up">
                    {sorts.map((sort) => (
                      <button
                        key={sort.value}
                        onClick={() => handleSortSelect(sort.value)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedSort === sort.value
                            ? 'bg-purple-50 text-purple-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
