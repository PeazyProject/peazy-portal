import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { from, lastValueFrom, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GlobalConstants } from '../constants/globalConstants';
import { User } from '../models/user';
import { UserRefreshToken } from '../models/user-refreshToken';
import { isNullOrEmpty } from '../utils/common-functions';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { RouteStateService } from './route-state.service';
import { SessionStorageService } from './session-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public onLogout: EventEmitter<void>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cacheService: CacheService,
    private routeStateService: RouteStateService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.onLogout = new EventEmitter;
  }

  get currentUserInfo(): User {
    return this.userService.userInfo;
  }

  get currentToken(): string {
    return this.localStorageService.getItem(GlobalConstants.currentToken);
  }

  set currentToken(token: string) {
    this.localStorageService.setItem(GlobalConstants.currentToken, token);
  }

  login(username: string, password: string, loginType: string): Observable<any> {

    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        // const resp = await this.getToken(username, password, loginType).toPromise();
        const resp = await lastValueFrom(this.getToken(username, password, loginType));
        if (resp) {
          this.currentToken = resp.jwtToken;
          // const userProfile = await this.userService.getUserProfile().toPromise();
          const userProfile = await lastValueFrom(this.userService.getUserProfile());
          const user: User = {
            id: userProfile.userProfile.uuid,
            name: userProfile.userProfile.userName,
            email: userProfile.userProfile.email,
            type: userProfile.userProfile.userType
          };
          this.userService.userInfo = user;


          // const userPreference = await lastValueFrom(this.userService.getUserPreference());

          // console.log(userPreference);

          // this.userService.preference = isNullOrEmpty(userPreference) ? new UserPreference() : userPreference;
          this.router.navigateByUrl("");
          console.log('after router');
          resolve();
        } else {
          reject(new Error('jwt authenticaton fail...'));
        }
      } catch (e) {
        reject(e);
      }
    });
    return from(promise);
  }

  logout(): void {
    this.onLogout.emit();
    this.clear();
    this.userService.logout();
    this.cacheService.clear();
    this.routeStateService.clear();
    this.sessionStorageService.clear();
  }

  clear(): void {
    this.localStorageService.removeItem(GlobalConstants.currentToken);
  }

  async refreshTokenBy(userRefreshToken: UserRefreshToken) {
    const jwtResp = await this.getToken(
      this.userService.userInfo.email,
      'password',
      'loginWithUserName').toPromise()
    this.currentToken = jwtResp.token
  }

  private getToken(username: string, password: string, loginType: string): Observable<any> {
      return loginType === 'loginWithUserName' ?
      this.http.post<any>(`${environment.authUrl}/authentication`, {
        userEmail: null,
        userName: username,
        userPassword: password }) :
      this.http.post<any>(`${environment.authUrl}/authenticationByEmail`, {
        userEmail: username,
        userName: null,
        userPassword: password });
  }

  register(request: any) {
    return this.userService.createCustomerUser(request);
  }

}
