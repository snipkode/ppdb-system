import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiChevronRight, FiUser } from 'react-icons/fi';
import { useAuthStore } from '@/stores/useAuthStore';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Profil', href: '/about' },
    { name: 'Jurusan', href: '/majors' },
    { name: 'Berita', href: '/news' },
    { name: 'Kontak', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">🎓</span>
            </div>
            <div>
              <h1 className={`font-bold text-lg md:text-xl ${isScrolled ? 'text-primary-600' : 'text-primary-800'}`}>
                SMK Nusantara
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Unggul • Kompeten • Berkarakter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    : 'text-gray-800 hover:text-primary-700 hover:bg-white/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Profile Link (if logged in) */}
            {user && (
              <Link
                to="/profile"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-800 hover:bg-white/50'
                }`}
              >
                <FiUser className="w-5 h-5" />
                <span className="text-sm">Profile</span>
              </Link>
            )}

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <span>Daftar PPDB</span>
                <FiChevronRight />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-700" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  <FiChevronRight className="w-4 h-4" />
                </Link>
              ))}
              
              {/* Profile Link (if logged in) */}
              {user && (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="w-5 h-5" />
                  <span>Profile Saya</span>
                </Link>
              )}
              
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Daftar PPDB Online</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
