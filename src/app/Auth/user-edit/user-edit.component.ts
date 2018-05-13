import { AuthService } from './../../_service/auth.service';
import { AlertifyService } from './../../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../Models/User';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  user: User;

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.userUpdate(+this.authService.decodedToken.nameid, this.user).subscribe(_ => {
      this.alertify.success('User is updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
