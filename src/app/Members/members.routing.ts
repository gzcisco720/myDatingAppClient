import { Routes, RouterModule } from '@angular/router';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberDetailResolver } from '../_resolvers/member-detail.resolver';
import { MemberListResolver } from '../_resolvers/member-list.resolver';
import { MemberLikesComponent } from './member-likes/member-likes.component';
import { LikesListResolver } from '../_resolvers/likes-list.resolver';

const routes: Routes = [
  { path: '', component: MembersListComponent, resolve: {users: MemberListResolver} },
  { path: ':id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
  { path: 'list/likes', component: MemberLikesComponent, resolve: {users: LikesListResolver}}
];

export const MembersRoutes = RouterModule.forChild(routes);
