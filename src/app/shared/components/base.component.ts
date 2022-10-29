import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { Injector } from '@angular/core';
import { isNullOrEmpty, peazyFormatString } from 'src/app/core/utils/common-functions';
import { PeazySettingService } from 'src/app/layout/layoutServices/peazy-setting.service';
import { RouteStateService } from 'src/app/layout/layoutServices/route-state.service';
import { ToastService } from 'src/app/layout/layoutServices/toast.service';
import { LoaderService } from 'src/app/layout/layoutServices/loader.service';
import { ConfirmationService } from 'primeng-lts/api';
import { CacheService } from 'src/app/layout/layoutServices/cache.service';
import { PeazyConstants } from 'src/app/core/constants/peazy-constants.constant';

export class BaseComponent {

  logger: NGXLogger;
  routeStateService: RouteStateService;
  toastService: ToastService;
  loader: LoaderService;
  translateService: TranslateService;
  peazySetting: PeazySettingService;
  confirmationService: ConfirmationService;
  cacheService: CacheService;

  constructor(injector: Injector) {
    this.logger = injector.get(NGXLogger);
    this.routeStateService = injector.get(RouteStateService);
    this.toastService = injector.get(ToastService);
    this.loader = injector.get(LoaderService);
    this.translateService = injector.get(TranslateService);
    this.peazySetting = injector.get(PeazySettingService);
    this.confirmationService = injector.get(ConfirmationService);
    this.cacheService = injector.get(CacheService);
  }

  toastErrorMessage(err: any): void {
    this.logger.error(err);
    if(isNullOrEmpty(err)) {
      throw new Error('No defined error.');
    }

    if(typeof err === 'string') {
      this.toastService.error(err);
      return;
    }

    const mappingMsg = this.getMappingErrorMessage(err.category, err.errorCode);
    var errMsg = isNullOrEmpty(mappingMsg) ? err.errorMsg : mappingMsg;

    if(err.datas != null && err.datas.length > 0){
      errMsg = peazyFormatString(errMsg, err.datas);
    }

    this.toastService.error(errMsg);
  }

  getMappingErrorMessage(category: string, errorCode: string): string {
    const errorCodeGroup = this.cacheService.load(PeazyConstants.errorCodeListKey);

    if (isNullOrEmpty(errorCodeGroup)) {
      return '';
    }

    const categoryGroup: any[] = isNullOrEmpty(errorCodeGroup[category]) ? [] : errorCodeGroup[category];
    const errMsg = categoryGroup.find(x => x.errorCode === errorCode)?.errorMsg ?? '';

    return errMsg;
  }
}
