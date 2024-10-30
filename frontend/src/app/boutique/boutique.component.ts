// boutique.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Produit } from '../models/produit';
import { map } from 'rxjs/operators';
import { RechercheComponent } from '../recherche/recherche.component';
import { ProduitListComponent } from '../produit-list/produit-list.component';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [RechercheComponent, ProduitListComponent],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent implements OnInit {
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  filtre: { ref: string; libelle: string; prixMax: number | null } = { ref: '', libelle: '', prixMax: null };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // On récupère les produits une fois au chargement
    this.apiService.getProduits().subscribe(produits => {
      this.produits = produits;
      this.appliquerFiltre(); // On applique un premier filtre
    });
  }

  mettreAJourFiltre(nouveauFiltre: { ref: string; libelle: string; prixMax: number | null }) {
    // Met à jour le filtre en fonction des valeurs reçues du composant enfant
    this.filtre = nouveauFiltre;
    this.appliquerFiltre();
  }

  appliquerFiltre() {
    // Filtre les produits en fonction des critères actuels
    this.produitsFiltres = this.produits.filter(produit =>
      (this.filtre.ref ? produit.ref.toLowerCase().includes(this.filtre.ref.toLowerCase()) : true) &&
      (this.filtre.libelle ? produit.libelle.toLowerCase().includes(this.filtre.libelle.toLowerCase()) : true) &&
      (this.filtre.prixMax !== null ? produit.prix <= this.filtre.prixMax : true)
    );
  }
}
