import '../css/FeaturePage.css';

function MoviesPage() {
  return (
    <section className="feature-page-panel">
      <h2 className="feature-page-title">Movies</h2>
      <p className="page-description">
        This is the movies area. From here we can build the movie list, movie
        creation flow, and the edit/delete actions.
      </p>

      <div className="feature-page-content">
        <article className="feature-page-section">
          <h3>What this page will handle</h3>
          <p>
            Show all movies, filter the list, and connect the page to the
            backend once we start the movie management logic.
          </p>
        </article>
      </div>
    </section>
  );
}

export default MoviesPage;
