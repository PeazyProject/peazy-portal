import { ErrorHandler, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { ToastService } from 'src/app/layout/layoutServices/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private logger: NGXLogger,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) { }

  handleError(error: any): void {
    if (error.rejection?.message == "setOptions failed") {
      this.logger.warn("zxing/ngx-scanner 'setOptions failed' bug skip")
    }
    else {
      this.logger.error(error);
      this.translateService.get('Common.Message.UnknowError')
        .subscribe({
          next: result => {
            this.toastService.error(result);
          }
        });
    }
  }
}
