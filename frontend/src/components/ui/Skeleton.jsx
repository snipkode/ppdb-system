/**
 * Loading Skeleton Components
 * Used for loading states to improve perceived performance
 */

/**
 * Text Skeleton
 */
const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

/**
 * Card Skeleton
 */
const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
    </div>
  </div>
);

/**
 * Table Skeleton
 */
const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-4 border-b">
      <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
    </div>
    <div className="p-6 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="h-4 bg-gray-200 rounded flex-1 animate-pulse"
              style={{ animationDelay: `${j * 100}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

/**
 * Image Skeleton
 */
const SkeletonImage = ({ className = '', ratio = 'square' }) => {
  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  return (
    <div className={`${ratios[ratio]} ${className}`}>
      <div className="w-full h-full bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

/**
 * Stats Card Skeleton
 */
const SkeletonStats = ({ count = 4 }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Form Skeleton
 */
const SkeletonForm = ({ fields = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i}>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    ))}
    <div className="pt-4">
      <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
    </div>
  </div>
);

export {
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonImage,
  SkeletonStats,
  SkeletonForm
};

export default SkeletonText;
