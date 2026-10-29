
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Produit {
  _id: string;
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
      const token = sessionStorage.getItem('token');
      console.log('Token présent :', !!token);

      if (!token) {
        throw new Error('Token JWT absent. Veuillez vous connecter.');
      }

      const response = await fetch(
        'http://localhost:3001/api/produits',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Réponse API :', response.status);

      if (response.status === 401) {
        sessionStorage.removeItem('token');
        throw new Error('Session invalide. Veuillez vous reconnecter.');
      }

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data: Produit[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('La réponse API ne contient pas une liste de produits.');
      }

      console.log('Produits reçus :', data);
      this.produits = data;
    } catch (error) {
      console.error('Erreur API :', error);
      this.erreur =
        error instanceof Error
          ? error.message
          : 'Erreur inconnue lors du chargement.';
    } finally {
      this.chargement = false;
      this.cdr.detectChanges();
    }
  }
}
