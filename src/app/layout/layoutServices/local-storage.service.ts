import { isJSON, isNullOrEmpty } from 'src/app/core/utils/common-functions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);

    if (isNullOrEmpty(value)) {
      return null;
    }

    return isJSON(value as string) ? JSON.parse(value as string) : value;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
