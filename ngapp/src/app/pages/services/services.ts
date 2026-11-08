
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {

  selectedService: string | null = null;

  toggleService(service: string) {
    this.selectedService =
      this.selectedService === service ? null : service;
  }
}
