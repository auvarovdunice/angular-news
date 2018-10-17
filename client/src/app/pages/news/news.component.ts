import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

import { PageEvent } from '@angular/material';

import { SearchType } from '../../models/searchType';
import { first } from 'rxjs/operators';

import { Post } from '../../models/post';


import {ErrorStateMatcher} from '@angular/material/core';
import {UserService} from '../../services/user.service';
import {NewsService} from '../../services/news.service';
import {AlertService} from '../../services/alert.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger(
      'alertAnimation', [
        transition(':enter', [
          style({'margin-top': '-50px', opacity: 0}),
          animate('500ms', style({'margin-top': 0, opacity: 1}))
        ]),
        transition(':leave', [
          style({'margin-top': 0, opacity: 1}),
          animate('500ms', style({'margin-top': '-50px', opacity: 0}))
        ])
      ]
    )
  ],
})
export class NewsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private newsService: NewsService,
    private activeRouter: ActivatedRoute,
    private route: Router,
  ) {
  }

  newsForm: FormGroup;
  searchValue: string;
  loading = false;
  length: number;
  pageIndex: number;
  queryParam: any;
  pageSize = 5;
  selectedType = 'username';
  pageSizeOptions: number[] = [5, 10, 25];
  posts: Post[];
  viewPosts: Post[];

  searchTypes: SearchType[] = [
    {value: 'username', viewValue: 'Username'},
    {value: 'email', viewValue: 'Email'},
    {value: 'title', viewValue: 'Title'},
    {value: 'message', viewValue: 'Message'},
  ];

  ngOnInit() {
    this.newsForm = this.formBuilder.group({
        title: ['', Validators.required],
        message: ['', Validators.required],
      },
      this.activeRouter.queryParams.subscribe(
        (queryParam: any) => {
          this.queryParam = queryParam;
          this.pageSize = queryParam['pageSize'] || 5;
          this.pageIndex = queryParam['pageIndex'] || 0;
          this.searchValue = queryParam['searchValue'] || '';
        }
      ));

    this.newsService.getPosts()
      .pipe(first())
      .subscribe(data => {
        this.posts = data;
        this.viewPosts = this.newViewPosts;
      });


  }

  get f() {
    return this.newsForm.controls;
  }


  onSubmit() {
    if (this.newsForm.invalid) {
      return;
    }
    this.loading = true;
    this.newsService.addPost(this.f.title.value, this.f.message.value)
      .pipe(first())
      .subscribe(post => {
          this.posts = [post, ...this.posts];
          this.viewPosts = this.newViewPosts;
          this.alertService.success('Post was added!!!');
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  delete(id: number) {
    this.newsService.deletePost(id)
      .pipe(first())
      .subscribe(posts => {
          this.posts = this.posts.filter(_ => _.id !== id);
          this.viewPosts = this.newViewPosts;
          this.alertService.success('Post was deleted!!!');
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  find() {
    this.changeQueryParams({searchValue: this.searchValue});
    this.viewPosts = this.newViewPosts;
  }

  get newViewPosts() {
    return [...this.posts].splice(this.pageIndex * this.pageSize, this.pageSize)
      .filter(item => {
        const newItem = item[this.selectedType].toLowerCase();
        const newSearch = this.searchValue.toLowerCase();
        return newItem.indexOf(newSearch) !== -1;
      });
  }
  changeSelectedType() {
    this.changeQueryParams({selectedType: this.selectedType});
  }
  changeQueryParams(newItems: Object) {
    this.route.navigate([], {queryParams: {...this.queryParam, ...newItems}});
  }
  pageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.route.navigate([], {queryParams: {...this.queryParam, pageSize: event.pageSize, pageIndex: event.pageIndex}});
    this.viewPosts = [...this.posts].splice(event.pageIndex * event.pageSize, event.pageSize);
  }
}
