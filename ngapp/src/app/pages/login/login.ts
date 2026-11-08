
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  showPassword = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  private readonly apiUrl =
    'https://tp3-backend-amal.onrender.com/api/auth/login';

  constructor(private router: Router) {}

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    // Vérification des champs
    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // Vérification de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email.trim())) {
      this.errorMessage =
        'Veuillez saisir une adresse e-mail valide.';
      return;
    }

    this.isLoading = true;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email.trim(),
          password: this.password,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.erreur ||
          data.message ||
          'Échec de connexion. Vérifiez vos identifiants.'
        );
      }

      if (!data.token) {
        throw new Error(
          'Le serveur n’a pas retourné de token JWT.'
        );
      }

      // Enregistrement du token
      sessionStorage.setItem('token', data.token);

      this.successMessage = 'Connexion réussie !';

      // Redirection vers la page d'accueil
      await this.router.navigate(['/']);

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        this.errorMessage =
          'Le serveur ne répond pas. Réessayez dans quelques instants.';
      } else {
        this.errorMessage =
          error instanceof Error
            ? error.message
            : 'Impossible de contacter le serveur.';
      }
    } finally {
      clearTimeout(timeout);
      this.isLoading = false;
    }
  }
}
