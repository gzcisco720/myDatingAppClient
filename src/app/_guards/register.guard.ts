import { AuthService } from './../_service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from '../_service/alertify.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.loggedIn()) {
      return true;
    }
    this.alertify.message('Already logged in');
    this.router.navigate(['']);
    return false;
  }
}
