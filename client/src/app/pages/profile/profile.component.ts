import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import {first} from 'rxjs/operators';
import { UserProfile } from '../../models/userProfile';
import { ProfileService } from '../../services/profile.service';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger(
      'alertAnimation', [
        transition(':enter', [
          style({'margin-top': '-50px', opacity: 0}),
          animate('500ms', style({'margin-top': 0, opacity: 1}))
        ]),
        transition(':leave', [
          style({'margin-top': 0, opacity: 1}),
          animate('500ms', style({ 'margin-top': '-50px', opacity: 0}))
        ])
      ]
    )]
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private progressBarService: ProgressBarService
  ) { }
  user: UserProfile;
  selected: boolean;
  @ViewChild('fileInput') fileInput: ElementRef;
  ngOnInit() {
    this.profileService.getUser()
      .pipe(first())
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          this.alertService.error(error);
        });
  }
  test() {
    const i = this.progressBarService.value + 1;
    this.progressBarService.value = i;
  }
  upload() {
    // this.profileService.changeAvatar(this.fileInput.nativeElement.files[0])
    //   .pipe(first())
    //   .subscribe(data => {
    //     console.log('here_data', data)
    //
    //     this.user.personal = data;
    //     console.log('here_this.user', this.user);
    //     this.clearFile();
    //     console.log('here_this.fileInput.nativeElement.files[0]', this.fileInput.nativeElement.files[0]);
    //   });
    this.profileService.changeAvatar(this.fileInput.nativeElement.files[0])
      .subscribe(data => {
        // if (event.type === HttpEventType.UploadProgress) {
        //   console.log('here_progress', Math.round(event.loaded / event.total * 100))
        // }
        this.user.personal = data;
        this.clearFile();
      });
  }
  clearFile() {
    this.fileInput.nativeElement.value = '';
    this.selected = false;
  }

  triggerInput(): void {
    document.getElementById('avatar').click();
  }
}
