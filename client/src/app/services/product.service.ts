import { inject, Injectable } from '@angular/core';
import { Product } from '../types/Product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getPopularProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/search?q=${query}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/admin/products');
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`/api/products/${id}`);
  }

  AddProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', product);
  }

 // constructor() { }
}
