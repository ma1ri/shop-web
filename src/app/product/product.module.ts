import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductDetailsComponent, ProductListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    ProductRoutingModule,
    FormsModule,
  ],
})
export class ProductModule {}
