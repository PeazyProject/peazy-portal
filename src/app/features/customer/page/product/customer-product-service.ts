import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryProductBySeqNoParam } from 'src/app/core/models/product/query-product-by-seq-no-param';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerProductService {

    constructor(private http: HttpClient) { }

    queryCustomerProduct(param: any): Observable<any> {
      const url = `${environment.customerApiUrl}/product/queryCustomerProduct`;
      return this.http.post(url, param);
    }

}
