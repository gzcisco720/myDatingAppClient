import { Pagination, PaginatedResult } from './../../Models/Pagination';
import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { AuthService } from '../../_service/auth.service';
import { AlertifyService } from '../../_service/alertify.service';

@Component({
  selector: 'app-member-likes',
  templateUrl: './member-likes.component.html',
  styleUrls: ['./member-likes.component.css']
})

export class MemberLikesComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParams: string;

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParams = 'Likers';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
