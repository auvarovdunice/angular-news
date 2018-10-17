import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProfileService } from './profile.service';

import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) { }
  getPosts() {
    return this.http.get<Post[]>('/api/posts');
  }

  addPost(title: string, message: string) {
    return this.http.post<Post>(`api/posts/create/${this.profileService.id}`, {title, message});
  }
  deletePost(id: number) {
    return this.http.delete<Post>(`api/posts/delete/${id}`);
  }
}
