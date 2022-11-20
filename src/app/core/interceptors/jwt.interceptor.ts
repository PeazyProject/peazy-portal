import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { isNullOrEmpty } from '../utils/common-functions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request);
    // add authorization header with jwt token if available
    const token = this.authenticationService.currentToken;
    console.log(`at interceptor-token state... token: `, token);
    console.log(`req=`, request);
    if (token) {
      console.log("do setHeaders");
      request = request.clone({
        setHeaders:{
          "Authorization": `Bearer ${token}`,
          // "Access-Control-Allow-Origin": "*", // TO-DO: 暫時先讓他過  server.ts要再研究
          // "Access-Control-Allow-Headers": "X-Requested-With", // TO-DO: 暫時先讓他過  server.ts要再研究
        }
      });
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`try to get refreshToken...`, event);
          const refreshToken = event.headers.get('RefreshToken');
          if (!isNullOrEmpty(refreshToken)) {
            console.log('RefreshToken have been got...');
            this.authenticationService.currentToken = refreshToken as string;
          }
        }
        return event;
      })
    );
  }
}
