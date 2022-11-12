import {Component, EventEmitter, Injector, Output} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ColorSizeModel } from 'src/app/core/models/product/color-size-model';

@Component({
  selector: 'edit-product-qty',
  templateUrl: './edit-product-qty.component.html',
  styleUrls: ['./edit-product-qty.component.scss']
})
export class EditProductQtyComponent extends BaseComponent {

    @Output() updateProductQty: EventEmitter<any>;

    colorSizeModelList: ColorSizeModel[] = []

    constructor(
      injector: Injector,
      private primengConfig: PrimeNGConfig,
      private sanitizer: DomSanitizer,
      private fb: FormBuilder) {

        super(injector);
        this.colorSizeModelList =
        [{color:"黑", sizeQtyModelList: [{size:"S", qty: 1}, {size:"M", qty: 2}, {size:"L", qty: 3}]},
        {color:"白", sizeQtyModelList: [{size:"S", qty: 4}, {size:"M", qty: 5}, {size:"L", qty: 6}]},
        {color:"灰", sizeQtyModelList: [{size:"S", qty: 0}, {size:"M", qty: 0}, {size:"L", qty: 0}]}
      ];

      this.updateProductQty = new EventEmitter<any>();


     }

    finishEdit() {
      this.updateProductQty.emit(this.colorSizeModelList);
    }

}
