import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerProductComponent } from './page/product/customerProductPage/customer-product.component';

const routes: Routes = [
  {
    path: 'CustomerProduct',
    component: CustomerProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
