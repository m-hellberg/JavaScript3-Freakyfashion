import { CommonModule } from '@angular/common';
import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-wishlist-icon',
  imports: [CommonModule],
  templateUrl: './wishlist-icon.component.html',
  styleUrl: './wishlist-icon.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WishlistIconComponent {
  @Input() isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}
