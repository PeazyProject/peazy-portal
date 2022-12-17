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
  styleUrls: ['./check-order.component.scss'],
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

  totalCheckOrderCnt: number;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private checkorderService: CheckOrderService,
    private productService: ProductService
  ) {
    super(injector);

    this.searchForm = this.fb.group({
      productName: '',
      sku: '',
    });

    this.checkOrderList = [];
    this.totalCheckOrderCnt = 0;
  }

  ngOnInit(): void {
    this.queryAllCheckOrder();
    this.sortOptions = [
      { label: '已叫貨數量 高至低排序', value: '!productOrderedCnt' },
      { label: '已叫貨數量 低至高排序', value: 'productOrderedCnt' },
    ];
  }

  onSortChange(event: { value: any }) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(event: any) {
    this.dv.filter(event.target.value);
  }

  queryAllCheckOrder() {
    this.checkorderService.queryAllCheckOrder().subscribe({
      next: (result) => {
        this.checkOrderList = result.queryCheckOrderList;
        this.initTotalCheckOrderCnt(this.checkOrderList);
      },
      error: (err: HttpErrorResponse) => {
        this.toastErrorMessage(err.error);
      },
    });
  }

  searchBtnClick(event: any) {
    this.queryCheckOrder(
      this.searchForm.value.productName,
      this.searchForm.value.sku
    );
  }

  showDialog(event: Event): void {}

  checkOrderItem(orderItem: any) {
    this.isShowCheckOrderItem = true;
    this.checkOrder.queryCheckOrderItem(orderItem);
  }

  getImgUrl(snCode: string): string {
    if (isNullOrEmpty(snCode)) {
      return '';
    } else {
      return this.productService.getImgUrl(snCode);
    }
  }

  closeDialog(display: any) {
    this.isShowCheckOrderItem = display;
    this.checkOrderList = [];
    this.totalCheckOrderCnt = 0;
    this.queryAllCheckOrder();
  }

  initTotalCheckOrderCnt(checkOrderList: any) {
    checkOrderList.forEach((element: any) => {
      this.totalCheckOrderCnt =
        this.totalCheckOrderCnt + element.productOrderedCnt;
    });
  }

  queryCheckOrder(productName: string, sku: string) {
    this.checkorderService.queryCheckOrder(productName, sku).subscribe({
      next: (result) => {
        this.checkOrderList = result.queryCheckOrderList;
      },
      error: (err: HttpErrorResponse) => {
        this.toastErrorMessage(err.error);
      },
    });
  }
}
