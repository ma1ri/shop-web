import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/shared/models/brand.model';
import { Category } from 'src/app/shared/models/category.model';
import { ProductsService } from '../product.service';
import { Product } from 'src/app/shared/models/product.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  categories: Category[] = [];
  brands: Brand[] = [];
  product!: Product | undefined;
  editMode: boolean = false;
  user!: User;

  selectedImage!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.fetchFillterFields();
      this.productId = params['productId'];
      console.log(this.productId);
      if (this.productId) {
        this.productsService.getProductById(this.productId).subscribe((res) => {
          this.product = res;
          this.user = this.product.userId;
          this.selectedImage = this.product?.imageIds?.length
            ? this.product.imageIds[0].imageLink
            : '';
        });
      }
    });
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    if (!this.productForm.valid) {
      return;
    }

    const params = {
      ...this.productForm.value,
      userId: this.product?.userId?._id, // TODO: დაამატე დალოგინებული იუზერის id
    };
    if (!this.productId) {
      this.productsService.createProduct(params).subscribe((res) => {
        this.product = res;
        this.editMode = false;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { productId: this.product._id },
        });
      });
      return;
    }
    this.productsService
      .updateProduct(this.productId, params)
      .subscribe((res) => {
        this.product = res;
        this.editMode = false;
      });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  deleteImage() {}

  addImage() {}

  navigateToMyProfile() {
    this.router.navigate(['seller/my-profile']).then();
  }

  onEdit() {
    this.editMode = true;
    const paramsForForm = {
      productName: this.product?.productName,
      categoryId: this.product?.categoryId._id,
      brandId: this.product?.brandId._id,
      price: this.product?.price,
      newPrice: this.product?.newPrice,
      inStock: this.product?.inStock,
      onSale: this.product?.onSale,
      description: this.product?.description,
    };
    this.productForm.patchValue(paramsForForm);
  }

  fetchFillterFields() {
    this.productsService.getBrands().subscribe((res) => {
      this.brands = res?.brands;
    });

    this.productsService.getCategories().subscribe((res) => {
      this.categories = res?.categories;
    });
  }

  private initForm() {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      brandId: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      newPrice: new FormControl('', Validators.min(0)),
      inStock: new FormControl(false),
      onSale: new FormControl(false),
      description: new FormControl('', Validators.maxLength(500)),
    });
  }
}
