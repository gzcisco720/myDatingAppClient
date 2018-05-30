import { Message } from './../../Models/Message';
import { AuthService } from './../../_service/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadMessage();
  }

  loadMessage() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(+this.authService.decodedToken.nameid, this.userId)
    .do(messages => {
      _.each(messages, (message: Message) => {
        if (message.isRead === false && message.recipientId === currentUserId) {
          this.userService.markAsRead(currentUserId, message.id);
        }
      });
    }).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }
  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(+this.authService.decodedToken.nameid, this.newMessage)
    .subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }
}
