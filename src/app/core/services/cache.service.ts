import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants/globalConstants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private localStorageService: LocalStorageService) { }

  clear(): void {
    this.localStorageService.removeItem(GlobalConstants.cacheKey);
  }

}
