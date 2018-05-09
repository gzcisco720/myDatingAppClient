import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegisterGuard } from '../_guards/register.guard';

const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [RegisterGuard] }
];

export const AuthRoutes = RouterModule.forChild(routes);
