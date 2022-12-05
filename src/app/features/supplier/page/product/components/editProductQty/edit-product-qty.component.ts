import { Component, EventEmitter, Injector, Input, Output, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { ProductColorSizeBean } from 'src/app/core/models/product/product-color-size-bean';
import { ProductService } from '../../product-service';

@Component({
  selector: 'edit-product-qty',
  templateUrl: './edit-product-qty.component.html',
  styleUrls: ['./edit-product-qty.component.scss']
})
export class EditProductQtyComponent extends BaseComponent {

    @Output() updateProductQty: EventEmitter<any>;
    @Input() productColorSizeList: ProductColorSizeBean[] = [];

    sizeOption: any[] = [];
    colorOption: any[] = [];

    constructor(
      injector: Injector,
      private productService: ProductService) {
        super(injector);
        this.productColorSizeList = [];
        this.updateProductQty = new EventEmitter<any>();
     }

     ngOnInit(): void {
      this.productService.getProductSizeOption().subscribe({
        next: (result: any) => {
          this.sizeOption = result
        }
      });

      this.productService.getProductColorOption().subscribe({
        next: (result: any) => {
          this.colorOption = result
        }
      });
     }

    finishEdit() {
      this.updateProductQty.emit(this.productColorSizeList);
    }

}
