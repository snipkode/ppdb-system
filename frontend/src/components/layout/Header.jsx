import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiChevronRight, FiUser, FiLogIn, FiLogOut, FiShield,
  FiHome, FiFileText, FiInfo, FiBookOpen, FiStar, FiAward
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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Beranda', href: '/', icon: FiHome },
    { name: 'PPDB', href: '/ppdb', icon: FiFileText },
    { name: 'Jurusan', href: '/majors', icon: FiBookOpen },
    { name: 'Berita', href: '/news', icon: FiInfo },
    { name: 'Profil', href: '/profile-sekolah', icon: FiStar },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-xl shadow-purple-500/10' 
          : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px] md:h-[72px] lg:h-[80px]">
          {/* Logo - Enhanced Branding */}
          <Link to="/" className="flex items-center gap-2 md:gap-2.5 lg:gap-3 group">
            {/* Logo Icon */}
            <div className="relative">
              <div className="w-[42px] h-[42px] md:w-11 md:h-11 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105">
                <div className="relative">
                  <span className="text-xl md:text-2xl">🎓</span>
                </div>
              </div>
              {/* Accent dot */}
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-md"></div>
            </div>
            
            {/* Logo Text */}
            <div className="hidden sm:block">
              <div className="flex items-baseline gap-1.5 md:gap-2">
                <h1 className="font-black text-base md:text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                  SMK Nusantara
                </h1>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 md:px-2 md:py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[9px] md:text-[10px] font-bold rounded-full shadow-md">
                  <FiAward className="w-2 h-2 md:w-2.5 md:h-2.5 mr-0.5" />
                  A
                </span>
              </div>
              <p className="text-[9px] md:text-xs text-gray-500 font-medium tracking-wide">
                UNGGUL • KOMPETEN • BERKARAKTER
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {/* Active/Hover Background */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                    : 'bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:via-purple-50 group-hover:to-pink-50'
                }`} />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            {user ? (
              <div className="hidden md:flex items-center gap-2.5">
                {/* Admin Dashboard */}
                {user.isAdmin && (
                  <Link
                    to="/admin/payments"
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105"
                  >
                    <FiShield className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden lg:inline">Dashboard</span>
                  </Link>
                )}

                {/* User Profile */}
                <div className="flex items-center gap-1.5 md:gap-2.5 pl-1.5 md:pl-2.5 border-l border-gray-200">
                  <div className="relative">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 object-cover"
                    />
                    {user.isAdmin && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                        <FiShield className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-gray-700 max-w-[80px] md:max-w-[100px] truncate">
                    {user.displayName?.split(' ')[0]}
                  </span>
                  <button
                    onClick={async () => {
                      await logout();
                      navigate('/');
                    }}
                    className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-all"
                    title="Logout"
                  >
                    <FiLogOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all duration-200 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
              >
                <FiLogIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Masuk</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-[42px] h-[42px] md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 hover:from-blue-100 hover:via-purple-100 hover:to-pink-100 transition-all duration-300 group shadow-md z-30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                }`}
              />
              <span
                className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[9999] lg:hidden ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
          style={{ zIndex: 1 }}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white/98 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          style={{ zIndex: 2 }}
        >
          {/* Mobile Menu Header */}
          <div className="relative pt-5 pb-4 px-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden z-10">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-white z-20 hover:scale-110 active:scale-95"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Mobile Logo */}
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-white">SMK Nusantara</h2>
                <p className="text-xs text-white/80 font-medium">Unggul • Kompeten • Berkarakter</p>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl p-3 relative">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-xl border-2 border-white/50 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm truncate">{user.displayName}</p>
                  <p className="text-xs text-white/70 truncate">{user.email}</p>
                </div>
                {user.isAdmin && (
                  <div className="px-2 py-1 bg-white/30 backdrop-blur-sm rounded-lg">
                    <FiShield className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 bg-white">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50'
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
          <div className="px-4 py-4 border-t border-gray-100 bg-white space-y-2">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin/payments"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    <FiShield className="w-5 h-5" />
                    <span>Dashboard Admin</span>
                  </Link>
                )}

                <button
                  onClick={async () => {
                    await logout();
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl font-bold text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-300"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Masuk / Daftar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
