
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Produit {
  id: number;
  nom: string;
  prix: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  produits: Produit[] = [];
  erreur = '';
  chargement = true;
constructor(private cdr: ChangeDetectorRef) {}
  async ngOnInit(): Promise<void> {
    console.log('Chargement des produits...');

    try {
      const response = await fetch(
        'http://localhost:3000/api/produits'
      );

      console.log('Réponse API :', response.status);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data: Produit[] = await response.json();

      console.log('Produits reçus :', data);

      this.produits = data;
      console.log('Nombre de produits :', this.produits.length);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erreur API :', error);
      this.erreur =
        'Impossible de charger les produits. Vérifiez le serveur Express.';
    } finally {
      this.chargement = false;
      this.cdr.detectChanges();
    }
  }
}
