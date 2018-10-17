import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'angular2-cookie/core';
import {environment} from '../../environments/environment';


import {UserProfile} from '../models/userProfile';
import {Personal} from '../models/profile';



@Injectable()
export class ProfileService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
  }
  id: number = this.id || this.getId();
  changeAvatar(file) {
    const formData = new FormData();
    formData.append('avatar',
      file
    );
    return this.http.put<Personal>(`api/users/upload/avatar/${this.id}`, formData, {
      reportProgress: true
    });
  }
  getId() {
    return JSON.parse(this.cookieService.get('user')).id;
  }

  getUser() {
    return this.http.get<UserProfile>(`/api/users/${this.id}`);
  }
}
