import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import '../css/MainPage.css';

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
        <div className="main-page-content">
          <header>
            <p className="section-eyebrow">Cinema Management</p>
            <h1 className="main-page-title">Main Page</h1>
            <p className="page-description">
              Welcome{user ? `, ${user.username}` : ''}. Choose where you want
              to go next.
            </p>
          </header>

          <nav className="main-page-grid" aria-label="Main page sections">
            <NavLink
              className={({ isActive }) =>
                `button-link main-page-tab ${
                  isActive ? 'main-page-tab-active' : 'main-page-tab-idle'
                }`
              }
              to="movies"
            >
              Movies
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `button-link main-page-tab ${
                  isActive ? 'main-page-tab-active' : 'main-page-tab-idle'
                }`
              }
              to="subscriptions"
            >
              Subscriptions
            </NavLink>

            {user?.role === 'Admin' ? (
              <NavLink
                className={({ isActive }) =>
                  `button-link main-page-tab ${
                    isActive ? 'main-page-tab-active' : 'main-page-tab-idle'
                  }`
                }
                to="manage-users"
              >
                Users Management
              </NavLink>
            ) : null}
            <button
              className="button-secondary"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </nav>

          <div className="main-page-outlet">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}

export default MainPage;
