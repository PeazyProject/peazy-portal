import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { SupplierProduct } from 'src/app/core/models/common/supplier-product';
import { deepCopy } from 'src/app/core/utils/common-functions';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { CheckOrderService } from '../services/check-order.service';
import { ConfirmCheckOrderRequest } from '../../../../../core/models/request/confirm-check-order-request';

@Component({
  selector: 'check-order-item',
  templateUrl: './check-order-item.component.html',
  styleUrls: ['./check-order-item.component.scss'],
})
export class CheckOrderItemComponent extends BaseComponent implements OnInit {
  productItemList: SupplierProduct[];
  orginalProductItemList: SupplierProduct[];
  @Output() closeDialog = new EventEmitter<boolean>();
  @Input() totalCheckOrderCnt: number | undefined;
  headerProductName: string;
  headerProductSku: string;
  confirmBtn: boolean;

  constructor(
    injector: Injector,
    private checkorderService: CheckOrderService
  ) {
    super(injector);

    this.productItemList = [];
    this.orginalProductItemList = [];
    this.headerProductName = '';
    this.headerProductSku = '';
    this.confirmBtn = false;
  }

  async ngOnInit(): Promise<void> {}

  queryCheckOrderItem(checkOrderItem: any) {
    console.log(checkOrderItem);
    this.checkorderService
      .queryCheckOrderItemBySeqNo(checkOrderItem.productSeqNo)
      .subscribe({
        next: (result) => {
          this.productItemList = result.supplierProductViewList;
          this.orginalProductItemList = deepCopy(this.productItemList)!;
          this.productItemList.forEach(
            (productItem) => (productItem.checkOrderCnt = 0)
          );
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
        this.productItemList = [];
      },
      reject: () => {
        return;
      },
    });
  }

  confirmCheckOrderData(checkOrderDataItemList: any) {
    const requset: ConfirmCheckOrderRequest = {
      supplierProductViewList: checkOrderDataItemList,
      userId: 'Joe',
    };
    this.checkorderService.confirmCheckOrder(requset).subscribe({
      next: () => {
        this.closeDialog.emit(false);
        this.productItemList = [];
      },
      error: (err: HttpErrorResponse) => {
        this.toastErrorMessage(err.error);
      },
    });
  }

  checkOrderCntInput(checkOrderDataItem: any) {
    if (checkOrderDataItem.checkOrderCnt == null) {
      this.confirmBtn = true;
    }
    this.confirmBtn = false;
  }
}
