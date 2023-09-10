import {Component, Injector, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { CustomerProductService } from '../customer-product-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { finalize } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { SessionBaseComponent } from 'src/app/shared/components/session.base.component';
import { ProductService } from 'src/app/features/supplier/page/product/product-service';
import { AddShoppingCartRequest } from 'src/app/core/models/request/add-shopping-cart-request';

@Component({
  selector: 'customer-product',
  templateUrl: './customer-product.component.html',
  styleUrls: ['./customer-product.component.scss']
})
export class CustomerProductComponent extends SessionBaseComponent implements OnInit {

    isSearchFormOpen: boolean;
    searchForm: FormGroup;
    searchParams: any;
    isLoading: boolean = false;
    productList: any[] = [];
    isStockOption: any[] = [];
    addShoppingCartRequest: AddShoppingCartRequest;

    userType!: string;

    constructor(
      injector: Injector,
      private customerProductService: CustomerProductService,
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
        this.userType = '';

        this.addShoppingCartRequest = {
          productSeqNo: '',
          sizeSeqNo: '',
          colorSeqNo: '',
          productQty: '',
          userUUID: '',
          userId: ''
        }
     }

     override async ngOnInit(): Promise<void> {
      super.ngOnInit();
      this.searchBtnClick(true);
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

      this.customerProductService.queryCustomerProduct(this.searchForm.value)
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
      this.routeStateService.navigateTo('/supplier/EditProduct', {productSeqNo});
    }

    addShoppingCart(productSeqNo: any, colorSeqNo: any, sizeSeqNo: any, productQty: any): void {
      this.addShoppingCartRequest.productSeqNo = productSeqNo;
      this.addShoppingCartRequest.colorSeqNo = colorSeqNo;
      this.addShoppingCartRequest.sizeSeqNo = sizeSeqNo;
      this.addShoppingCartRequest.productQty = productQty;
      this.addShoppingCartRequest.userUUID = this.userProfile.uuid;
      this.addShoppingCartRequest.userId = this.userProfile.name;
      this.customerProductService.addShoppingCart(this.addShoppingCartRequest)
      .subscribe({
        next: resp => {
          if (resp.type === HttpEventType.Response) {
            if (resp.status == 200) {
              // TODO 要弄一下i18N
              this.toastService.success("新增購物車成功", false);
            }
          }
        }
      })
    }

    accordionTabOpen(): void {
      this.isSearchFormOpen = true;
    }

}
