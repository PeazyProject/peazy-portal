import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeazySharedModule } from 'src/app/shared/peazy-shared.module';
import { MainProductComponent } from './page/product/mainProductPage/main-product.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { TableModule } from 'primeng/table';
import { EditProductComponent } from './page/product/editProductPage/edit-product.component';

@NgModule({
  declarations: [
    MainProductComponent,
    EditProductComponent
  ],
  imports: [
    SupplierRoutingModule,
    PeazySharedModule,
    TableModule,
    CommonModule
  ]
})
export class SupplierModule { }
