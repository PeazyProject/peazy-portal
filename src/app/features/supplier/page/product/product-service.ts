import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryProductBySeqNoParam } from 'src/app/core/models/product/query-product-by-seq-no-param';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    queryProduct(param: any): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/queryProduct`;
      return this.http.post(url, param);
    }

    getImgUrl(sn: string): string{
      return `${environment.supplierApiUrl}/product/getImgUrl/${sn}`;
    }

    getDropDownList(mainCategory: string, subCategory: string): Observable<any> {
      const url = `${environment.supplierApiUrl}/supplierCommon/getDropDownList/${mainCategory}/${subCategory}`;
    return this.http.get(url);
    }

    getProductSizeOption(): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/getProductSizeOption`;
      return this.http.get(url);
    }

    getProductColorOption(): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/getProductColorOption`;
      return this.http.get(url);
    }

    getProductCategoryOption(): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/getProductCategoryOption`;
      return this.http.get(url);
    }

    getProductVendorOption(): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/getProductVendorOption`;
      return this.http.get(url);
    }

    queryProductBySeqNo(seqNo: string): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/queryProductBySeqNo/${seqNo}`;
    return this.http.get(url);
    }

    editProduct(param: any, mainPicture: any, pictureList: any): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/editProduct`;
      const formData: FormData = new FormData();

      formData.append('queryProductBySeqNoParam', JSON.stringify(param));
      formData.append('mainPicFile', mainPicture);
      formData.append('picFiles', pictureList);


      return this.http.post(url, formData, { reportProgress: true, observe: 'events' });
    }

}
