import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    queryProduct(): Observable<any> {
      const url = `${environment.supplierApiUrl}/product/queryProduct`;
      return this.http.post(url, null);
    }

    getImgUrl(sn: string): string{
      return `${environment.supplierApiUrl}/product/getImgUrl/${sn}`;
    }

}
