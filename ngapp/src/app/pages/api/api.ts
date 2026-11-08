import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="service-page">
      <h1>🔗 Express API</h1>
      <p>
        Our backend uses Node.js and Express to provide
        REST API services.
      </p>
      <h2>API Features</h2>
      <ul>
        <li>REST API endpoints</li>
        <li>HTTP requests</li>
        <li>JSON data exchange</li>
        <li>Frontend and backend integration</li>
      </ul>
      <a routerLink="/" class="back-link">← Back to Home</a>
    </main>
  `,
})
export class Api {}