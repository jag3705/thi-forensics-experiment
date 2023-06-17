import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkUploadDialogComponent } from './homework-upload-dialog.component';

describe('HomeworkUploadDialogComponent', () => {
  let component: HomeworkUploadDialogComponent;
  let fixture: ComponentFixture<HomeworkUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeworkUploadDialogComponent]
    });
    fixture = TestBed.createComponent(HomeworkUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
