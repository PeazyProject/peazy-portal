import {Component, Injector} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ProductService } from '../product-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.scss']
})
export class MainProductComponent extends BaseComponent {

    sortOptions: SelectItem[] = [];
    sortOrder!: number;
    sortField!: string;

    isSearchFormOpen: boolean;
    searchForm: FormGroup;
    searchParams: any;
    isLoading: boolean = false;
    productList: any[] = [];
    isStockOption: any[] = [];

    constructor(
      injector: Injector,
      private productService: ProductService,
      private primengConfig: PrimeNGConfig,
      private fb: FormBuilder) {

        super(injector);

        this.searchForm = this.fb.group({
          productName: '',
          skuList: [],
          inStockList: [],
          isAvailable: 'AVAILABLE'
        });

        this.isSearchFormOpen = true;
     }

    ngOnInit() {

      this.productService.getDropDownList("DropDownList", "IsStockOption").subscribe({
        next: (result: any) => {
          this.isStockOption = result
        }
      });

      this.searchBtnClick(true);
      this.sortOptions = [
          {label: 'Price High to Low', value: '!price'},
          {label: 'Price Low to High', value: 'price'}
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

    chipsAdd(event: any, fromControlName: any): void {
      const value: string = event.value;
      const parsedValues: string[] = value.split('\r\n').filter(x => isNullOrEmpty(x) === false && x !== '\r\n');
      const formControl = this.searchForm.get(fromControlName);
      formControl?.value.splice(formControl?.value.indexOf(value));
      formControl?.setValue(formControl?.value.concat(parsedValues));
    }

    resetBtnClick() {
      this.searchForm.reset();
    }

    searchBtnClick(isInit: boolean): void {

      this.isLoading = true;

      if (isInit) {
        this.isSearchFormOpen = true;
      } else {
        this.isSearchFormOpen = false;
      }

      this.productService.queryProduct(this.searchForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: result => {
          if (isInit) {
            this.isSearchFormOpen = true;
          } else {
            this.isSearchFormOpen = false;
          }
          this.productList = result.queryProductList;
        },
        error: (err: HttpErrorResponse) => {
          this.toastErrorMessage(err.error);
        }
      });
    }

    getImgUrl(snCode: string): string {
      if (isNullOrEmpty(snCode)) {
        return "";
      } else {
        return this.productService.getImgUrl(snCode);
      }

    }

    editProduct(productSeqNo: any): void {
      console.log(productSeqNo);
      this.routeStateService.navigateTo('/supplier/EditProduct', {productSeqNo});

    }

    accordionTabOpen(): void {
      this.isSearchFormOpen = true;
    }

}
