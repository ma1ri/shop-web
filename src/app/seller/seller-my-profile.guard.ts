import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SellerMyProfileGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.getIsAuth();

    if (isAuthenticated) {
      return true;
    } else {
      //   this.router.navigate(['/product/product-list']);
      return false;
    }
  }
}
