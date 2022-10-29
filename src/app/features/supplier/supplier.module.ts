import { NgModule } from '@angular/core';
import { PeazySharedModule } from 'src/app/shared/peazy-shared.module';
import { MainProductComponent } from './page/product/mainProductPage/mainProduct.component';
import { SupplierRoutingModule } from './supplier-routing.module';
@NgModule({
  declarations: [
    MainProductComponent
  ],
  imports: [
    SupplierRoutingModule,
    PeazySharedModule
  ]
})
export class SupplierModule { }
