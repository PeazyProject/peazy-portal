import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
