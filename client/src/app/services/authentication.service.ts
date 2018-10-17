import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(
      private http: HttpClient,
      private cookieService: CookieService,
      private router: Router,
    ) { }

    login(username: string, password: string) {
        return this.http.post<any>(`/api/users/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                  this.cookieService.put('user', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
      this.cookieService.remove('user');
      this.router.navigate(['/login']);
    }
}
