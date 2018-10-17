import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-news-header',
  template: `
      <header>
        <button mat-button [routerLink]="['/profile']">
            Profile
        </button>
        <button mat-button (click)="authenticationService.logout()">
        Logout
        </button>
      </header>
  `,
  styles: [`
    header {
      position: relative;
      display: flex;
      justify-content: space-between;
      background: #fff;
      box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
      margin: 1rem 0;
      padding: 1em 1em;
      border-radius: .28571429rem;
      border: 1px solid rgba(34,36,38,.15);
      width: 90%;
      margin: auto;
    }
  `]
})
export class NewsHeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
