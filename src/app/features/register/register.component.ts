import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

formParams!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.formParams = this.fb.group({
      userAccount:null,
      userName: null,
      userPassword: null,
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("register onSubmit");
    this.userService.createCustomerUser(this.formParams).subscribe({
      next: result => {
        console.log("next-result: "+JSON.stringify(result));
      },
      error: err => {
        console.log("error: "+JSON.stringify(err));
      }
    });;
  }
}
