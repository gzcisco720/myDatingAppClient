import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './../Shared/shared.module';
import { AuthRoutes } from './auth.routing';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    AuthRoutes,
    SharedModule
  ],
  declarations: [
    RegisterComponent,
    UserEditComponent
  ],
  exports: [
    RegisterComponent
  ]
})

export class AuthModule { }
