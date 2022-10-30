import { NgModule } from '@angular/core';
import { PeazySharedModule } from 'src/app/shared/peazy-shared.module';
import { MainProductComponent } from './page/product/mainProductPage/main-product.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { TableModule } from 'primeng/table';
import { DisplayProductDetailComponent } from './page/product/mainProductPage/displayProductDetail/display-product-detail.component';

@NgModule({
  declarations: [
    MainProductComponent,
    DisplayProductDetailComponent
  ],
  imports: [
    SupplierRoutingModule,
    PeazySharedModule,
    TableModule
  ]
})
export class SupplierModule { }
