import { UserService } from './../../_service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from '../../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../Models/User';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  user: User;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.route.queryParams.subscribe(params => {
      if (!params['tab']) {
        this.memberTabs.tabs[0].active = true;
      } else {
        this.memberTabs.tabs[params['tab']].active = true;
      }
    });
    this.galleryOptions = [
     {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
     }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const images = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      images.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return images;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
