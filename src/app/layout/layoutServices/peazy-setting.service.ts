import { isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { GlobalConstants } from 'src/app/core/constants/globalConstants';

@Injectable({
  providedIn: 'root'
})
export class PeazySettingService {

  constructor(
    private localStorageService: LocalStorageService) {

    const languageVal = this.localStorageService.getItem(GlobalConstants.languageKey) ?? GlobalConstants.defaultLanguage;
    if (isNullOrEmpty(languageVal)) {
      this.localStorageService.setItem(GlobalConstants.languageKey, languageVal);
    }
  }

  get language(): string {
    const value = this.localStorageService.getItem(GlobalConstants.languageKey) ?? GlobalConstants.defaultLanguage;
    return value;
  }

  set language(value: string) {
    this.localStorageService.setItem(GlobalConstants.languageKey, value);
  }

}
