import { Component } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand.model';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../product.service';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

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

  navigateToProduct(product: Product) {
    this.router.navigate(['/product/product-details'], {
      queryParams: { productId: product._id },
    });
  }

  fetchProducts(params = {}): void {
    this.productsService.fetchProducts(params).subscribe((data) => {
      this.products = data;
    });
  }

  fetchFillterFields() {
    this.productsService.getBrands().subscribe((res) => {
      this.brands = res?.brands;
    });

    this.productsService.getCategories().subscribe((res) => {
      this.categories = res?.categories;
    });
  }
}
