import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalConstants } from '../constants/globalConstants';
import { User } from '../models/user';
import { isNullOrEmpty } from '../utils/common-functions';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private logger: NGXLogger
  ) {
    this.user = new BehaviorSubject<User>(this.userInfo);
  }

  get userInfo(): User {
    const userData = this.localStorageService.getItem(GlobalConstants.currentUser);
    return isNullOrEmpty(userData) ? new User() : userData;
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${environment.authUrl}/authorization`);
  }

}
