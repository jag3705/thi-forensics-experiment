import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecommendRefreshService} from "./recommend-refresh.service";


export interface StudentLogin {
  email: string;
  password: string;
}

export interface StudentRegister {
  email: string;
  password: string;
  name: string;
  mtr: string;
}

export interface LoginToken {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiURL = 'http://backend.thi-app.test/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiToken: string = '';

  constructor(private http: HttpClient, private refreshApi: RecommendRefreshService) {
    let storedToken = localStorage.getItem('api_token');

    if (storedToken) {
      this.apiToken = storedToken;
    }

  }

  public getApiToken(): string {
    return this.apiToken;
  }

  public setApiToken(token: string) {
    this.apiToken = token;
    localStorage.setItem('api_token', token);
    this.refreshApi.loginChanged(token);
  }

  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.apiToken)
  }

  async checkAuthenticated() {
    return this.apiToken !== '';
  }

  logout(): void {
    this.apiToken = '';
    localStorage.removeItem('api_token');
    this.refreshApi.loginChanged('');
  }

  login(studentLogin: StudentLogin): Observable<LoginToken> {
    return this.http
      .post<LoginToken>(
        this.apiURL + '/students/auth/login',
        JSON.stringify(studentLogin),
        this.httpOptions
      )
  }

  register(studentRegister: StudentRegister): Observable<LoginToken> {
    return this.http
      .post<LoginToken>(
        this.apiURL + '/students/auth/register',
        JSON.stringify(studentRegister),
        this.httpOptions
      )
  }
}
