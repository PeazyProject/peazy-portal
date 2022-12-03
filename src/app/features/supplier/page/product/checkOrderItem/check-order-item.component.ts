import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SupplierProduct } from 'src/app/core/models/common/supplier-product';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { CheckOrderService } from '../services/check-order.service';

@Component({
  selector: 'check-order-item',
  templateUrl: './check-order-item.component.html',
  styleUrls: ['./check-order-item.component.scss'],
})
export class CheckOrderItemComponent extends BaseComponent implements OnInit {
  productItem: SupplierProduct[];
  @Output() closeDialog = new EventEmitter<boolean>();
  @Input() totalCheckOrderCnt: number | undefined;
  headerProductName: string;
  headerProductSku: string;

  constructor(
    injector: Injector,
    private checkorderService: CheckOrderService
  ) {
    super(injector);

    this.productItem = [];
    this.headerProductName = '';
    this.headerProductSku = '';
  }

  async ngOnInit(): Promise<void> {}

  queryCheckOrderItem(checkOrderItem: any) {
    console.log('queryCheckOrderItem');
    console.log(checkOrderItem);
    this.checkorderService
      .queryCheckOrderItemBySeqNo(checkOrderItem.productSeqNo)
      .subscribe({
        next: (result) => {
          console.log('result.queryProductList');
          console.log(result);
          this.productItem = result.supplierProductViewList;
          this.headerProductName = checkOrderItem.productName;
          this.headerProductSku = checkOrderItem.sku;
        },
        error: (err: HttpErrorResponse) => {
          this.toastErrorMessage(err.error);
        },
      });
  }

  onClose() {
    this.confirmationService.confirm({
      message: '資料未確認確定要關閉？',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.closeDialog.emit(false);
        this.productItem = [];
      },
      reject: () => {
        return;
      },
    });
  }

  confirmCheckOrderData(checkOrderDataItem: any) {
    console.log(checkOrderDataItem);
    this.closeDialog.emit(false);
    this.productItem = [];
  }
}
