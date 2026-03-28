import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiChevronRight, FiChevronDown, FiUser, FiLogIn, FiLogOut, FiShield,
  FiHome, FiFileText, FiInfo, FiBookOpen, FiMail, FiPhone, FiCreditCard, FiBell,
  FiCalendar, FiBarChart2, FiSettings, FiUsers
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
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
    { name: 'Berita', href: '/news', icon: FiBookOpen },
    { name: 'Profil', href: '/about', icon: FiInfo },
  ];

  // Admin navigation menu
  const adminMenuItems = [
    { name: 'Pembayaran', href: '/admin/payments', icon: FiCreditCard, description: 'Kelola cicilan' },
    { name: 'Notifikasi', href: '/admin/notifications', icon: FiBell, description: 'Kirim notifikasi' },
    { name: 'Jadwal Ujian', href: '/admin/exams', icon: FiCalendar, description: 'Atur jadwal' },
    { name: 'Nilai', href: '/admin/exam-results', icon: FiBarChart2, description: 'Input nilai' },
    { name: 'Laporan', href: '/admin/reports', icon: FiBarChart2, description: 'Statistik & laporan' },
    { name: 'Kelola Admin', href: '/admin/manage-admins', icon: FiUsers, description: 'Manage user' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-2.5 group">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-base md:text-lg">🎓</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-sm md:text-base text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                SMK Nusantara
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Unggul • Kompeten • Berkarakter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all duration-200 group ${
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className={`absolute inset-0 rounded-lg md:rounded-xl transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                    : 'bg-transparent group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:via-purple-50 group-hover:to-pink-50'
                }`} />
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            {user ? (
              <div className="hidden md:flex items-center gap-2.5">
                {/* Admin Dropdown Menu */}
                {user.isAdmin && (
                  <div className="relative">
                    <button
                      onClick={() => setShowAdminMenu(!showAdminMenu)}
                      className="flex items-center gap-1.5 md:gap-2 px-3 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/40"
                    >
                      <FiShield className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="hidden lg:inline">Admin</span>
                      <FiChevronDown className={`w-3 h-3 transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showAdminMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowAdminMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slide-up">
                          {/* Header */}
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <FiShield className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">Admin Panel</p>
                                <p className="text-xs text-white/80">{user.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            {adminMenuItems.map((item) => {
                              const Icon = item.icon;
                              const isActive = location.pathname === item.href;
                              return (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={() => setShowAdminMenu(false)}
                                  className={`flex items-start gap-3 px-4 py-2.5 transition-colors ${
                                    isActive
                                      ? 'bg-purple-50 border-r-4 border-purple-600'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    isActive
                                      ? 'bg-purple-100'
                                      : 'bg-gradient-to-br from-purple-50 to-pink-50'
                                  }`}>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-purple-500'}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${
                                      isActive ? 'text-purple-900' : 'text-gray-800'
                                    }`}>
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Footer */}
                          <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                            <p className="text-xs text-gray-500 text-center">
                              Role: <span className="font-semibold text-purple-600">{user.userData?.role || 'admin'}</span>
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* User Profile */}
                <div className="flex items-center gap-1.5 md:gap-2.5 pl-1.5 md:pl-2.5 border-l border-gray-200">
                  <div className="relative">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full md:rounded-xl border-2 border-blue-500 shadow-sm"
                    />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs md:text-sm font-medium text-gray-800 truncate max-w-[120px]">
                      {user.displayName}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      await logout();
                      navigate('/');
                    }}
                    className="p-1.5 md:p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-colors"
                    title="Logout"
                  >
                    <FiLogOut className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-1.5 px-3 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-all border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <FiLogIn className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden lg:inline">Masuk</span>
                </Link>

                <Link
                  to="/login"
                  className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
                >
                  <span className="hidden lg:inline">Daftar</span>
                  <FiChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'
                }`} />
                <span className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                }`} />
                <span className={`absolute left-0 w-5 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'
                }`} />
              </div>
            </button>
          </div>
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
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="relative pt-4 pb-3 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all text-white"
              aria-label="Close menu"
            >
              <FiX className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white">SMK Nusantara</h2>
                <p className="text-xs text-white/80">Unggul • Kompeten • Berkarakter</p>
              </div>
            </div>

            {user && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-2 mt-2">
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-lg border-2 border-white/50" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm truncate">{user.displayName}</p>
                  <p className="text-xs text-white/70 truncate">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links - Scrollable */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1.5 bg-white" style={{ maxHeight: 'calc(100vh - 280px)' }}>
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-md shadow-blue-500/30'
                      : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100'
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <span className="flex-1">{link.name}</span>
                  <FiChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                  }`} />
                </Link>
              );
            })}

            {/* Admin Menu for Mobile */}
            {user?.isAdmin && (
              <div className="mt-5 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 px-3 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Admin Panel</p>
                </div>
                {adminMenuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all duration-300 mb-1 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/30'
                          : 'text-gray-700 hover:bg-purple-50 hover:shadow-sm'
                      }`}
                      style={{
                        animationDelay: `${(navLinks.length + index) * 50}ms`,
                        animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                        isActive
                          ? 'bg-white/20'
                          : 'bg-gradient-to-br from-purple-50 to-pink-50 group-hover:from-purple-100 group-hover:to-pink-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                      </div>
                      <span className="flex-1">{item.name}</span>
                      <FiChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-purple-600'
                      }`} />
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="px-3 py-3 border-t border-gray-200/60 space-y-2 bg-white">
            {user ? (
              <button
                onClick={async () => {
                  await logout();
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-300"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                <FiLogIn className="w-4 h-4" />
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
