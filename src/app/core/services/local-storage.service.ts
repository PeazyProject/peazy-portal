import { Injectable } from '@angular/core';
import { isJSON, isNullOrEmpty } from '../utils/common-functions';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setIten(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);

    if (isNullOrEmpty(value)) {
      return null;
    }

    return isJSON(value as string) ? JSON.parse(value as string) : value;
  }

}
