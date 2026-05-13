import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import './MainPage.css';

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <main className="page-shell">
      <section className="auth-card main-page-panel">
        <p className="section-eyebrow">Cinema Management</p>
        <h1 className="main-page-title">Main Page</h1>
        <p className="page-description">
          Welcome{user ? `, ${user.username}` : ''}. Choose where you want to go
          next.
        </p>

        <div className="main-page-grid">
          <button className="button-primary" type="button">
            Movies
          </button>
          <button className="button-primary" type="button">
            Subscreptions
          </button>
            <button className="button-primary" type="button">
              User Managment
            </button>
      
          {user?.role === 'Admin' ? (
            <button className="button-primary" type="button">
              User Managment
            </button>
          ) : null}
          <button className="button-secondary" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </section>
    </main>
  );
}

export default MainPage;
