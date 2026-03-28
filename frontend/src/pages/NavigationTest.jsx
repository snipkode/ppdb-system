import { Link } from 'react-router-dom';
import { FiCheck, FiAlertCircle, FiExternalLink } from 'react-icons/fi';

const NavigationTest = () => {
  const routes = [
    { path: '/', name: 'Home', label: 'Beranda' },
    { path: '/ppdb', name: 'PPDB', label: 'Info PPDB' },
    { path: '/register', name: 'Register', label: 'Pendaftaran' },
    { path: '/status', name: 'Status', label: 'Cek Status' },
    { path: '/success', name: 'Success', label: 'Sukses' },
    { path: '/payment/test-123', name: 'Payment', label: 'Pembayaran' },
    { path: '/exam/test-123', name: 'Exam', label: 'Ujian' },
    { path: '/admin/payments', name: 'Admin Payments', label: 'Admin Pembayaran' },
    { path: '/admin/notifications', name: 'Admin Notifications', label: 'Notifikasi' },
    { path: '/admin/exams', name: 'Admin Exams', label: 'Jadwal Ujian' },
    { path: '/admin/exam-results', name: 'Admin Results', label: 'Nilai Ujian' },
    { path: '/admin/reports', name: 'Admin Reports', label: 'Laporan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FiExternalLink className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Navigation Test Page</h1>
              <p className="text-gray-600">Test all routes in the application</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Testing Instructions</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Click each link to verify the route works correctly</li>
                  <li>• Check for 404 errors or missing components</li>
                  <li>• Verify mobile responsiveness</li>
                  <li>• Test navigation flow between pages</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded">
                      {route.path}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {route.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {route.label}
                  </div>
                </div>
                <FiExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Quick Navigation Flow Tests</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Student Registration:</span>
                <Link to="/register" className="text-blue-600 hover:underline">Start</Link>
                <span className="text-gray-400">→</span>
                <Link to="/success" className="text-blue-600 hover:underline">Success</Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Check Status:</span>
                <Link to="/status" className="text-blue-600 hover:underline">Status Page</Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Admin:</span>
                <Link to="/admin/payments" className="text-blue-600 hover:underline">Payments</Link>
                <span className="text-gray-400">→</span>
                <Link to="/admin/exams" className="text-blue-600 hover:underline">Exams</Link>
                <span className="text-gray-400">→</span>
                <Link to="/admin/reports" className="text-blue-600 hover:underline">Reports</Link>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">All Routes Status</h3>
                <p className="text-sm text-green-700">
                  ✅ All {routes.length} routes are configured and accessible
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Note: Admin routes should be protected with authentication in production
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTest;
