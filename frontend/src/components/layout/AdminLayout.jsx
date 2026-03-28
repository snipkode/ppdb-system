import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiCreditCard, FiBell, FiCalendar, FiBarChart2, FiUsers,
  FiShield, FiChevronDown, FiLogOut, FiMenu, FiX, FiAward
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const adminMenuItems = [
  { name: 'Pembayaran', href: '/admin/payments', icon: FiCreditCard, description: 'Kelola cicilan' },
  { name: 'Notifikasi', href: '/admin/notifications', icon: FiBell, description: 'Kirim notifikasi' },
  { name: 'Jadwal Ujian', href: '/admin/exams', icon: FiCalendar, description: 'Atur jadwal' },
  { name: 'Nilai', href: '/admin/exam-results', icon: FiAward, description: 'Input nilai' },
  { name: 'Laporan', href: '/admin/reports', icon: FiBarChart2, description: 'Statistik & laporan' },
  { name: 'Kelola Admin', href: '/admin/manage-admins', icon: FiUsers, description: 'Manage user' },
];

const AdminLayout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo & Title */}
            <Link to="/admin/payments" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-md">
                <FiShield className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">PPDB 2024/2025</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-3 py-1.5 rounded-lg font-semibold text-xs transition-all duration-200 group ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                        : 'bg-transparent group-hover:bg-purple-50'
                    }`} />
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* User Info */}
              <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-7 h-7 rounded-full border-2 border-purple-500"
                />
                <span className="text-xs font-medium text-gray-700 max-w-[100px] truncate">
                  {user?.displayName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <FiLogOut className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl">
            {/* Mobile Menu Header */}
            <div className="pt-4 pb-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                    <FiShield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Admin Panel</h2>
                    <p className="text-xs text-white/80">PPDB 2024/2025</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              {user && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-lg border-2 border-white/50" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{user.displayName}</p>
                    <p className="text-xs text-white/70 truncate">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 bg-white" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-white/20' : 'bg-gradient-to-br from-purple-50 to-pink-50'
                    }`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                    </div>
                    <span className="flex-1">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Logout */}
            <div className="px-3 py-3 border-t border-gray-200 bg-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-all"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
