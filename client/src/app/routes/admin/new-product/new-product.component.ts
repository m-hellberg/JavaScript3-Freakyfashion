import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);

  productForm!: FormGroup;

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      description: [''],
      image: ['', Validators.required],
      brand: [''],
      sku: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{3}$/)]],
      price: [''],
      publicationDate: ['']
    });
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
  
    const formValue = this.productForm.value;
  
    const randomPurchases = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
  
    const product: Product = {
      ...formValue,
      slug: this.generateSlug(formValue.name),
      purchasesThisMonth: randomPurchases,
      isPopular: 0
    };
  
    this.productService.AddProduct(product).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }
}
