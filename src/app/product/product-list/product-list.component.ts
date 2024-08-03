import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Brand, BrandResponse } from 'src/app/shared/models/brand.model';
import {
  Category,
  CategoryResponse,
} from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  filters = {
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    productName: '',
  };

  private timeoutId: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchFillterFields();
  }

  applyFilters(): void {
    const params = {
      categoryId: this.filters.category,
      brandId: this.filters.brand,
      minPrice: this.filters.minPrice.toString(),
      maxPrice: this.filters.maxPrice.toString(),
      productName: this.filters.productName,
    };
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.fetchProducts(params), 300);
  }

  fetchProducts(params = {}): void {
    let url = environment.url + 'api/products/search';
    this.http.get<Product[]>(url, { params }).subscribe((data) => {
      this.products = data;
    });
  }

  fetchFillterFields() {
    this.http
      .get<BrandResponse>(environment.url + 'api/brands')
      .subscribe((res) => {
        this.brands = res?.brands;
      });
    this.http
      .get<CategoryResponse>(environment.url + 'api/categories')
      .subscribe((res) => {
        this.categories = res?.categories;
      });
  }
}
