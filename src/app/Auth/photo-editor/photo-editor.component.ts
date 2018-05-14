import { AuthService } from './../../_service/auth.service';
import { environment } from './../../../environments/environment.prod';
import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../Models/Photo';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];

  uploader: FileUploader = new FileUploader({});

  hasBaseDropZoneOver = false;

  baseUrl = environment.apiUrl;

  constructor(private authService: AuthService) { }

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
}
