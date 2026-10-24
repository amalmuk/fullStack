
import "./home.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      <nav className="home-navbar">
        <Link href="/" className="home-logo">
          <span className="logo-icon">✦</span>
          FullStack
        </Link>

        <div className="home-nav-links">
          <Link href="/" className="nav-link active">
            Accueil
          </Link>
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </div>

        <Link href="/login" className="nav-button">
          Se connecter →
        </Link>
      </nav>

      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">
            ✨ Notre application Full Stack
          </span>

          <h1>
            Bienvenue dans votre
            <span className="hero-highlight">
              {" "}espace numérique.
            </span>
          </h1>

          <p className="hero-description">
            Découvrez notre application réalisée avec Next.js.
            Une interface simple, moderne et intuitive pour
            accéder facilement à nos différentes pages.
          </p>

          <div className="hero-actions">
            <Link href="/login" className="hero-primary">
              Commencer maintenant →
            </Link>

            <Link href="/contact" className="hero-secondary">
              Nous contacter
            </Link>
          </div>

          <div className="hero-note">
            <span className="status-dot"></span>
            Projet réalisé dans le cadre du TP Full Stack
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow"></div>

          <div className="visual-card">
            <div className="visual-top">
              <div className="visual-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="visual-label">MON ESPACE</span>
            </div>

            <div className="visual-symbol">✦</div>

            <h2>Tout au même endroit.</h2>
            <p>
              Une expérience fluide pour naviguer
              entre les différentes fonctionnalités.
            </p>

            <div className="visual-line"></div>

            <div className="visual-feature">
              <span className="feature-icon">01</span>
              <span>Connexion simple</span>
              <span className="feature-check">✓</span>
            </div>

            <div className="visual-feature">
              <span className="feature-icon">02</span>
              <span>Navigation intuitive</span>
              <span className="feature-check">✓</span>
            </div>

            <div className="visual-feature">
              <span className="feature-icon">03</span>
              <span>Interface moderne</span>
              <span className="feature-check">✓</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-pages">
        <div className="section-heading">
          <span className="section-eyebrow">EXPLOREZ</span>
          <h2>Découvrez nos pages</h2>
          <p>
            Accédez rapidement aux différentes sections
            de notre application.
          </p>
        </div>

        <div className="pages-grid">
          <Link href="/" className="page-card">
            <div className="page-card-icon icon-home">⌂</div>
            <h3>Accueil</h3>
            <p>
              Retrouvez la présentation et les informations
              principales de notre application.
            </p>
            <span className="card-link">Découvrir →</span>
          </Link>

          <Link href="/login" className="page-card">
            <div className="page-card-icon icon-login">↗</div>
            <h3>Connexion</h3>
            <p>
              Accédez à la page de connexion de votre
              espace personnel.
            </p>
            <span className="card-link">Se connecter →</span>
          </Link>

          <Link href="/contact" className="page-card">
            <div className="page-card-icon icon-contact">✉</div>
            <h3>Contact</h3>
            <p>
              Retrouvez notre page de contact pour
              nous envoyer vos questions.
            </p>
            <span className="card-link">Nous contacter →</span>
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <Link href="/" className="footer-logo">
          ✦ FullStack
        </Link>
        <p>© 2026 — Application réalisée dans le cadre du TP.</p>
      </footer>
    </main>
  );
}