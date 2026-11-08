import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-design',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="service-page">
      <h1>🎨 Modern Design</h1>
      <p>
        FullStackPro provides a clean, modern and responsive
        user interface.
      </p>
      <h2>Our Design Features</h2>
      <ul>
        <li>Responsive design</li>
        <li>Modern colors and typography</li>
        <li>User-friendly navigation</li>
        <li>Reusable interface components</li>
      </ul>
      <a routerLink="/" class="back-link">← Back to Home</a>
    </main>
  `,
})
export class Design {}