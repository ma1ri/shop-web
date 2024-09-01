import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductsService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  products: Product[] = [];
  filters = {
    onSale: true,
  };
  currentPage = 1;
  isLoading = false;
  hasMoreProducts = true;

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
        onSale: true,
        currentPage: this.currentPage,
      };
      this.fetchProducts(params);
    }
  }
  ngOnInit(): void {
    const params = {
      onSale: true,
      currentPage: this.currentPage,
    };
    this.fetchProducts(params);
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

  navigateToProduct(product: Product) {
    this.router.navigate(['/product/product-details'], {
      queryParams: { productId: product._id },
    });
  }

  navigateToProducts() {
    this.router.navigate(['/product/product-list']);
  }
}
