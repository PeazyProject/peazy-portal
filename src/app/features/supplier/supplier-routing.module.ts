import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProductComponent } from './page/product/editProductPage/edit-product.component';
import { MainProductComponent } from './page/product/mainProductPage/main-product.component';

const routes: Routes = [
  {
    path: 'MainProduct',
    component: MainProductComponent
  },
  {
    path: 'EditProduct',
    component: EditProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
