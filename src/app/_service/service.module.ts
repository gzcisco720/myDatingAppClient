import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';
import { RegisterGuard } from '../_guards/register.guard';
import { UserService } from './user.service';
import { MemberDetailResolver } from '../_resolvers/member-detail.resolver';
import { AuthGuard } from '../_guards/auth.guard';
import { UserEditResolver } from '../_resolvers/user-edit.resolver';

@NgModule()

export class ServiceModule {
  static forRoot(): ModuleWithProviders {
      return {
        ngModule: ServiceModule,
        providers: [
          // Services
          {provide: AuthService, useClass: AuthService},
          {provide: AlertifyService, useClass: AlertifyService},
          {provide: UserService, useClass: UserService},
          // Router Guards
          {provide: RegisterGuard, useClass: RegisterGuard},
          {provide: AuthGuard, useClass: AuthGuard},
          // Router Resolver
          {provide: MemberDetailResolver, useClass: MemberDetailResolver},
          {provide: UserEditResolver, useClass: UserEditResolver}
        ]
      };
  }
}
