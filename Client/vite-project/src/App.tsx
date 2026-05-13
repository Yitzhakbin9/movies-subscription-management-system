import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateAccountPage from './components/CreateAccountPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import type { RootState } from './app/store';

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
          isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />
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
