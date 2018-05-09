import { Routes, RouterModule } from '@angular/router';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberDetailResolver } from '../_resolvers/member-detail.resolver';

const routes: Routes = [
  { path: '', component: MembersListComponent },
  { path: ':id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
];

export const MembersRoutes = RouterModule.forChild(routes);
