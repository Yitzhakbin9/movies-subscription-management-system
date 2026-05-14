import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../app/store';
import { login } from '../features/auth/authSlice';
import '../css/LoginPage.css';

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      return;
    }

    dispatch(
      login({
        // These values are temporary placeholders until real backend auth returns them.
        id: crypto.randomUUID(),
        username: trimmedUsername,
        joinedAt: new Date().toISOString(),
        role: trimmedUsername.toLowerCase() === 'admin' ? 'Admin' : 'User',
      })
    );

    setUsername(trimmedUsername);
    setPassword('');
    navigate('/main');
  };

  return (
    <main className="page-shell">
      <section className="auth-card login-panel">
        <p className="section-eyebrow">Cinema Management</p>
        <h1 className="login-title">Welcome back</h1>
        <p className="page-description">
          Log in to manage movies, subscriptions, and user permissions.
        </p>

        <form className="form-stack" onSubmit={handleLogin}>
          <label className="field">
            <span className="field-label">Username</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          <div className="button-stack">
            <button className="button-primary" type="submit">
              Login
            </button>
            <Link className="button-secondary button-link" to="/create-account">
              Create New Account
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
