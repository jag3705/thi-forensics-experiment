import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Task} from "./task.service";

export interface SubmitUpload {
  homework: any;
  notes: string;
  homework_id: string;
}
export interface Upload {
  id: string;
  notes: string;
  grade: string;
  upload_path: string;
  homework_id: string;
  student_id: string;
  created_at:string;
  updated_at:string;
  task?: Task;
}

@Injectable({
  providedIn: 'root'
})
export class HomeworkUploadService {
  apiURL = 'http://backend.thi-app.test/api/v1';
  httpOptions = {};

  constructor(private http: HttpClient, private authApi: AuthService) {
  }

  public getMyUploads(): Observable<Upload> {

    this.httpOptions = {
      headers: this.authApi.getAuthHeaders()
    };

    return this.http
      .get<Upload>(this.apiURL + '/uploads/not-graded',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getMyGradedUploads(): Observable<Upload> {

    this.httpOptions = {
      headers: this.authApi.getAuthHeaders()
    };

    return this.http
      .get<Upload>(this.apiURL + '/uploads/graded',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public uploadHomework(submission: FormData): Observable<Upload> {

    let uploadHeaders : HttpHeaders = new HttpHeaders()
      .set('Authorization', this.authApi.getApiToken());

    let uploadHttpOptions = {
      headers: uploadHeaders
    };

    return this.http
      .post<Upload>(
        this.apiURL + '/uploads/' + submission.get("homework_id"),
        submission,
        uploadHttpOptions);
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
