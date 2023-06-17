import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecommendRefreshService {


  private loginSubject = new Subject<any>();
  private reloadDataSubject = new Subject<any>();

  constructor() {
  }

  public subscribeReloadRecommendedEvent(): Observable<any> {
    return this.reloadDataSubject.asObservable();
  }

  public recommendRefresh(hint: any): void {
    this.reloadDataSubject.next(hint);
  }
  public subscribeLoginEvent(): Observable<any> {
    return this.loginSubject.asObservable();
  }
  public loginChanged(hint : any): void {
    this.loginSubject.next(hint);
  }

}
