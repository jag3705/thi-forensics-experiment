import {Component, OnInit} from '@angular/core';
import {Task, TaskService} from "../../services/task.service";
import {HomeworkUploadDialogComponent} from "../homework-upload-dialog/homework-upload-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit{

  tasks : Array<Task> = [];
  constructor(private taskApi: TaskService, public dialog: MatDialog) {

  }
  ngOnInit() {
    this.taskApi.getTasks().subscribe((rsp: any) => {
      if (rsp.data != false){

        this.tasks = rsp.data;
      }
    });
  }

  onClickUploadHomework() {
    this.dialog.open(HomeworkUploadDialogComponent);
  }
}
