import { SharedModule } from './../Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { RouterModule } from '@angular/router';
import { MembersRoutes } from './members.routing';
import { MemberLikesComponent } from './member-likes/member-likes.component';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    MembersRoutes
  ],
  declarations: [
    MembersListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberLikesComponent,
    MessagesComponent
  ]
})
export class MembersModule { }
