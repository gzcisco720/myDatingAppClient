import { AuthService } from './../_service/auth.service';
import { Message } from './../Models/Message';
import { Injectable } from '@angular/core';
import { UserService } from './../_service/user.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { Observable } from 'rxjs/Observable';
import { PaginatedResult } from '../Models/Pagination';
@Injectable()
export class MessageResolver implements Resolve<PaginatedResult<Message[]>> {
  pageSize = 12;
  pageNumber = 1;
  messageContainer = 'Unread';
  constructor(private userService: UserService,
              private atuhService: AuthService,
              private alertify: AlertifyService,
              private route: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResult<Message[]>> {
    return this.userService.getMessages(+this.atuhService.decodedToken.nameid,
    this.pageNumber, this.pageSize, this.messageContainer).catch((error) => {
      this.alertify.error('Problem with fetching data');
      this.route.navigate(['']);
      return Observable.of(null);
    });
  }
}
