import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingPage from '@/components/ui/LoadingPage';
import { useAuthStore } from '@/stores/useAuthStore';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const PPDB = lazy(() => import('@/pages/PPDB'));
const Register = lazy(() => import('@/pages/Register'));
const Status = lazy(() => import('@/pages/Status'));
const Success = lazy(() => import('@/pages/Success'));
const PaymentStatus = lazy(() => import('@/pages/PaymentStatus'));
const StudentExam = lazy(() => import('@/pages/StudentExam'));
const Profile = lazy(() => import('@/pages/Profile'));

// Admin pages - lazy loaded
const AdminPayments = lazy(() => import('@/pages/admin/Payments'));
const AdminNotifications = lazy(() => import('@/pages/admin/Notifications'));
const AdminExamSchedule = lazy(() => import('@/pages/admin/ExamSchedule'));
const AdminExamResults = lazy(() => import('@/pages/admin/ExamResults'));
const AdminReports = lazy(() => import('@/pages/admin/Reports'));

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    // Initialize Firebase Auth listener
    const unsubscribe = initAuth();
    return () => unsubscribe();
  }, [initAuth]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/ppdb" element={<PPDB />} />
              <Route path="/register" element={<Register />} />
              <Route path="/status" element={<Status />} />
              <Route path="/success" element={<Success />} />
              <Route path="/payment/:id" element={<PaymentStatus />} />
              <Route path="/exam/:id" element={<StudentExam />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin Routes */}
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />
              <Route path="/admin/exams" element={<AdminExamSchedule />} />
              <Route path="/admin/exam-results" element={<AdminExamResults />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
