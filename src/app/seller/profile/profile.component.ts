import { Component, OnDestroy, OnInit } from '@angular/core';
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

  isAuthenticated = false;
  userId!: string;
  private queryParamsSubscription!: Subscription;
  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.userId = params['userId'];
        if (this.userId) {
          this.authService
            .getUserDetails(this.userId)
            .subscribe((res) => (this.user = res));
          this.productsService
            .fetchProducts({ userId: this.userId })
            .subscribe((res) => {
              this.products = res;
            });
        }
        //gaushvi formidan
      }
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
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
