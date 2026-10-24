
import "./login.css";

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-icon"></div>

        <h1 className="login-title">Bienvenue !</h1>
        <p className="login-subtitle">
          Connectez-vous à votre compte
        </p>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre e-mail"
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="login-button" type="submit">
            Se connecter
            <span aria-hidden="true"> →</span>
          </button>
        </form>

        <p className="login-footer">
          Votre espace personnel en toute simplicité.
        </p>
      </div>
    </main>
  );
}