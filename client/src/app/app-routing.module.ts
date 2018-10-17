import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewsComponent } from "./pages/news/news.component";
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
    // canActivate: [IsFirstTimeGuardService],
    // children: [
    //   { path: SHARED_ROUTES_NAMES.CONFIRMUSER, component: ConfirmComponent },
    //   { path: SHARED_ROUTES_NAMES.CHANGEPASSWORD, component: ConfirmForgotPasswordComponent },
    // ]
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: 'news',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
