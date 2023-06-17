import {Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import {Profile, ProfileService} from "../../services/profile.service";
import {MatDialog} from "@angular/material/dialog";
import {AvatarUploadDialogComponent} from "../avatar-upload-dialog/avatar-upload-dialog.component";
import {UpdateMetaDialogComponent} from "../update-meta-dialog/update-meta-dialog.component";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild('bioElement') public viewElement?: ElementRef;
  public bioElement: any;

  me?: Profile;
  bioHtml: string = '';

  constructor(public renderer: Renderer2, private profileApi: ProfileService, public dialog: MatDialog, private refreshApi: RecommendRefreshService) {
  }

  ngOnInit() {
    this.loadData();
    this.refreshApi.subscribeReloadRecommendedEvent().subscribe({
      next: (hint: any) => {
        this.loadData();
      }
    });

  }

  private loadData(): void {
    this.profileApi.getProfile().subscribe({
      next: (rsp: any) => {
        if (rsp.data != false) {
          this.me = rsp.data[0];
          if (this.me?.bio && this.viewElement) {
            this.bioElement = this.viewElement.nativeElement;
            const fragment = document.createRange().createContextualFragment(this.me?.bio);
            this.bioElement.appendChild(fragment);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      }
    });
  }

  onClickShowAvatarUploadDialog() {
    this.dialog.open(AvatarUploadDialogComponent);
  }

  onClickShowChangeMetaDialog() {
    this.dialog.open(UpdateMetaDialogComponent);
  }

}
