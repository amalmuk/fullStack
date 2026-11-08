import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-frontend',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="service-page">
      <h1>⚡ Angular Frontend</h1>
      <p>
        Our application uses Angular to build a dynamic
        and interactive frontend.
      </p>
      <h2>Frontend Features</h2>
      <ul>
        <li>Angular components</li>
        <li>Angular routing</li>
        <li>Data binding</li>
        <li>Reusable components</li>
      </ul>
      <a routerLink="/" class="back-link">← Back to Home</a>
    </main>
  `,
})
export class Frontend {}