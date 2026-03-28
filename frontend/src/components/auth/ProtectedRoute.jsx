import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '@/components/ui/LoadingPage';

/**
 * ProtectedRoute Component
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children, redirect = '/login' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage message="Memeriksa autentikasi..." />;
  }

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

/**
 * PublicRoute Component
 * Redirects to dashboard if user is already authenticated
 */
const PublicRoute = ({ children, redirect = '/register' }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage message="Memeriksa autentikasi..." />;
  }

  if (user && location.pathname !== redirect) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

/**
 * AdminRoute Component
 * Protected route for admin pages only
 * Only users with @smk.sch.id email can access
 */
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingPage message="Memverifikasi akses admin..." />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <Navigate 
        to={{
          pathname: '/admin/login',
          state: { error: 'Akses ditolak. Hanya admin yang dapat mengakses halaman ini.' }
        }} 
        replace 
      />
    );
  }

  return children;
};

export { ProtectedRoute, PublicRoute, AdminRoute };
export default ProtectedRoute;
