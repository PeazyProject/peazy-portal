import {Component, Injector} from '@angular/core';
import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductColorSizeBean } from 'src/app/core/models/product/product-color-size-bean';
import { ProductService } from '../product-service';
import { QueryProductBySeqNoParam } from 'src/app/core/models/product/query-product-by-seq-no-param';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends BaseComponent {

    sizeOption: any[] = [];
    colorOption: any[] = [];
    categoryOption: any[] = [];
    vendorOption: any[] = [];
    isShowEditProductQty = false;
    queryProductBySeqNoParam: QueryProductBySeqNoParam;

    productSeqNo: string = this.routeStateService.getCurrent().data.productSeqNo;
    isEditMode = false;
    mainPictureUrl: any;
    pictureUrlList: any[] = ['', '', '' ,'', '', '', '', ''];
    mainPicture: any;
    pictureList: any[] = ['', '', '' ,'', '', '', '', ''];
    isPicUpload = false;

    constructor(
      injector: Injector,
      private productService: ProductService,
      private sanitizer: DomSanitizer) {
        super(injector);
        this.queryProductBySeqNoParam = {
          productSeqNo: '',
          productName: '',
          skuList: [],
          mpnList: [],
          sizeList: [],
          colorList: [],
          cost: 0,
          price: 0,
          category: '',
          productStatus: 'AVAILABLE',
          productDesc: '',
          mainPicSnCode: '',
          picSnCodeList: ['', '', '' ,'', '', '', '', ''],
          productColorSizeList: [],
          userId: '',
          vendorSeqNo: ''
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

      this.productService.getProductVendorOption().subscribe({
        next: (result: any) => {
          this.vendorOption = result;
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
      this.queryProductBySeqNoParam.userId = 'AlanLee';

      if (this.isPicUpload) {
        if (isNullOrEmpty(this.mainPicture) || isNullOrEmpty(this.pictureList[0])) {
          this.toastService.warn("請上傳最少兩張圖片");
          return;
        }
      }

      this.productService.editProduct(this.queryProductBySeqNoParam, this.mainPicture, this.pictureList, this.isPicUpload)
      .subscribe({
        next: resp => {

          if (resp.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            // const percentDone = Math.round(100 * resp.loaded / resp.total);
            // this.fileUpload.progress = percentDone;
          }
          if (resp.type === HttpEventType.Response) {
            if (resp.status == 200) {
              if (this.isEditMode) {
                // TODO 要弄一下i18N
                this.toastService.success("修改商品成功", false);
              } else {
                this.toastService.success("新增商品成功", false);
              }
              this.routeStateService.navigateTo('/supplier/MainProduct',{});
            }
          }
        }
      })
    }

    editProductQty(): void {
      this.isShowEditProductQty = !this.isShowEditProductQty;
    }

    previewPic(event: any): void {
      this.mainPictureUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0]));
      this.mainPicture = event.target.files[0];

      for (let i = 1; i <= 8; i ++) {
        if (event.target.files[i] != null) {
          this.pictureUrlList[i - 1] = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[i]));
          this.pictureList[i - 1] = event.target.files[i];
        }
      }

      if (event.target.files.length < 2) {
        this.pictureUrlList = ['', '', '', '', '', '', '', ''];
        this.pictureList = ['', '', '', '', '', '', '', ''];
      }

      this.isPicUpload = true;
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
