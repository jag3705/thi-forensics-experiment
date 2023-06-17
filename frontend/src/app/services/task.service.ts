import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {AuthService} from "./auth.service";

export interface Task {
  id: string;
  name: string;
  instruction:string;
  deadline:string;
  created_at:string;
  updated_at:string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiURL = 'http://backend.thi-app.test/api/v1';
  httpOptions = {};

  constructor(private http: HttpClient, private authApi : AuthService) {}



  public getTasks(): Observable<Task> {
    this.httpOptions = {
      headers : this.authApi.getAuthHeaders()
    };

    return this.http
      .get<Task>(this.apiURL + '/homeworks',
        this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  public getTask(id:String): Observable<Task> {
    this.httpOptions = {
      headers : this.authApi.getAuthHeaders()
    };

    return this.http
      .get<Task>(this.apiURL + '/homeworks/' + id,
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
