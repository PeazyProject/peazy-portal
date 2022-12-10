import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  getSession(): Promise<any> {
    let userProfile = lastValueFrom(this.http.get('/api/userprofile', { withCredentials: true }));
    return userProfile;
  }

}
