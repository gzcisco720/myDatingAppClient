import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { environment } from './../../environments/environment';
import { getErrorMessage } from '../_tools/service.utils';
@Injectable()
export class UserService {
  private baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).catch(getErrorMessage);
  }

  getUser(id): Observable<User> {
    return this.http.get(this.baseUrl + `/${id}`).catch(getErrorMessage);
  }
}
