import { Photo } from './../../Models/Photo';
import { AuthService } from './../../_service/auth.service';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../_service/user.service';
import { AlertifyService } from '../../_service/alertify.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];

  @Output() mainPhotoChanged = new EventEmitter<string>();

  uploader: FileUploader = new FileUploader({});

  hasBaseDropZoneOver = false;

  baseUrl = environment.apiUrl;

  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  public initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/users/${this.authService.decodedToken.nameid}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      removeAfterUpload: true,
      allowedFileType: ['image'],
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        // const photo = {}
        this.photos.push(photo);
      }
    };
  }

  public setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(+this.authService.decodedToken.nameid, photo.id).subscribe(res => {
      this.currentMain = _.findWhere(this.photos, {isMain: true});
      this.currentMain.isMain = false;
      photo.isMain = true;
      this.mainPhotoChanged.emit(photo.url);
      this.alertify.success('successfully set to main');
    }, error => {
      this.alertify.error(error);
    });
  }
}
