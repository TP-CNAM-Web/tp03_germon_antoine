import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Produit } from '../models/produit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent {
    produits : Observable<Produit[]>

    constructor(private apiService : ApiService) {
        this.produits = new Observable<Produit[]>();
    }

    ngOnInit() {
        this.produits = this.apiService.getProduits();
    }
}
