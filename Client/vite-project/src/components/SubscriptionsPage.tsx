import '../css/FeaturePage.css';

function SubscriptionsPage() {
  return (
    <section className="feature-page-panel">
      <h2 className="feature-page-title">Subscriptions</h2>
      <p className="page-description">
        This is the subscriptions area. It is ready for the member list,
        watched-movies history, and subscription actions we add next.
      </p>

      <div className="feature-page-content">
        <article className="feature-page-section">
          <h3>What this page will handle</h3>
          <p>
            Display members, show which movies each member watched, and let us
            connect create/update subscription flows later on.
          </p>
        </article>
      </div>
    </section>
  );
}

export default SubscriptionsPage;
