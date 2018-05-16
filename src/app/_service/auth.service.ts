import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { headerConfig } from './../_tools/service.utils';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from '../Models/DecodedToken';
import { getErrorMessage } from '../_tools/service.utils';
import { User } from '../Models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private baseUrl = environment.apiUrl + '/auth';
  userToken: string;
  decodedToken: DecodedToken;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: Http, private jwtHelper: JwtHelperService) {
    const tokenInLocalStorage = localStorage.getItem('token');
    if (tokenInLocalStorage) {
      this.userToken = tokenInLocalStorage;
      this.decodedToken = this.jwtHelper.decodeToken(tokenInLocalStorage);
    }
    const userInLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userInLocalStorage) {
      this.currentUser = userInLocalStorage;
      if (this.currentUser.photoUrl) {
        this.changeMemberPhoto(this.currentUser.photoUrl);
      } else {
        this.changeMemberPhoto('../../assets/user.png');
      }
    }
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(`${this.baseUrl}/login`, model, headerConfig()).map((res: Response) => {
      const user = res.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.userToken = user.tokenString;
        this.currentUser = user.user;
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        if (this.currentUser.photoUrl) {
          this.changeMemberPhoto(this.currentUser.photoUrl);
        } else {
          this.changeMemberPhoto('../../assets/user.png');
        }
      }
    }).catch(getErrorMessage);
  }
  loggedIn() {
    return !this.jwtHelper.isTokenExpired();
  }
  register(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user, headerConfig())
          .catch(getErrorMessage);
  }
}
