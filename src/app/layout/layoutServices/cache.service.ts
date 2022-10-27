import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/core/constants/globalConstants';
import { getMaxDate, isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private localStorageService: LocalStorageService) {

  }

  save(key: string, value: any, expiredMins?: number): void {
    const cacheObj: { value: any, expiredTime: number | null } = { value, expiredTime: null };
    if (isNullOrEmpty(expiredMins)) {
      cacheObj.expiredTime = getMaxDate().getTime();
    } else {
      const expiredMilliseconds = (expiredMins as number) * 60 * 1000;
      cacheObj.expiredTime = new Date().getTime() + expiredMilliseconds;
    }

    const cacheMap = this.getCacheMap();
    cacheMap[key] = cacheObj;

    this.saveCacheMap(cacheMap);
  }

  load(key: string): any {
    const cacheMap = this.getCacheMap();
    if (!cacheMap.hasOwnProperty(key)) {
      return null;
    }
    const cacheObj = cacheMap[key];
    const now = new Date().getTime();
    if (cacheObj.expiredTime <= now) {
      this.remove(key);
      return null;
    }
    return cacheObj.value;
  }

  remove(key: string): void {
    const cacheMap = this.getCacheMap();
    if (cacheMap.hasOwnProperty(key)) {
      delete cacheMap[key];
      this.saveCacheMap(cacheMap);
    }
  }

  clear(): void {
    this.localStorageService.removeItem(GlobalConstants.cacheKey);
  }

  private saveCacheMap(cacheMap: any): void {
    this.localStorageService.setItem(GlobalConstants.cacheKey, cacheMap);
  }

  private getCacheMap(): any {
    return this.localStorageService.getItem(GlobalConstants.cacheKey) ?? {};
  }
}
