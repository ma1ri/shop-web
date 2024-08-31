import { Component, HostListener } from '@angular/core';
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
  currentPage = 1;
  isLoading = false;
  hasMoreProducts = true;

  private timeoutId: any;

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      const params = {
        categoryId: this.filters.category,
        brandId: this.filters.brand,
        minPrice: this.filters.minPrice.toString(),
        maxPrice: this.filters.maxPrice.toString(),
        productName: this.filters.productName,
        currentPage: this.currentPage,
      };
      this.fetchProducts(params);
    }
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchFillterFields();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.isLoading = false;
    this.hasMoreProducts = true;
    this.products = [];
    const params = {
      categoryId: this.filters.category,
      brandId: this.filters.brand,
      minPrice: this.filters.minPrice.toString(),
      maxPrice: this.filters.maxPrice.toString(),
      productName: this.filters.productName,
      currentPage: this.currentPage,
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
    if (this.isLoading || !this.hasMoreProducts) return;
    this.isLoading = true;
    this.productsService.fetchProducts(params).subscribe((data) => {
      this.products = [...this.products, ...data];
      this.hasMoreProducts = data.length > 0;
      this.isLoading = false;
      this.currentPage++;
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
