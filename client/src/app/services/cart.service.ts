import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/Product';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  cartItems$ = this.cart.asObservable();

  private getCartFromStorage(): CartItem[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  private updateStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Product) {
    const currentCart = this.cart.value;
    const existingItem = currentCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }

    this.cart.next(updatedCart);
    this.updateStorage(updatedCart);
  }

  updateQuantity(id: number, quantity: number) {
    const updatedCart = this.cart.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    this.cart.next(updatedCart);
    this.updateStorage(updatedCart);
  }

  removeFromCart(id: number) {
    const updatedCart = this.cart.value.filter((item) => item.id !== id);
    this.cart.next(updatedCart);
    this.updateStorage(updatedCart);
  }
}
