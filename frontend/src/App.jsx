import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingPage from '@/components/ui/LoadingPage';
import { ProtectedRoute, PublicRoute, AdminRoute } from '@/components/auth/ProtectedRoute';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const PPDB = lazy(() => import('@/pages/PPDB'));
const Login = lazy(() => import('@/pages/Login'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const ManageAdmins = lazy(() => import('@/pages/admin/ManageAdmins'));
const Register = lazy(() => import('@/pages/Register'));
const Status = lazy(() => import('@/pages/Status'));
const Success = lazy(() => import('@/pages/Success'));
const PaymentStatus = lazy(() => import('@/pages/PaymentStatus'));
const StudentExam = lazy(() => import('@/pages/StudentExam'));
const News = lazy(() => import('@/pages/News'));
const NewsDetail = lazy(() => import('@/pages/NewsDetail'));
const Majors = lazy(() => import('@/pages/Majors'));
const About = lazy(() => import('@/pages/About'));
const SchoolProfile = lazy(() => import('@/pages/SchoolProfile'));
const WilayahTest = lazy(() => import('@/pages/WilayahTest'));

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
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/majors" element={<Majors />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile-sekolah" element={<SchoolProfile />} />
              <Route path="/test-wilayah" element={<WilayahTest />} />
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
              <Route path="/admin/login" element={
                <PublicRoute redirect="/admin/payments">
                  <AdminLogin />
                </PublicRoute>
              } />
              <Route path="/admin/manage-admins" element={
                <AdminRoute>
                  <ManageAdmins />
                </AdminRoute>
              } />
              <Route path="/admin/payments" element={
                <AdminRoute>
                  <AdminPayments />
                </AdminRoute>
              } />
              <Route path="/admin/notifications" element={
                <AdminRoute>
                  <AdminNotifications />
                </AdminRoute>
              } />
              <Route path="/admin/exams" element={
                <AdminRoute>
                  <AdminExamSchedule />
                </AdminRoute>
              } />
              <Route path="/admin/exam-results" element={
                <AdminRoute>
                  <AdminExamResults />
                </AdminRoute>
              } />
              <Route path="/admin/reports" element={
                <AdminRoute>
                  <AdminReports />
                </AdminRoute>
              } />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
