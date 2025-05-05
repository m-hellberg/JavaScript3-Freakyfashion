import { Component, inject } from '@angular/core';
import { CartTableComponent } from '../../components/cart-table/cart-table.component';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CartTableComponent, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartService = inject(CartService);
}
