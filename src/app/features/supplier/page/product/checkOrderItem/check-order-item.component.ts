import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { checkOrderItem } from 'src/app/core/models/check-order-item';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { CheckOrderService } from '../services/check-order.service';

@Component({
  selector: 'check-order-item',
  templateUrl: './check-order-item.component.html',
  styleUrls: ['./check-order-item.component.scss']
})
export class CheckOrderItemComponent extends BaseComponent implements OnInit {
  productItem: checkOrderItem;
  @Output() closeDialog = new EventEmitter<boolean>();

  constructor(injector: Injector, private checkorderService: CheckOrderService) {
    super(injector);

    this.productItem = {
      productName: "abc123", sku: "123", colorSizeModelList: [{ color: "黑", sizeQtyModelList: [{ size: "S", qty: 1 }, { size: "M", qty: 2 }, { size: "L", qty: 3 }] },
      { color: "白", sizeQtyModelList: [{ size: "S", qty: 4 }, { size: "M", qty: 5 }, { size: "L", qty: 6 }] },
      { color: "灰", sizeQtyModelList: [{ size: "S", qty: 0 }, { size: "M", qty: 0 }, { size: "L", qty: 0 }] }
      ]
    };
  }


  async ngOnInit(): Promise<void> {

  }

  queryCheckOrderItem(checkOrderItem: any) {
    console.log("queryCheckOrderItem");
    console.log(checkOrderItem);
    this.checkorderService.queryProductBySeqNo(checkOrderItem)
      .subscribe({
        next: result => {
          console.log(result);
          console.log("result.queryProductList");
          this.productItem = {
            productName: "abc123", sku: "123", colorSizeModelList: [{ color: "黑", sizeQtyModelList: [{ size: "S", qty: 1 }, { size: "M", qty: 2 }, { size: "L", qty: 3 }] },
            { color: "白", sizeQtyModelList: [{ size: "S", qty: 4 }, { size: "M", qty: 5 }, { size: "L", qty: 6 }] },
            { color: "灰", sizeQtyModelList: [{ size: "S", qty: 0 }, { size: "M", qty: 0 }, { size: "L", qty: 0 }] }
            ]
          };
        },
        error: (err: HttpErrorResponse) => {
          this.toastErrorMessage(err.error);
        }
      });
  }

  onClose() {
    this.confirmationService.confirm({
      message: "資料未確認確定要關閉？",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeDialog.emit(false)
        this.productItem = { productName: "", sku: "", colorSizeModelList: [] };
      },
      reject: () => {
        return;
      }
    });
  }

  confirmCheckOrderData(checkOrderDataItem: any) {
    console.log(checkOrderDataItem);
    this.closeDialog.emit(false);
    this.productItem = { productName: "", sku: "", colorSizeModelList: [] };
  }
}
