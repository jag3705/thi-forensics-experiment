import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, StudentLogin, StudentRegister} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string ='';
  name: string='';
  mtr: string='';
  password: string='';
  message: string = '';

  constructor(private router: Router, private authApi: AuthService) {
  }

  public onClickRegister() {

    this.message = '';

    let credentials: StudentRegister =
      {
        email: this.email,
        password: this.password,
        name : this.name,
        mtr : this.mtr
      }

    this.authApi.register(credentials).subscribe({
      next: (rsp :any) => {
        if (rsp.data != false) {
          this.authApi.setApiToken( rsp.data.token_type + ' ' + rsp.data.access_token);
          this.router.navigate(['uploads']).then(r => {})
        }
      },
      error: (err) => {
        if (err.error?.message){
          this.message = err.error?.message;
        }else{
          if (err.error?.data?.error){
            this.message = err.error?.data?.error;
          }
        }
      },
      complete: () => {
      }
    });
  }

}
