import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { PageInfo } from 'src/app/core/models/page-info';
import { SearchFormParameterGroup } from 'src/app/core/models/user-preference';
import { deepCopy, isNullOrEmpty } from 'src/app/core/utils/common-functions';

@Component({
  selector: 'display-product-detail',
  templateUrl: './display-product-detail.component.html',
  styleUrls: ['./display-product-detail.component.scss']
})
export class DisplayProductDetailComponent implements OnInit {

  @Input() value: any[];
  @Input() columns: any[];
  @Output() tableOnPage: EventEmitter<any>;

  @ViewChild(Table) table!: Table;
  isLoading: boolean;
  pageInfo: PageInfo;

  constructor() {
    this.value = [{productName: 'ABC'}, {productName: 'ABC'}
  ];
    this.columns = [
      { field: 'pic', header: '圖片', sort: true },
      { field: 'productName', header: '商品名稱', sort: true }
    ];
    this.isLoading = false;
    this.pageInfo = { pageSize: 20, pageIndex: 0, totalRecords: 0, totalPages: 0 };
    this.tableOnPage = new EventEmitter();

  }

  ngOnInit(): void {

  }

  saveBtnClick(event: any): void {
  }

  pageEvent(event: any): void {
    this.tableOnPage.emit(event);
  }

}
