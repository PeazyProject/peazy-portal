import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { RegisterRequest } from 'src/app/core/models/request/register-request';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { copyFormControl, deepCopy } from 'src/app/core/utils/common-functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

formParams!: FormGroup;
registerRequest!: RegisterRequest;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) {
    console.log(`this.userService.userInfo`, JSON.stringify(this.userService.userInfo));

    this.formParams = this.fb.group({
      userAccount: this.createAccount(),
      userName: this.createUser(),
      userPassword: "Password",
      userAddress: null,
      userEmail: this.createEmail(),
      createDt: null,
      userPhoneNumber: null,
      userStoreName: null,
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("register onSubmit");
    // this.userService.createCustomerUser(this.formParams).subscribe({
    //   next: result => {
    //     console.log("next-result: "+JSON.stringify(result));
    //   },
    //   error: err => {
    //     console.log("error: "+JSON.stringify(err));
    //   }
    // });
    let request = deepCopy(this.formParams.value);
    console.log(`req=`, JSON.stringify(request));
    this.createEmail();
    this.authenticationService.register(request)
    .subscribe({
      next: () => {
        console.log("register pass");
      },
      error: () => {
        console.log("register error");
      }
    });
    console.log("end onSubmit");




  }

  createEmail(): string {
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var str = '';
    for (var ii = 0; ii < 5; ii++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str + '@gmail.com';
  }

  createUser(): string {
    var chars = '1234567890';
    var str = '';
    for (var ii = 0; ii < 5; ii++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return 'User' + str;
  }

  createAccount(): string {
    var chars = '1234567890';
    var str = '';
    for (var ii = 0; ii < 5; ii++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return 'Account' + str;
  }

}
