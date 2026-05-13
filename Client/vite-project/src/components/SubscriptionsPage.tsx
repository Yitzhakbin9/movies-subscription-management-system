import { Link } from 'react-router-dom';
import './FeaturePage.css';

function SubscriptionsPage() {
  return (
    <main className="page-shell">
      <section className="auth-card feature-page-panel">
        <p className="section-eyebrow">Cinema Management</p>
        <h1 className="feature-page-title">Subscriptions</h1>
        <p className="page-description">
          This is the subscriptions area. It is ready for the member list,
          watched-movies history, and subscription actions we add next.
        </p>

        <div className="feature-page-content">
          <article className="feature-page-section">
            <h2>What this page will handle</h2>
            <p>
              Display members, show which movies each member watched, and let us
              connect create/update subscription flows later on.
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

export default SubscriptionsPage;
