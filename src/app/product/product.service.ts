import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../shared/models/product.model';
import { BrandResponse } from '../shared/models/brand.model';
import { CategoryResponse } from '../shared/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private environmentUrlAPI = environment.url + 'api';
  private apiUrl = `${environment.url}api/products`;

  constructor(private http: HttpClient) {}

  fetchProducts(params: any = {}): Observable<Product[]> {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      if (![null, undefined, ''].includes(params[key])) {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    return this.http.get<Product[]>(`${this.apiUrl}/search`, {
      params: httpParams,
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBrands(): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(this.environmentUrlAPI + '/brands');
  }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      this.environmentUrlAPI + '/categories'
    );
  }
}
