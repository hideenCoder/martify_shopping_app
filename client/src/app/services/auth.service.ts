import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserModelClient } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.serverURL;

  currentUser:BehaviorSubject<UserModelClient> = new BehaviorSubject<UserModelClient>(null);

  loginUrl = this.baseUrl + 'auth/login/'
  registerUrl = this.baseUrl + 'auth/register/'

  constructor(private http: HttpClient) { }

  register(userData) {
    return this.http.post(this.registerUrl, userData)
  }

  login(creds) {
    return this.http.post(this.loginUrl, creds)
      .pipe(
        map(data => {
          localStorage.setItem('user', JSON.stringify(data));
          return data
        })
      )
  }

  logout() {
    localStorage.removeItem('user');
  }

  checkUser() {
    return localStorage.getItem('user');
  }
}
