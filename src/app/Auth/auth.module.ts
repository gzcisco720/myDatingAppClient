import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './../Shared/shared.module';
import { AuthRoutes } from './auth.routing';

@NgModule({
  imports: [
    AuthRoutes,
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ]
})

export class AuthModule { }
