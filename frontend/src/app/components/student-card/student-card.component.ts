import {Component, Input, ElementRef, Renderer2, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {Student} from "../../services/student.service";

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements AfterViewInit {
  // @ts-ignore
  @Input() student: Student;

  @ViewChild('bioElement') public viewElement?: ElementRef<HTMLInputElement>;
  public bioElement: any;

  bioHtml: string = '';

  constructor(public renderer: Renderer2) {
  }

  ngAfterViewInit() {
    if (this.student?.bio && this.viewElement) {
      this.bioElement = this.viewElement.nativeElement;
      const fragment = document.createRange().createContextualFragment(this.student?.bio);
      this.bioElement.appendChild(fragment);
    }
  }

}
