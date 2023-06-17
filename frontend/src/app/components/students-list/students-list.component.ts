import {Component, OnInit} from '@angular/core';
import {Student, StudentService} from "../../services/student.service";
import {RecommendRefreshService} from "../../services/recommend-refresh.service";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Array<Student> = [];

  constructor(private studentApi: StudentService, private refreshApi: RecommendRefreshService) {

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
    this.studentApi.getStudents().subscribe((rsp: any) => {
      if (rsp.data != false) {
        this.students = rsp.data;
      }
    });
  }

}
