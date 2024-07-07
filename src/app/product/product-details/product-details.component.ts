import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productForm!: FormGroup;

  categories: string[] = ['Skin Care', 'Hair Care', 'Makeup', 'Fragrance'];
  brands: string[] = ['Vivi et Margot', 'Loreal', 'Dove', 'Nivea'];
  images: string[] = [
    'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
    'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg',
  ];

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

  product = {
    Product_name: 'Olive Oil Soap',
    category: 'Skin Care',
    brand: 'Vivi et Margot',
    price: 26.0,
    new_Price: 20.0,
    in_stock: true,
    on_sale: true,
    description:
      'This olive oil soap is a luxurious blend of natural ingredients that nourishes and hydrates your skin. Perfect for daily use, it leaves your skin feeling soft and refreshed.',
  };

  selectedImage: string = this.images[0];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      Product_name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      new_Price: new FormControl('', Validators.min(0)),
      in_stock: new FormControl(false),
      on_sale: new FormControl(false),
      description: new FormControl('', Validators.maxLength(500)),
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  deleteImage() {}

  addImage() {}

  navigateToMyProfile() {
    this.router.navigate(['seller/my-profile']).then();
  }
}
