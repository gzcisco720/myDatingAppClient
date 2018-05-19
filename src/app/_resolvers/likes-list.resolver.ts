import { Injectable } from '@angular/core';
import { UserService } from './../_service/user.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../Models/User';
import { AlertifyService } from '../_service/alertify.service';
import { Observable } from 'rxjs/Observable';
import { PaginatedResult } from '../Models/Pagination';
@Injectable()
export class LikesListResolver implements Resolve<PaginatedResult<User[]>> {
  pageSize = 12;
  pageNumber = 1;
  likesParams = 'Likers';

  constructor(private userService: UserService, private alertify: AlertifyService, private route: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<User[]>> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParams).catch((error) => {
      this.alertify.error('Problem with fetching data');
      this.route.navigate(['']);
      return Observable.of(null);
    });
  }
}
