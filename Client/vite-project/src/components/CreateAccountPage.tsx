import { FormEvent, useState } from 'react';
import './CreateAccountPage.css';

function CreateAccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="page-shell">
      <section className="auth-card create-account-panel">
        <p className="section-eyebrow">Cinema Management</p>
        <h1 className="create-account-title">Create your account</h1>
        <p className="page-description">
          Set a username and password to start using the cinema management
          system.
        </p>

        <form className="form-stack" onSubmit={handleCreateAccount}>
          <label className="field">
            <span className="field-label">Username</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Choose a password"
            />
          </label>

          <div className="button-stack">
            <button className="button-primary" type="submit">
              Create
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateAccountPage;
