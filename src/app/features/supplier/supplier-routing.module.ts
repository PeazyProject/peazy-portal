import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProductQtyComponent } from './page/product/components/editProductQty/edit-product-qty.component';
import { EditProductComponent } from './page/product/editProductPage/edit-product.component';
import { MainProductComponent } from './page/product/mainProductPage/main-product.component';
import { CheckOrderComponent } from './page/checkOrder/checkOrderPage/check-order.component';
import { CheckOrderItemComponent } from './page/checkOrder/checkOrderItem/check-order-item.component';

const routes: Routes = [
  {
    path: 'MainProduct',
    component: MainProductComponent
  },
  {
    path: 'EditProduct',
    component: EditProductComponent
  },
  {
    path: 'EditProductQty',
    component: EditProductQtyComponent
  },
  {
    path: 'CheckOrder',
    component: CheckOrderComponent
  },
  {
    path: 'CheckOrderItem',
    component: CheckOrderItemComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
