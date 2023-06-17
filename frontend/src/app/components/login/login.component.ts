import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, StudentLogin} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router, private authApi: AuthService) {
  }


  onClickLogin(): void {

    this.message = '';

    let credentials: StudentLogin =
      {
        email: this.email,
        password: this.password
      }

    this.authApi.login(credentials).subscribe({
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
