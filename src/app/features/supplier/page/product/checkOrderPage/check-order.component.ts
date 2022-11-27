import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataView } from 'primeng/dataview';
import { Dialog } from 'primeng/dialog';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { CheckOrderItemComponent } from '../checkOrderItem/check-order-item.component';
import { ProductService } from '../product-service';
import { CheckOrderService } from '../services/check-order.service';

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.component.html',
  styleUrls: ['./check-order.component.scss']
})
export class CheckOrderComponent extends BaseComponent {

  searchForm: FormGroup;
  checkOrderList: any;
  accordionTabOpen: any;

  sortOrder!: number;
  sortField!: string;

  sortOptions: any;

  @ViewChild('dv') dv!: DataView;
  @ViewChild('checkOrder') checkOrder!: CheckOrderItemComponent;
  isShowCheckOrderItem: boolean = false;

  checkOrderItemSeqNo: any;

  constructor(injector: Injector, private fb: FormBuilder, private checkorderService: CheckOrderService, private productService: ProductService) {
    super(injector);

    this.searchForm = this.fb.group({
      productName: '',
      sku: '',
    });

    this.checkOrderList = [];
  }

  ngOnInit(): void {
    this.checkorderService.queryCheckOrderItem().subscribe({

      next: result => {
        console.log("queryCheckOrderItem")
        console.log(result)
        this.checkOrderList = result.queryCheckOrderItemBeanList;
      },
      error: (err: HttpErrorResponse) => {
        this.toastErrorMessage(err.error);
      }

    });

    this.sortOptions = [
      { label: 'Qty High to Low', value: '!productOrderedCnt' },
      { label: 'Qty Low to High', value: 'productOrderedCnt' }
    ];

  }

  onSortChange(event: { value: any; }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(event: any) {
    console.log(event);
    this.dv.filter((event.target.value));
  }

  searchBtnClick(flag: Boolean) {

  }

  showDialog(event: Event): void {
  }

  checkOrderItem(orderItem: string) {
    console.log("checkOrderItem");
    console.log(orderItem);
    this.checkOrderItemSeqNo = orderItem;
    this.isShowCheckOrderItem = true;
    this.checkOrder.queryCheckOrderItem(orderItem);
  }

  getImgUrl(snCode: string): string {
    if (isNullOrEmpty(snCode)) {
      return "";
    } else {
      return this.productService.getImgUrl(snCode);
    }

  }

  closeDialog(display: any) {
    this.isShowCheckOrderItem = display;
  }
}
