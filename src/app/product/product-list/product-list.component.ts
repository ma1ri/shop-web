import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    {
      name: 'loreal paris hair mask, loreal paris hair mask sadasd',
      price: 100,
      image:
        'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
      description: '',
    },
    {
      name: 'loreal paris hair mask, loreal paris hair mask sadasd',
      price: 100,
      image:
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
      description: '',
    },
    {
      name: 'loreal paris hair mask, loreal paris hair mask sadasd',
      price: 100,
      image:
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
      description: '',
    },
    {
      name: 'loreal paris hair mask, loreal paris hair mask sadasd',
      price: 100,
      image:
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
      description: '',
    },
    {
      name: 'loreal paris hair mask, loreal paris hair mask sadasd',
      price: 100,
      image:
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
      description: '',
    },
    {
      name: 'loreal paris hair mask, loreal paris hair mask sadasd',
      price: 100,
      image:
        'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
      description: '',
    },
  ];
  categories = ['Skin Care', 'Hair Care', 'Makeup', 'Fragrance'];
  brands = ['Vivi et Margot', 'Loreal', 'Dove', 'Nivea'];
  filters = {
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 1000,
    user: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  applyFilters(): void {
    const params = {
      category: this.filters.category,
      brand: this.filters.brand,
      minPrice: this.filters.minPrice.toString(),
      maxPrice: this.filters.maxPrice.toString(),
      user: this.filters.user,
    };
    this.fetchProducts(params);
  }

  fetchProducts(params = {}): void {
    // this.http.get<any[]>('/api/products', { params }).subscribe((data) => {
    //   this.products = data;
    // });
  }
}
