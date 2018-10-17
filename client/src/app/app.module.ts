import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { MaterialModul } from './components/material';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AlertService } from './services/alert.service';
import { ProfileService } from './services/profile.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { AlertComponent } from './components/alert/alert.component';
import { JwtInterceptor, ErrorInterceptor } from './interceptors/index';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { NewsComponent } from './pages/news/news.component';
import { ProfileHeaderComponent } from './pages/profile/sub/profileHeader.component';
import { NewsHeaderComponent } from './pages/news/sub/newsHeader.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ProfileComponent,
    ProgressBarComponent,
    NewsComponent,
    ProfileHeaderComponent,
    NewsHeaderComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModul
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    AuthGuard,
    CookieService,
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
