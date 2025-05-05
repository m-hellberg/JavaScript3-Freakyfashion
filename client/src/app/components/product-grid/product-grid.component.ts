import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../types/Product';
import { RouterModule } from '@angular/router';
import { WishlistIconComponent } from '../wishlist-icon/wishlist-icon.component';
import { NewBadgeComponent } from '../new-badge/new-badge.component';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, RouterModule, WishlistIconComponent, NewBadgeComponent ],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',

})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Input() callback!: (message: string) => void;
}