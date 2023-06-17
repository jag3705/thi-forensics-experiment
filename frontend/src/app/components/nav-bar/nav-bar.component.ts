import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HomeworkUploadDialogComponent} from "../homework-upload-dialog/homework-upload-dialog.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private authApi: AuthService) {
  }

  ngOnInit() {

  }


  onClickUploadHomework() {
    this.dialog.open(HomeworkUploadDialogComponent);

  }

  onClickLogout(): void {
    this.authApi.setApiToken('');
    this.router.navigate(['login']).then(r => {
    });
  }

}
