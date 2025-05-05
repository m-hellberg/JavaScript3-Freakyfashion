import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from '../../types/Product';
import { CartService } from '../../services/cart.service';
import { NewBadgeComponent } from '../../components/new-badge/new-badge.component';
import { WishlistIconComponent } from '../../components/wishlist-icon/wishlist-icon.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, NewBadgeComponent, WishlistIconComponent, CarouselComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true
})
export class ProductDetailsComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cartService = inject(CartService);

  product!: Product;
  relatedProducts: Product[] = [];

  ngOnInit() {
    this.loadProduct();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadProduct();
    });
  }

  loadProduct() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.http.get<Product>(`/api/products/${slug}`).subscribe((data) => {
      this.product = data;

      this.http.get<Product[]>(`/api/related-products/${slug}`).subscribe((related) => {
        this.relatedProducts = related;
      });
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
