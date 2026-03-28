import { useState, useEffect, useRef } from 'react';

/**
 * LazyImage Component
 * Lazy loading image with placeholder and fade-in effect
 * 
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {string} placeholder - Placeholder color or URL
 * @param {string} className - Additional CSS classes
 * @param {string} ratio - Aspect ratio (square, video, portrait, landscape, auto)
 * @param {boolean} useBlur - Use blur-up effect
 */
const LazyImage = ({
  src,
  alt = '',
  placeholder = '#e5e7eb',
  className = '',
  ratio = 'auto',
  useBlur = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: ''
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-200 ${aspectRatios[ratio]} ${className}`}
      style={{
        backgroundColor: typeof placeholder === 'string' && !placeholder.startsWith('#') && !placeholder.startsWith('http') ? placeholder : undefined
      }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {typeof placeholder === 'string' && placeholder.startsWith('http') ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-md scale-110"
            />
          ) : (
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded && useBlur ? 'opacity-100' : 'opacity-0'
          } ${isLoaded ? '' : 'animate-pulse'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
