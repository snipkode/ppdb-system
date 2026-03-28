import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component
 * Manages meta tags, title, and Open Graph tags for each page
 * 
 * Usage:
 * <SEO 
 *   title="Page Title"
 *   description="Page description"
 *   canonical="/page-url"
 *   image="/og-image.jpg"
 * />
 */
const SEO = ({
  title,
  description,
  canonical,
  image,
  type = 'website',
  keywords,
  author = 'PPDB Online',
  robots = 'index, follow',
  publishedTime,
  modifiedTime
}) => {
  const location = useLocation();

  // Default values
  const defaults = {
    title: 'PPDB Online - Pendaftaran Siswa Baru',
    description: 'Sistem Pendaftaran Siswa Baru (PPDB) Online - Mudah, Cepat, dan Transparan',
    image: '/og-image.jpg',
    url: `${window.location.origin}${location.pathname}`,
    siteName: 'PPDB Online',
    locale: 'id_ID'
  };

  const pageTitle = title ? `${title} - ${defaults.siteName}` : defaults.title;

  useEffect(() => {
    // Set document title
    document.title = pageTitle;

    // Helper function to set/update meta tag
    const setMetaTag = (name, content, isProperty = false) => {
      let meta = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic SEO
    setMetaTag('description', description || defaults.description);
    setMetaTag('keywords', keywords || 'PPDB, pendaftaran siswa baru, sekolah, SMK, pendidikan');
    setMetaTag('author', author);
    setMetaTag('robots', robots);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${window.location.origin}${canonical}`);
    }

    // Open Graph / Facebook
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', defaults.url, true);
    setMetaTag('og:title', pageTitle, true);
    setMetaTag('og:description', description || defaults.description, true);
    setMetaTag('og:image', image || defaults.image, true);
    setMetaTag('og:site_name', defaults.siteName, true);
    setMetaTag('og:locale', defaults.locale, true);

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', pageTitle);
    setMetaTag('twitter:description', description || defaults.description);
    setMetaTag('twitter:image', image || defaults.image);

    // Article specific (if applicable)
    if (type === 'article') {
      if (publishedTime) {
        setMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        setMetaTag('article:modified_time', modifiedTime, true);
      }
    }

    // Cleanup function (optional - remove meta tags on unmount if needed)
    return () => {
      // Meta tags are kept for performance
    };
  }, [pageTitle, description, canonical, image, type, keywords, author, robots, publishedTime, modifiedTime]);

  // This component doesn't render anything
  return null;
};

/**
 * Preconnect Component
 * Adds preconnect links for external resources
 */
const Preconnect = ({ href, crossorigin = 'anonymous' }) => {
  useEffect(() => {
    let link = document.querySelector(`link[rel="preconnect"][href="${href}"]`);
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'preconnect');
      link.setAttribute('href', href);
      if (crossorigin) {
        link.setAttribute('crossorigin', crossorigin);
      }
      document.head.appendChild(link);
    }
  }, [href, crossorigin]);

  return null;
};

/**
 * Prefetch Component
 * Adds prefetch links for resources
 */
const Prefetch = ({ href, as = 'document' }) => {
  useEffect(() => {
    let link = document.querySelector(`link[rel="prefetch"][href="${href}"]`);
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'prefetch');
      link.setAttribute('href', href);
      link.setAttribute('as', as);
      document.head.appendChild(link);
    }
  }, [href, as]);

  return null;
};

export { SEO, Preconnect, Prefetch };
export default SEO;
