import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckOrderService {
  private baseUrl: string = `${environment.supplierApiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  queryProductBySeqNo(seqNo: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/product/queryProductBySeqNo/${seqNo}`;
    return this.http.get(url, seqNo);
  }

  queryProduct(param: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/product/queryProduct`;
    return this.http.post(url, param);
  }

  queryCheckOrder(productName: string, sku: string): Observable<any> {
    var req = { productName: productName, sku: sku };
    const url = `${environment.supplierApiUrl}/checkOrder/queryCheckOrder`;
    return this.http.post(url, req);
  }

  queryCheckOrderItemBySeqNo(seqNo: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/checkOrder/queryCheckOrderItemBySeqNo/${seqNo}`;
    return this.http.get(url, seqNo);
  }

  queryAllCheckOrder(): Observable<any> {
    const url = `${environment.supplierApiUrl}/checkOrder/queryAllCheckOrder`;
    return this.http.post(url, null);
  }
}
