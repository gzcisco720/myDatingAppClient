import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MembersListComponent } from './Members/members-list/members-list.component';
import { MemberDetailComponent } from './Members/member-detail/member-detail.component';
import { ValueComponent } from './AppComponents/value/value.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: ValueComponent },
  { path: 'auth', loadChildren: './Auth/auth.module#AuthModule'},
  { path: 'members', loadChildren: './Members/members.module#MembersModule', canActivate: [AuthGuard]},
];

export const AppRoutes = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
