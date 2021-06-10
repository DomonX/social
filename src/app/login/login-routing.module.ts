import { LogoutGuard } from './../logout.guard';
import { LoginGuard } from './../login.guard';
import { LogoutComponent } from './logout/logout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent, canActivateChild: [LoginGuard], children: [
      { path: 'logout', component: LogoutComponent, canActivate: [LogoutGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
