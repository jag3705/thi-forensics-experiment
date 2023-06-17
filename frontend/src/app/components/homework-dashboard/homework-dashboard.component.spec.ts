import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkDashboardComponent } from './homework-dashboard.component';

describe('HomeworkDashboardComponent', () => {
  let component: HomeworkDashboardComponent;
  let fixture: ComponentFixture<HomeworkDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeworkDashboardComponent]
    });
    fixture = TestBed.createComponent(HomeworkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
