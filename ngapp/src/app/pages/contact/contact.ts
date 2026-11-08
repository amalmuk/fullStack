import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  name = '';
  email = '';
  message = '';

  feedback = '';
  feedbackType: 'success' | 'error' | '' = '';

  onSubmit(): void {

    this.feedback = '';
    this.feedbackType = '';

    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.message.trim()
    ) {
      this.feedback = 'Veuillez remplir tous les champs.';
      this.feedbackType = 'error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email.trim())) {
      this.feedback = 'Veuillez saisir une adresse e-mail valide.';
      this.feedbackType = 'error';
      return;
    }

    if (this.message.trim().length < 10) {
      this.feedback = 'Votre message doit contenir au moins 10 caractères.';
      this.feedbackType = 'error';
      return;
    }

    this.feedback = 'Votre message a été validé avec succès.';
    this.feedbackType = 'success';

    this.name = '';
    this.email = '';
    this.message = '';
  }
}