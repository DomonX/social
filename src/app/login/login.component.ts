import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSub: Subscription;

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginSrv: LoginService, private router: Router) {
    this.loginSub = loginSrv.loggedUser$.subscribe((i) => {
      router.navigate(['wall']);
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    const value = this.loginForm.value;
    this.loginSrv.login(value.login, value.password);
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
