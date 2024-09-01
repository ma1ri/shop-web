import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'shop-web';
  authServiceSubscription!: Subscription;
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.authServiceSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((res) => (this.isAuthenticated = res));
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

  onNavigateToMyProducts() {
    this.router
      .navigate(['seller/profile'], {
        queryParams: { userId: this.authService.getUserId() },
      })
      .then();
  }

  onLogout() {
    this.authService.logout();
  }
}
