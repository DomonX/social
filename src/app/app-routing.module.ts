import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/wall' },
  { path: 'wall', loadChildren: () => import('./wall/wall.module').then(m => m.WallModule), canActivate: [LoginGuard], canActivateChild: [LoginGuard] },
  { path: 'friends', loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
