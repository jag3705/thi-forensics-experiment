import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Task, TaskService} from "../../services/task.service";
import {HomeworkUploadService} from "../../services/homework-upload.service";
import {Router} from "@angular/router";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-homework-upload-dialog',
  templateUrl: './homework-upload-dialog.component.html',
  styleUrls: ['./homework-upload-dialog.component.css']
})
export class HomeworkUploadDialogComponent implements OnInit {
  message: string = '';
  tasks: Array<Task> = [];
  public result: any;
  selectedFile?: File;
  fileAttr = 'Choose Tar or Zip from Disk';
  form: FormGroup = new FormGroup({});

  uploadHomeworkForm = this.formBuilder.group({
    homework: [''],
    notes: [''],
    homework_id: [''],
  });


  constructor(private router: Router, public dialogRef: MatDialogRef<HomeworkUploadDialogComponent>,
              private formBuilder: FormBuilder, private taskApi: TaskService, private uploadApi: HomeworkUploadService, private refreshApi: RecommendRefreshService) {
  }

  ngOnInit() {
    this.taskApi.getTasks().subscribe((rsp: any) => {
      if (rsp.data != false) {

        this.tasks = rsp.data;
      }
    });
  }

  uploadFileEvt(file: any) {
    if (file.target.files[0]) {
      this.selectedFile = file.target.files[0];
      if (this.selectedFile?.name) {
        this.fileAttr = this.selectedFile?.name;
      }
    }
  }

  public onClickSubmit(): void {

    let submitFormData = new FormData();
    const formData = this.uploadHomeworkForm.value;

    if (this.uploadHomeworkForm.value.homework_id) {
      submitFormData.append("homework_id", this.uploadHomeworkForm.value.homework_id);
    }
    if (this.uploadHomeworkForm.value.notes) {
      submitFormData.append("notes", this.uploadHomeworkForm.value.notes);
    }
    if (this.uploadHomeworkForm.value.homework && this.selectedFile) {
      submitFormData.append("homework", this.selectedFile);
    }


    this.uploadApi.uploadHomework(submitFormData).subscribe({
      next: (rsp: any) => {
        if (rsp.data != false) {
          this.refreshApi.recommendRefresh(rsp.data);
          this.dialogRef.close(this.result);
          this.router.navigate(['uploads'])
        }
      },
      error: (err) => {
        console.log(err)
        if (err.error?.message) {
          this.message = err.error?.message;
        } else {
          if (err.error?.data?.error) {
            this.message = err.error?.data?.error;
          } else {
            if (err.message) {
              this.message = err.message;
            }
          }
        }
      },
      complete: () => {
      }
    });


  }

}
