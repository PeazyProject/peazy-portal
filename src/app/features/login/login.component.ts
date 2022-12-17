import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { BaseComponent } from 'src/app/shared/components/base.component';

import { environment } from './../../../environments/environment';

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
      username: [this.isProd ? '' : 'Admin', Validators.required],
      password: [this.isProd ? '' : '12345', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    console.log("do onSubmit() at login.component");
    // this.submitted = true;

    // if (this.loginForm.invalid) {
    //   return;
    // }

    // this.loader.show();
    // this.loading = true;
    console.log("username=", this.f['username'].value, ", password=", this.f['password'].value);
    this.authenticationService.login(this.f['username'].value, this.f['password'].value, 'loginWithUserName')
      .pipe(
        finalize(() => {
        // this.loader.hide();
        // this.loading = false;
      }))
      .subscribe({
        next: () => {
          console.log("do login() next at login.component");
          // this.routeStateService.navigateTo(this.returnUrl);
        },
        error: err => {
          console.log("do login() error at login.component");
          // if(err.error){
          //   this.toastErrorMessage(err.error);
          // }else{
          //   this.errorMsg = err || err.message;
          //   this.toastService.error('login failed');
          //   this.logger.error(err);
          // }
        }
      });
  }
}
