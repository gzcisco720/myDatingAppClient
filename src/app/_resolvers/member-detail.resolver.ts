import { Injectable } from '@angular/core';
import { UserService } from './../_service/user.service';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../Models/User';
import { AlertifyService } from '../_service/alertify.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(private userService: UserService, private alertify: AlertifyService, private route: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(route.params['id']).catch((error) => {
      this.alertify.error('Problem with fetching data');
      this.route.navigate(['']);
      return Observable.of(null);
    });
  }
}
