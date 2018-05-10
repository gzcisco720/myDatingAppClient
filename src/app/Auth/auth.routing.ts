import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegisterGuard } from '../_guards/register.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from '../_resolvers/user-edit.resolver';
import { PreventUnsavedChangesGuard } from '../_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: RegisterComponent, canActivate: [RegisterGuard] },
  { path: 'edit', component: UserEditComponent, resolve: {user: UserEditResolver}, canDeactivate: [PreventUnsavedChangesGuard] }
];

export const AuthRoutes = RouterModule.forChild(routes);
