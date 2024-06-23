import { NgModule } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ProductCardComponent],
})
export class SharedModule {}
