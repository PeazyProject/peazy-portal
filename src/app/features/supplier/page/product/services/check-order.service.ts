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
    const url = `${environment.supplierApiUrl}/product/queryProduct/${seqNo}`;
    return this.http.post(url, seqNo);
  }

  queryProduct(param: any): Observable<any> {
    const url = `${environment.supplierApiUrl}/product/queryProduct`;
    return this.http.post(url, param);
  }

  queryCheckOrderItem(): Observable<any> {
    const url = `${environment.supplierApiUrl}/product/queryCheckOrderItem`;
    return this.http.post(url, null);
  }
  
}
