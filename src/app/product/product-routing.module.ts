import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },

  {
    path: 'product-list',
    component: ProductListComponent,
  },

  {
    path: 'home',
    component: HeroComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
