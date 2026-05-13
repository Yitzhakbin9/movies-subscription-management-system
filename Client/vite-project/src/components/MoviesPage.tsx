import { Link } from 'react-router-dom';
import './FeaturePage.css';

function MoviesPage() {
  return (
    <main className="page-shell">
      <section className="auth-card feature-page-panel">
        <p className="section-eyebrow">Cinema Management</p>
        <h1 className="feature-page-title">Movies</h1>
        <p className="page-description">
          This is the movies area. From here we can build the movie list,
          movie creation flow, and the edit/delete actions.
        </p>

        <div className="feature-page-content">
          <article className="feature-page-section">
            <h2>What this page will handle</h2>
            <p>
              Show all movies, filter the list, and connect the page to the
              backend once we start the movie management logic.
            </p>
          </article>

          <div className="feature-page-actions">
            <Link className="button-primary button-link" to="/main">
              Back to Main Page
            </Link>
            <Link className="button-secondary button-link" to="/subscriptions">
              Go to Subscriptions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MoviesPage;
