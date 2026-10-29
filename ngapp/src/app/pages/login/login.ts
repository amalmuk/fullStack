
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

  constructor(private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email.trim() || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim())) {
      this.errorMessage = 'Veuillez saisir une adresse e-mail valide.';
      return;
    }

    this.isLoading = true;

    fetch('https://tp3-backend-amal.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email.trim(),
        password: this.password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.erreur || data.message || 'Échec de connexion.'
          );
        }

        if (!data.token) {
          throw new Error('Token JWT manquant dans la réponse.');
        }

        sessionStorage.setItem('token', data.token);

        this.successMessage = 'Connexion réussie !';
        await this.router.navigate(['/']);
      })
      .catch((error: Error) => {
        this.errorMessage =
          error.message || 'Impossible de contacter le serveur.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
