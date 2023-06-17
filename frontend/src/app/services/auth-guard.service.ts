import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public authService: AuthService, public router: Router) {
  }

  async isLoggedIn(): Promise<Boolean> {
    return await this.authService.checkAuthenticated();
  }

  async canActivate() {

    if (!await this.authService.checkAuthenticated()) {
      await this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
