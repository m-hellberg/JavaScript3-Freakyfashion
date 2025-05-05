import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Product } from '../../../types/Product';
// import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {

  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    const confirmed = window.confirm('Är du säker på att du vill ta bort produkten?');
    if (confirmed) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }

  addProduct(Products: Product) {
    //this.productService.AddProduct(Products).subscribe((data) => {
    //  this.products.push(data);
    //});
  }

  myFunction(message: string) {
    console.log(message);
  }
}
