import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckOrderService {

  private baseUrl: string = `${environment.supplierApiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }

  queryProductBySeqNo(seqNo: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/product/queryProductBySeqNo/${seqNo}`;
    return this.http.get(url, seqNo);
  }

  queryProduct(param: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/product/queryProduct`;
    return this.http.post(url, param);
  }

  queryCheckOrder(): Observable<any> {
    const url = `${environment.supplierApiUrl}/checkOrder/queryCheckOrder`;
    return this.http.post(url, null);
  }

  queryCheckOrderItemBySeqNo(seqNo: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/checkOrder/queryCheckOrderItemBySeqNo/${seqNo}`;
    return this.http.get(url, seqNo);
  }
}
