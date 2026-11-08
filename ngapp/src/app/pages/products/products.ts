import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="service-page">
      <h1>📦 Products from API</h1>
      <p>
        This page presents products retrieved from
        our Express backend.
      </p>
      <h2>Backend Integration</h2>
      <ul>
        <li>Express server</li>
        <li>REST API requests</li>
        <li>Dynamic product data</li>
        <li>JSON communication</li>
      </ul>
      <a routerLink="/" class="back-link">← Back to Home</a>
    </main>
  `,
})
export class Products {}