import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
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
}
