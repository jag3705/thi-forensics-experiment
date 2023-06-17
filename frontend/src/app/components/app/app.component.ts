import {Component, OnInit} from '@angular/core';
import {AuthGuardService} from "../../services/auth-guard.service";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'THI Homework App'
  isLoggedIn:Boolean = false;

  constructor(private authGuard: AuthGuardService, private refreshApi : RecommendRefreshService) {
  }

  ngOnInit() {
    this.loadData().then(r => {});
    this.refreshApi.subscribeLoginEvent().subscribe({
      next: (hint: any) => {
        this.loadData().then(r => {});
      }
    });
  }

  async loadData() {
    this.isLoggedIn = await this.authGuard.isLoggedIn();
  }
}
