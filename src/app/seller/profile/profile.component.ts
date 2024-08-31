import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ProductsService } from 'src/app/product/product.service';
import { User } from 'src/app/shared/models/user.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: User;
  products: Product[] = [];
  currentPage = 1;
  isLoading = false;
  hasMoreProducts = true;

  isAuthenticated = false;
  userId!: string;
  private queryParamsSubscription!: Subscription;
  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    if (pos >= max) {
      this.fetchProducts();
    }
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.userId = params['userId'];
        if (this.userId) {
          this.authService
            .getUserDetails(this.userId)
            .subscribe((res) => (this.user = res));
          this.fetchProducts();
        }
        //gaushvi formidan
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  fetchProducts() {
    if (this.isLoading || !this.hasMoreProducts) return;
    this.isLoading = true;
    this.productsService
      .fetchProducts({ userId: this.userId, currentPage: this.currentPage })
      .subscribe((res) => {
        this.products = [...this.products, ...res];
        this.hasMoreProducts = res.length > 0;
        this.isLoading = false;
        this.currentPage++;
      });
  }

  navigateToProduct(product: Product) {
    this.router.navigate(['/product/product-details'], {
      queryParams: { productId: product._id },
    });
  }

  navigateToMyProfile() {
    this.router.navigate(['seller/my-profile']).then();
  }
}
