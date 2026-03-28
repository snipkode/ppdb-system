import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiMenu, FiX, FiChevronRight, FiUser, FiLogIn, FiLogOut,
  FiHome, FiFileText, FiInfo, FiBookOpen, FiMail, FiPhone
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Beranda', href: '/', icon: FiHome },
    { name: 'PPDB', href: '/ppdb', icon: FiFileText },
    { name: 'Jurusan', href: '/majors', icon: FiBookOpen },
    { name: 'Berita', href: '/news', icon: FiBook },
    { name: 'Profil', href: '/about', icon: FiInfo },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">🎓</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                SMK Nusantara
              </h1>
              <p className="text-xs text-gray-500">Unggul • Kompeten • Berkarakter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-800 line-clamp-1">{user.displayName}</p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            <Link
              to={user ? "/register" : "/login"}
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200"
            >
              <span>Daftar PPDB</span>
              <FiChevronRight />
            </Link>
          </div>

          {/* Mobile Menu Button - Modern Hamburger */}
          <button
            className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                }`}
              />
              <span
                className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Modern Slide Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Slide Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="relative pt-6 pb-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-white"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Logo in Mobile Menu */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">SMK Nusantara</h2>
                <p className="text-xs text-white/80">Unggul • Kompeten • Berkarakter</p>
              </div>
            </div>

            {/* User Info (if logged in) */}
            {user && (
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl p-3 mt-2">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-xl border-2 border-white/50 shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{user.displayName}</p>
                  <p className="text-xs text-white/70 truncate">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <span className="flex-1">{link.name}</span>
                  <FiChevronRight className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-6 border-t border-gray-200/60 space-y-3">
            {user ? (
              <button
                onClick={async () => {
                  await logout();
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-300"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Login dengan Google</span>
              </Link>
            )}

            <Link
              to={user ? "/register" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full px-4 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <FiFileText className="w-5 h-5" />
              <span>{user ? 'Lanjutkan Daftar' : 'Daftar PPDB Sekarang'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
