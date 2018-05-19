import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { environment } from './../../environments/environment';
import { getErrorMessage } from '../_tools/service.utils';
import { PaginatedResult } from '../Models/Pagination';
@Injectable()
export class UserService {
  private baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParams?: string): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';
    if (likesParams === 'Likers') {
      queryString += 'Likers=true&';
    }
    if (likesParams === 'Likees') {
      queryString += 'Likees=true&';
    }
    if (page !== null && itemsPerPage !== null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }
    if (userParams !== null && userParams !== undefined) {
      queryString += `minAge=${userParams.minAge}&maxAge=${userParams.maxAge}&gender=${userParams.gender}&orderBy=${userParams.orderBy}`;
    }
    return this.http.get<User[]>(this.baseUrl + queryString, {observe: 'response'} )
    .map((res) => {
      paginatedResult.result = res.body;
      if (res.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
      }
      return paginatedResult;
    })
    .catch(getErrorMessage);
  }

  getUser(id): Observable<User> {
    return this.http.get(this.baseUrl + `/${id}`).catch(getErrorMessage);
  }

  userUpdate(id: number, user: User) {
    return this.http.put(this.baseUrl + `/${id}`, user).catch(getErrorMessage);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(`${this.baseUrl}/${userId}/photos/${id}/setMain`, {}).catch(getErrorMessage);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(`${this.baseUrl}/${id}/like/${recipientId}`, {}).catch(getErrorMessage);
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.baseUrl}/${userId}/photos/${id}`, {}).catch(getErrorMessage);
  }
}
