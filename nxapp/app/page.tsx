import Link from "next/link";
import "./home.css";

const pages = [
  {
    number: "01",
    title: "Accueil",
    description: "Découvrez notre application et ses fonctionnalités.",
    href: "/",
  },
  {
    number: "02",
    title: "Connexion",
    description: "Connectez-vous à votre espace personnel.",
    href: "/login",
  },
  {
    number: "03",
    title: "Contact",
    description: "Contactez-nous pour toute question ou information.",
    href: "/contact",
  },
  {
    number: "04",
    title: "Utilisateurs",
    description: "Consultez les utilisateurs grâce à notre API REST.",
    href: "/users",
  },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <nav className="home-nav">
        <Link href="/" className="home-logo">
          <span className="logo-icon">N</span>
          <span>Next<span className="logo-highlight">App</span></span>
        </Link>

        <div className="nav-links">
          <Link href="/">Accueil</Link>
          <Link href="/login">Connexion</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <Link href="/login" className="nav-button">
          Commencer
        </Link>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">
            ✦ Bienvenue sur notre plateforme
          </span>

          <h1>
            Une application
            <br />
            <span>moderne et intuitive.</span>
          </h1>

          <p className="hero-description">
            Découvrez une expérience web simple, élégante et efficace,
            développée avec Next.js et une API REST.
          </p>

          <div className="hero-actions">
            <Link href="/users" className="hero-primary">
              Découvrir les utilisateurs <span>→</span>
            </Link>

            <Link href="/contact" className="hero-secondary">
              Nous contacter
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>Next.js</strong>
              <span>Frontend</span>
            </div>
            <div>
              <strong>Express</strong>
              <span>Backend API</span>
            </div>
            <div>
              <strong>REST</strong>
              <span>Architecture</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow" />

          <div className="visual-card">
            <div className="visual-card-header">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="status-badge">● En ligne</span>
            </div>

            <div className="visual-icon">✦</div>
            <p className="visual-eyebrow">VOTRE ESPACE DIGITAL</p>
            <h2>Tout au même endroit.</h2>
            <p className="visual-text">
              Une interface claire pour naviguer entre les différentes
              fonctionnalités de votre application.
            </p>

            <div className="visual-progress">
              <span />
            </div>

            <div className="visual-card-footer">
              <span>Application web</span>
              <span>100%</span>
            </div>
          </div>

          <div className="floating-badge floating-top">
            <span className="floating-symbol">✓</span>
            Interface moderne
          </div>

          <div className="floating-badge floating-bottom">
            <span className="floating-symbol">↗</span>
            API connectée
          </div>
        </div>
      </section>
      <section className="services-section">
        <div className="section-heading">
          <div>
            <span className="section-label">NOS SERVICES</span>
            <h2>Ce que nous proposons</h2>
          </div>
          <p>
            Les fonctionnalités principales de notre application Full Stack.
          </p>
        </div>

        <div className="services-grid">
          <article className="service-card">
            <div className="service-icon">⚡</div>
            <h3>Interface moderne</h3>
            <p>
              Une interface claire et responsive développée avec Next.js
              pour faciliter la navigation.
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">🔗</div>
            <h3>API REST</h3>
            <p>
              Une API Express permettant de récupérer, ajouter, modifier
              et supprimer les utilisateurs.
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">👥</div>
            <h3>Gestion des utilisateurs</h3>
            <p>
              Consultez les utilisateurs et visualisez les données
              récupérées depuis notre backend.
            </p>
            <Link href="/users" className="service-link">
              Voir les utilisateurs →
            </Link>
          </article>
        </div>
      </section>


      <section className="pages-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORER</span>
            <h2>Découvrez nos pages</h2>
          </div>
          <p>
            Retrouvez facilement les différentes fonctionnalités de
            l’application.
          </p>
        </div>

        <div className="pages-grid">
          {pages.map((page) => (
            <Link href={page.href} className="page-card" key={page.number}>
              <span className="page-number">{page.number}</span>
              <div className="page-card-arrow">↗</div>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
              <span className="page-card-link">Découvrir <span>→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <Link href="/" className="home-logo footer-logo">
          <span className="logo-icon">N</span>
          <span>Next<span className="logo-highlight">App</span></span>
        </Link>
        <p>© 2026 NextApp — Projet Full Stack.</p>
        <Link href="/contact">Besoin d’aide ?</Link>
      </footer>
    </main>
  );
}