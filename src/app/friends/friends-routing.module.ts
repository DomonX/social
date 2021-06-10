import { LoginGuard } from './../login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends.component';

const routes: Routes = [{ path: '', component: FriendsComponent, canActivate: [LoginGuard], canActivateChild: [LoginGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
