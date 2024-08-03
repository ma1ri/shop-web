import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SellerRoutingModule } from './seller-routing.module';

@NgModule({
  declarations: [ProfileComponent, MyProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SellerRoutingModule,
    AngularMaterialModule,
    SharedModule,
  ],
})
export class SellerModule {}
