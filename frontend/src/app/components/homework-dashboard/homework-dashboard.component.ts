import {Component, OnInit} from '@angular/core';
import {HomeworkUploadService, Upload} from "../../services/homework-upload.service";
import {TaskService} from "../../services/task.service";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-homework-dashboard',
  templateUrl: './homework-dashboard.component.html',
  styleUrls: ['./homework-dashboard.component.css']
})
export class HomeworkDashboardComponent implements OnInit {

  myUploads: Array<Upload> = [];
  myGradedUploads: Array<Upload> = [];

  constructor(private uploadApi: HomeworkUploadService, private taskApi: TaskService, private refreshApi: RecommendRefreshService) {
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
    this.uploadApi.getMyUploads().subscribe((rsp: any) => {
      if (rsp.data != false) {

        this.myUploads = rsp.data;

        this.myUploads.forEach((upload: Upload) => {
          this.taskApi.getTask(upload.homework_id).subscribe(
            (rsp: any) => {
              if (rsp.data != false) {
                upload.task = rsp.data[0];
              }
            }
          )
        });

      }
    });
    this.uploadApi.getMyGradedUploads().subscribe((rsp: any) => {
      if (rsp.data != false) {

        this.myGradedUploads = rsp.data;

        this.myGradedUploads.forEach((upload: Upload) => {
          this.taskApi.getTask(upload.homework_id).subscribe(
            (rsp: any) => {
              if (rsp.data != false) {
                upload.task = rsp.data[0];
              }
            }
          )
        });

      }
    });
  }

}
