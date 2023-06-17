import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService, LoginToken, StudentLogin} from "./auth.service";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Student} from "./student.service";
import {Upload} from "./homework-upload.service";

export interface Profile {
  id: string;
  name: string;
  bio:string;
  mtr:string;
  avatar:string;
  email:string;
  created_at:string;
  updated_at:string;
}

export interface StudentMeta {
  bio:string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiURL = 'http://backend.thi-app.test/api/v1';
  httpOptions = {};

  constructor(private http: HttpClient, private authApi : AuthService) {}

  updateMeta(meta: StudentMeta): Observable<Student> {

    this.httpOptions = {
      headers : this.authApi.getAuthHeaders()
    };


    return this.http
      .put<Student>(
        this.apiURL + '/students/meta',
        JSON.stringify(meta),
        this.httpOptions
      )
  }
  public uploadAvatar(submission: FormData): Observable<Upload> {

    let uploadHeaders : HttpHeaders = new HttpHeaders()
      .set('Authorization', this.authApi.getApiToken());

    let uploadHttpOptions = {
      headers: uploadHeaders
    };

    return this.http
      .post<Upload>(
        this.apiURL + '/students/avatar/',
        submission,
        uploadHttpOptions);
  }

  public getProfile(): Observable<Profile> {

    this.httpOptions = {
      headers : this.authApi.getAuthHeaders()
    };

    return this.http
      .get<Profile>(this.apiURL + '/students/me',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
