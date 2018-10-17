import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/core';

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import {AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private cookieService: CookieService
  ) {
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    const { password, confirmPassword } = this.registerForm.value;
    // stop here if form is invalid
    if (this.registerForm.invalid ) {
      return;
    }
    if (password === confirmPassword) {
      delete this.registerForm.value.confirmPassword;
    } else {
      this.alertService.error('Passwords must match!');
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.cookieService.put('user', JSON.stringify(data));
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error.message || error);
          this.loading = false;
        });
  }
}
