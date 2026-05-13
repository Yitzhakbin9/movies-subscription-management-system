import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateAccountPage from './components/CreateAccountPage';
import LoginPage from './components/LoginPage';
import ManageUsersPage from './components/ManageUsersPage';
import MainPage from './components/MainPage';
import MoviesPage from './components/MoviesPage';
import SubscriptionsPage from './components/SubscriptionsPage';
import type { RootState } from './app/store';

// Reuse this wrapper for routes that should only open for logged-in users.
// It keeps the auth check in one place and redirects guests to the login page.
function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Use this wrapper for pages that require an Admin user in addition to login.
// It prevents non-Admin users from opening Admin-only routes directly by URL.
function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return user?.role === 'Admin' ? (
    <>{children}</>
  ) : (
    <Navigate to="/main" replace />
  );
}

function App() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/main' : '/login'} replace />}
      />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <SubscriptionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-users"
        element={
          <AdminRoute>
            <ManageUsersPage />
          </AdminRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/main' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
