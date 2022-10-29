import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainProductComponent } from './page/product/mainProductPage/mainProduct.component';

const routes: Routes = [
  {
    path: 'MainProduct',
    component: MainProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
