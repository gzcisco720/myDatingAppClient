import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { headerConfig } from './../_tools/service.utils';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from '../Models/decodedToken';
import { getErrorMessage } from '../_tools/service.utils';

@Injectable()
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';
  userToken: string;
  decodedToken: DecodedToken;

  constructor(private http: Http, private jwtHelper: JwtHelperService) {
    const tokenInLocalStorage = localStorage.getItem('token');
    if (tokenInLocalStorage) {
      this.userToken = tokenInLocalStorage;
      this.decodedToken = this.jwtHelper.decodeToken(tokenInLocalStorage);
    }
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/login`, model, headerConfig()).map((res: Response) => {
      const user = res.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
      }
    }).catch(getErrorMessage);
  }
  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
  register(model: any) {
    return this.http.post(`${this.baseUrl}/register`, model, headerConfig())
          .catch(getErrorMessage);
  }
}
