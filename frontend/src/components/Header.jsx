import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiHome, FiFileText, FiSettings, FiGraduationCap, FiChevronRight } from 'react-icons/fi';
import { useUIStore } from '@/stores/useStore';

const Header = () => {
  const { isMobileMenuOpen, toggleMobileMenu, currentView, setCurrentView } = useUIStore();
  const navigate = useNavigate();

  const navItems = [
    { icon: FiHome, label: 'Beranda', path: '/' },
    { icon: FiFileText, label: 'Pendaftaran', path: '/register' },
    { icon: FiUser, label: 'Cek Status', path: '/status' },
  ];

  const handleNavClick = (path) => {
    setCurrentView(path);
    navigate(path);
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <header className="bg-white/98 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo - Enhanced Desktop Branding */}
          <Link to="/" className="group flex items-center gap-3 md:gap-4">
            {/* Logo Icon - Gradient with Glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FiGraduationCap className="text-white text-xl md:text-2xl" />
              </div>
            </div>
            
            {/* Logo Text - Typography Enhanced */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                  PPDB Online
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold rounded-full">
                  2024
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide uppercase">
                Sistem Penerimaan Siswa Baru
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Premium Design */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  currentView === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`text-base transition-transform duration-300 ${
                  currentView === item.path ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                <span>{item.label}</span>
                {currentView === item.path && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <FiX className="text-xl text-gray-600" />
            ) : (
              <FiMenu className="text-xl text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    currentView === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="text-lg" />
                  <span className="font-semibold text-sm">{item.label}</span>
                  <FiChevronRight className="ml-auto text-lg opacity-50" />
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
