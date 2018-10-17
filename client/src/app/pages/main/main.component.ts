import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {first} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  users: User[];

  ngOnInit() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success('Fetch success!', true);
          setTimeout(() => this.users = data.data, 3000);
          // this.users = data.data;
        },
        error => {
          this.alertService.error(error.message);
        });
  }
}
