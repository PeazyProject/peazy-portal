import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { from, lastValueFrom, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { isNullOrEmpty } from '../utils/common-functions';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public onLogout: EventEmitter<void>;
  currentToken: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.onLogout = new EventEmitter;
  }

  public login(username: string, password: string, loginType: string): Observable<any> {

    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        // const jwtResp = await this.getToken(username, password, loginType).toPromise();
        const jwtResp = await lastValueFrom(this.getToken(username, password, loginType));
        console.log("jwtResp\t", JSON.stringify(jwtResp));
        this.router.navigateByUrl("/");
        if (jwtResp) {
          this.router.navigateByUrl("/");
          // if (isNullOrEmpty(jwtResp.redirectUrl)) {
          //   console.log("Second login");
          //   this.currentToken = jwtResp.token;
          //   const userProfile = await this.userService.getUserProfile().toPromise();
          //   console.log("userProfile = " + userProfile.userProfile);
          //   console.log("userProfile.userType = " + userProfile.userProfile.userType);
          //   const user: User = {
          //     id: userProfile.userProfile.uuid,
          //     name: userProfile.userProfile.userName,
          //     email: userProfile.userProfile.email,
          //     type: userProfile.userProfile.userType
          //   };

          //   // console.log("user.userType = " + user.userType);
          //   // this.userService.userInfo = user;

          //   // const userPreference = await this.userService.getUserPreferences().toPromise();

          //   // console.log(userPreference);

          //   // this.userService.preference = isNullOrEmpty(userPreference) ? new UserPreference() : userPreference;
          //   this.router.navigateByUrl("/");
          // } else {
          //   console.log("First login");
          //   this.router.navigateByUrl(jwtResp.redirectUrl);
          // }
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

}