import { Component, inject, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartTableComponent implements OnInit {
  private cartService = inject(CartService);
  cartItems: CartItem[] = [];

  @Input() allowQuantityChange = true;

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity >= 1 && this.allowQuantityChange) {
      this.cartService.updateQuantity(id, quantity);
    }
  }

  removeFromCart(id: number) {
    if (this.allowQuantityChange) {
      this.cartService.removeFromCart(id);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}