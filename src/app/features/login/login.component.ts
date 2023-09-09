import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base.component';

import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent  implements OnInit {

  loginForm!: FormGroup;
  isProd: boolean;
  errorMsg: string = "";
  loading: boolean = false;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    super(injector);
    this.isProd = environment.production;
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserInfo) {
      this.routeStateService.navigateTo('/');
    }
    this.loginForm = this.formBuilder.group({
      username: [this.isProd ? '' : 'Admin@gmail.com', Validators.required],
      password: [this.isProd ? '' : '12345', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loader.show();
    this.loading = true;
    const formData = this.loginForm.value;
    console.log("username=", formData.username, ", password=", formData.password);
    const loginMethod = this.isEmail(formData.username) ? 'loginWithEmail' : 'loginWithAccount';
    this.authenticationService.login(formData.username, formData.password, loginMethod)
      .pipe(
        finalize(() => {
        this.loader.hide();
        this.loading = false;
      }))
      .subscribe({
        next: () => {
          console.log("Login Successful");
          this.routeStateService.navigateTo('/');
        },
        error: err => {
          console.log("Login Error");
          if (err?.error) {
            this.toastErrorMessage(err.error);
          } else {
            const errorMsg = err || err.message;
            this.logger.error(errorMsg);
          }
        }
      });
  }

  isEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  onLogout(): void {
    this.authenticationService.logout();
  }

}
