import { Link } from 'react-router-dom';
import '../css/FeaturePage.css';

function ManageUsersPage() {
  return (
    <main className="page-shell">
      <section className="auth-card feature-page-panel">
        <p className="section-eyebrow">Cinema Management</p>
        <h1 className="feature-page-title">Manage Users</h1>
        <p className="page-description">
          This page is available only to the system Admin. We can use it for
          the users table, permissions management, and account actions.
        </p>

        <div className="feature-page-content">
          <article className="feature-page-section">
            <h2>What this page will handle</h2>
            <p>
              Manage application users, assign permissions, and control who can
              access movies and subscriptions features.
            </p>
          </article>

          <div className="feature-page-actions">
            <Link className="button-primary button-link" to="/main">
              Back to Main Page
            </Link>
            <Link className="button-secondary button-link" to="/movies">
              Go to Movies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ManageUsersPage;
