import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/layout/layoutServices/toast.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private logger: NGXLogger,
    private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.logger.error(err);
        switch (err.status) {
          case 401:
            this.route.navigate(['login']);
            break;
          case 400:
            return throwError(err);
          default:
            this.translateService.get('Common.Message.UnknowError')
              .subscribe({
                next: result => {
                  this.toastService.error(result);
                }
              });
            break;
        }

        return EMPTY;
      }),
      finalize(() => {
      })
    );
  }
}
