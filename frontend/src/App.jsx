import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingPage from '@/components/ui/LoadingPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PublicRoute from '@/components/auth/ProtectedRoute';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const PPDB = lazy(() => import('@/pages/PPDB'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Status = lazy(() => import('@/pages/Status'));
const Success = lazy(() => import('@/pages/Success'));
const PaymentStatus = lazy(() => import('@/pages/PaymentStatus'));
const StudentExam = lazy(() => import('@/pages/StudentExam'));
const News = lazy(() => import('@/pages/News'));
const Majors = lazy(() => import('@/pages/Majors'));
const About = lazy(() => import('@/pages/About'));

// Admin pages - lazy loaded
const AdminPayments = lazy(() => import('@/pages/admin/Payments'));
const AdminNotifications = lazy(() => import('@/pages/admin/Notifications'));
const AdminExamSchedule = lazy(() => import('@/pages/admin/ExamSchedule'));
const AdminExamResults = lazy(() => import('@/pages/admin/ExamResults'));
const AdminReports = lazy(() => import('@/pages/admin/Reports'));

function App() {
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
              <Route path="/news" element={<News />} />
              <Route path="/majors" element={<Majors />} />
              <Route path="/about" element={<About />} />
              <Route path="/status" element={<Status />} />
              
              {/* Login Route - Redirect if already logged in */}
              <Route path="/login" element={
                <PublicRoute redirect="/register">
                  <Login />
                </PublicRoute>
              } />
              
              {/* Protected Routes - Require login */}
              <Route path="/register" element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              } />
              <Route path="/success" element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              } />
              <Route path="/payment/:id" element={
                <ProtectedRoute>
                  <PaymentStatus />
                </ProtectedRoute>
              } />
              <Route path="/exam/:id" element={
                <ProtectedRoute>
                  <StudentExam />
                </ProtectedRoute>
              } />

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
