import { useEffect, useState } from 'react';

/**
 * usePerformance Hook
 * Monitor page performance metrics
 */
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null  // Cumulative Layout Shift
  });

  useEffect(() => {
    // Get FCP from Performance API
    const getFCP = () => {
      const entry = performance.getEntriesByType('paint')
        .find(e => e.name === 'first-contentful-paint');
      if (entry) {
        setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
      }
    };

    // Get LCP
    const getLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP not supported');
      }
    };

    // Get CLS
    const getCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      
      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS not supported');
      }
    };

    getFCP();
    getLCP();
    getCLS();

    // Log metrics on page unload
    const handleBeforeUnload = () => {
      console.log('Performance Metrics:', metrics);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return metrics;
};

/**
 * useIdle Hook
 * Detect user idle state
 */
export const useIdle = (timeout = 60000) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), timeout);
    };

    // Events to track
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, resetIdle);
    });

    resetIdle();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetIdle);
      });
    };
  }, [timeout]);

  return isIdle;
};

/**
 * useNetworkStatus Hook
 * Monitor network connection
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection speed
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const checkSpeed = () => {
        setIsSlow(connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      };
      
      checkSpeed();
      connection.addEventListener('change', checkSpeed);
      
      return () => {
        connection.removeEventListener('change', checkSpeed);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, isSlow };
};

export default { usePerformance, useIdle, useNetworkStatus };
