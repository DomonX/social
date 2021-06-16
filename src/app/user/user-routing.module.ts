import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './../login.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
    children: [{ path: ':id', component: UserComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
