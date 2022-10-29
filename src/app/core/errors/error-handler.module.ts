import { HttpErrorInterceptor } from './http-error-interceptor';
import { ErrorHandler, NgModule } from '@angular/core';
import { GlobalErrorHandler } from './global-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PeazySharedModule } from 'src/app/shared/peazy-shared.module';



@NgModule({
  declarations: [],
  imports: [
    PeazySharedModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class ErrorHandlerModule { }
