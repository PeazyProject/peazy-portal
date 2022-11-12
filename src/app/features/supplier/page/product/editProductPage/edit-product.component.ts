import {Component, Injector} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { EditProductService } from './edit-product-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { ProductService } from '../mainProductPage/main-product-service';
import { DomSanitizer } from '@angular/platform-browser';
import { ColorSizeModel } from 'src/app/core/models/product/color-size-model';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends BaseComponent {

    sortOptions: SelectItem[] = [];
    sortOrder!: number;
    sortField!: string;

    isEditMode = false;
    isSearchFormOpen: boolean = false;
    editForm: FormGroup;
    searchParams: any;
    isLoading: boolean = false;
    productList: any[] = [];
    isStockOption: any[] = [];
    sizeOption: any[] = [];
    colorOption: any[] = [];
    categoryOption: any[] = [];
    multiple: boolean = true;
    isShowEditProductQty = false;

    mainPic: any;
    pic1: any;
    pic2: any;
    pic3: any;
    pic4: any;
    pic5: any;
    pic6: any;
    pic7: any;
    pic8: any;


    constructor(
      injector: Injector,
      private productService: ProductService,
      private editProductService: EditProductService,
      private primengConfig: PrimeNGConfig,
      private sanitizer: DomSanitizer,
      private fb: FormBuilder) {

        super(injector);

        this.editForm = this.fb.group({
          productName: '',
          sku: '',
          sizeList: [],
          colorList: [],
          cost: 0,
          price: 0,
          cartegory: '',
          productStatus: 'AVAILABLE',
          productDesc: '',
          productMainPic: null,
          productPic: []
        });
     }

    ngOnInit() {

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

      this.productService.getProductCategoryOption().subscribe({
        next: (result: any) => {
          this.categoryOption = result
        }
      });


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
      const formControl = this.editForm.get(fromControlName);
      formControl?.value.splice(formControl?.value.indexOf(value));
      formControl?.setValue(formControl?.value.concat(parsedValues));
    }

    // searchBtnClick(): void {

    //   this.isLoading = true;
    //   this.isSearchFormOpen = false;

    //   this.productService.queryProduct(this.searchForm.value)
    //   .pipe(finalize(() => this.isLoading = false))
    //   .subscribe({
    //     next: result => {
    //       this.isSearchFormOpen = false;
    //       this.productList = result.queryProductList;
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       this.toastErrorMessage(err.error);
    //     }
    //   });
    // }

    getImgUrl(snCode: string): string {
      if (isNullOrEmpty(snCode)) {
        return "";
      } else {
        return this.productService.getImgUrl(snCode);
      }

    }

    insertProduct(): void {
      // TODO 下此來處理這邊，要記得導回產品主畫面
    }

    editProductQty(): void {
      this.isShowEditProductQty = !this.isShowEditProductQty;
    }

    accordionTabOpen(): void {
      this.isSearchFormOpen = true;
    }

    previewPic(event: any): void {
      this.mainPic = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0]));
      this.pic1 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[1]));
      this.pic2 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[2]));
      this.pic3 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[3]));
      this.pic4 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[4]));
      this.pic5 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[5]));
      this.pic6 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[6]));
      this.pic7 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[7]));
      this.pic8 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[8]));

    }

    updateProductQty(colorSizeModel: ColorSizeModel[]): void {
      this.isShowEditProductQty = false;
      console.log("LOOK colorSizeModel = " + colorSizeModel[0].color);
    }


}
