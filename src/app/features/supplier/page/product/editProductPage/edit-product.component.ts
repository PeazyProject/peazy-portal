import {Component, Injector} from '@angular/core';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductColorSizeBean } from 'src/app/core/models/product/product-color-size-bean';
import { ProductService } from '../product-service';
import { QueryProductBySeqNoParam } from 'src/app/core/models/product/query-product-by-seq-no-param';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends BaseComponent {

    sizeOption: any[] = [];
    colorOption: any[] = [];
    categoryOption: any[] = [];
    isShowEditProductQty = false;
    queryProductBySeqNoParam: QueryProductBySeqNoParam;

    productSeqNo: string = this.routeStateService.getCurrent().data.productSeqNo;
    isEditMode = false;
    mainPicture: any;
    pictureList: any[] = ['', '', '', '', '', '', '', ''];

    constructor(
      injector: Injector,
      private productService: ProductService,
      private sanitizer: DomSanitizer) {
        super(injector);
        this.queryProductBySeqNoParam = {
          productName: "",
          skuList: [],
          mpnList: [],
          sizeList: [],
          colorList: [],
          cost: 0,
          price: 0,
          category: "",
          productStatus: "",
          productDesc: "",
          mainPic: "",
          picList: [],
          productColorSizeList: []
        }
     }

    ngOnInit() {

      if (this.productSeqNo != '') {
        this.isEditMode = true;
      }

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

      this.productService.queryProductBySeqNo(this.productSeqNo).subscribe({
        next: (result: any) => {
          this.queryProductBySeqNoParam = result;
        }
      });

    }

    skuChipsAdd(event: any): void {
      const value: string = event.value;
      const parsedValues: string[] = value.split('\r\n').filter(x => isNullOrEmpty(x) === false && x !== '\r\n');
      this.queryProductBySeqNoParam.skuList.splice(this.queryProductBySeqNoParam.skuList.indexOf(value));
      this.queryProductBySeqNoParam.skuList = this.queryProductBySeqNoParam.skuList.concat(parsedValues);
    }

    mpnChipsAdd(event: any): void {
      const value: string = event.value;
      const parsedValues: string[] = value.split('\r\n').filter(x => isNullOrEmpty(x) === false && x !== '\r\n');
      this.queryProductBySeqNoParam.mpnList.splice(this.queryProductBySeqNoParam.mpnList.indexOf(value));
      this.queryProductBySeqNoParam.mpnList = this.queryProductBySeqNoParam.mpnList.concat(parsedValues);
    }

    getImgUrl(snCode: string): string {
      if (isNullOrEmpty(snCode)) {
        return "";
      } else {
        return this.productService.getImgUrl(snCode);
      }
    }

    editProduct(): void {
      this.productService.editProduct(this.queryProductBySeqNoParam)
      .subscribe({
        next: () => {
          this.routeStateService.navigateTo('/supplier/MainProduct',{});
        }
      })
    }

    editProductQty(): void {
      this.isShowEditProductQty = !this.isShowEditProductQty;
    }

    previewPic(event: any): void {
      this.mainPicture = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0]));

      for (let i = 1; i <= 8; i ++) {
        if (event.target.files[i] != null) {
          this.pictureList[i - 1] = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[i]));
        }
      }
    }

    updateProductQty(productColorSizeList: ProductColorSizeBean[]): void {
      this.isShowEditProductQty = false;
      this.queryProductBySeqNoParam.productColorSizeList = productColorSizeList;
    }

    updateProductSize(event: any): void {

      let sizeSeqNoList = this.queryProductBySeqNoParam.productColorSizeList.map(bean => bean.sizeSeqNo)
        .filter((x, idx, array) => array.indexOf(x) == idx);

      if (event.value.length > sizeSeqNoList.length) {
        for (const colorSeqNo of this.queryProductBySeqNoParam.colorList) {
          const productColorSizeBean = {
            colorSeqNo: colorSeqNo,
            sizeSeqNo: event.itemValue,
            notOrderCnt: 0,
            orderedCnt: 0,
            checkOrderCnt: 0,
            allocatedCnt: 0,
            readyDeliveryCnt: 0,
            finishCnt: 0
          }
          this.queryProductBySeqNoParam.productColorSizeList.push(productColorSizeBean);
        }
      } else {
        this.queryProductBySeqNoParam.productColorSizeList =
          this.queryProductBySeqNoParam.productColorSizeList.filter(({sizeSeqNo}) => {return sizeSeqNo != event.itemValue});
      }

    }

    updateProductColor(event: any): void {
      let colorSeqNoList = this.queryProductBySeqNoParam.productColorSizeList.map(bean => bean.colorSeqNo)
        .filter((x, idx, array) => array.indexOf(x) == idx);

      if (event.value.length > colorSeqNoList.length) {
        for (const sizeSeqNo of this.queryProductBySeqNoParam.sizeList) {
          const productColorSizeBean = {
            colorSeqNo: event.itemValue,
            sizeSeqNo: sizeSeqNo,
            notOrderCnt: 0,
            orderedCnt: 0,
            checkOrderCnt: 0,
            allocatedCnt: 0,
            readyDeliveryCnt: 0,
            finishCnt: 0
          }
          this.queryProductBySeqNoParam.productColorSizeList.push(productColorSizeBean);
        }
      } else {
        this.queryProductBySeqNoParam.productColorSizeList =
          this.queryProductBySeqNoParam.productColorSizeList.filter(({colorSeqNo}) => {return colorSeqNo != event.itemValue});
      }

    }

}
