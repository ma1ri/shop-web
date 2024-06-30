import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'oplop',
    gender: 'female',
    location: 'Georgia',
    profilePicture:
      'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
    facebook: 'https://facebook.com/oplop',
    instagram: 'https://instagram.com/oplop',
    phone: 'XXX-XX-XX-XX',
    mail: 'oplop@example.com',
  };

  product = [
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

  isAuthenticated = false;
  userId!: string;
  private queryParamsSubscription!: Subscription;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.userId = params['userId'];
        console.log('Current User id', this.userId);
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    );
  }

  navigateToMyProfile() {
    this.router.navigate(['seller/my-profile']).then();
  }
}
