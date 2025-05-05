import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';


@Component({
  selector: 'app-search',
  imports: [CommonModule, ProductGridComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery = '';
  products: Product[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.fetchSearchResults();
    });
  }

  fetchSearchResults(): void {
    this.isLoading = true;
    this.productService.searchProducts(this.searchQuery).subscribe(
      (products) => {
        this.products = products;
        this.isLoading = false;
      },
      (error) => {
        console.error('Fel vid hämtning av sökresultat:', error);
        this.isLoading = false;
      }
    );
  }
}