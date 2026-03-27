import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiHome, FiFileText, FiSettings } from 'react-icons/fi';
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
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <FiUser className="text-white text-lg md:text-xl" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">PPDB Online</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Sistem Penerimaan Siswa Baru</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === item.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentView === item.path
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
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
