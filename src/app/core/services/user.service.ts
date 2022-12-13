import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalConstants } from '../constants/globalConstants';
import { User } from '../models/user';
import { UserPreference } from '../models/user-preference';
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

  set userInfo(value: User) {
    this.localStorageService.setItem(GlobalConstants.currentUser, value);
    this.user.next(value);
  }

  get preference(): UserPreference {
    const preferenceData = this.localStorageService.getItem(GlobalConstants.userPreference);
    return isNullOrEmpty(preferenceData) ? new UserPreference() : preferenceData;
  }

  set preference(value: UserPreference) {
    this.localStorageService.setItem(GlobalConstants.userPreference, value);
    this.saveUserPreference().subscribe({
        next: () => {},
        error: err => {
          this.logger.error(JSON.stringify(err));
        }
      });
  }

  getUserProfile(): Observable<any> {
    const url = `${environment.authUrl}/authorization`;
    return this.http.get<any>(url);
  }

  getUserPreference(): Observable<any> {
    const url = `/api/userpreference/${this.userInfo.id}`;
    return this.http.get(url);
  }

  logout(): void {
    this.localStorageService.removeItem(GlobalConstants.currentUser);
    this.localStorageService.removeItem(GlobalConstants.userPreference);
    this.logoutAction().subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        this.logger.error(JSON.stringify(err));
      }
    });
  }

  private logoutAction(): Observable<any> {
    const url = '/api/logout';
    return this.http.get(url);
  }

  private saveUserPreference(): Observable<any> {
    const url = `/api/userpreference/${this.userInfo.id}`;
    return this.http.put(url, { preference: this.preference, userName: this.userInfo.name });
  }

  createCustomerUser(request: any): Observable<any> {
    // const url = `${environment.authUrl}/registerCustomerUser`;
    const url = `${environment.authUrl}/user/createCustomerUser`;
    return this.http.post(url, request);
  }

}
