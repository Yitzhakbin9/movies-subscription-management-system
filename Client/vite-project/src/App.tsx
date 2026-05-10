import { Navigate, Route, Routes } from 'react-router-dom';
import CreateAccountPage from './components/CreateAccountPage';
import LoginPage from './components/LoginPage';

// check commit for git

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
