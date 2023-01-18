import { CustomerProductComponent } from './page/product/customerProductPage/customer-product.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeazySharedModule } from 'src/app/shared/peazy-shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    CustomerProductComponent
  ],
  imports: [
    CustomerRoutingModule,
    PeazySharedModule,
    TableModule,
    CommonModule
  ]
})
export class CustomerModule { }
