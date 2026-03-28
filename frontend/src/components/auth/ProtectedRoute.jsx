import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '@/components/ui/LoadingPage';

/**
 * ProtectedRoute Component
 * Redirects to login page if user is not authenticated
 * 
 * @param {React.ReactNode} children - Child components
 * @param {string} redirect - Redirect path (default: /login)
 */
const ProtectedRoute = ({ children, redirect = '/login' }) => {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return <LoadingPage message="Memeriksa autentikasi..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  // Render children if authenticated
  return children;
};

/**
 * PublicRoute Component
 * Redirects to dashboard if user is already authenticated
 * 
 * @param {React.ReactNode} children - Child components
 * @param {string} redirect - Redirect path (default: /register)
 */
const PublicRoute = ({ children, redirect = '/register' }) => {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return <LoadingPage message="Memeriksa autentikasi..." />;
  }

  // Redirect to dashboard if authenticated
  if (user) {
    return <Navigate to={redirect} replace />;
  }

  // Render children if not authenticated
  return children;
};

export { ProtectedRoute, PublicRoute };
export default ProtectedRoute;
