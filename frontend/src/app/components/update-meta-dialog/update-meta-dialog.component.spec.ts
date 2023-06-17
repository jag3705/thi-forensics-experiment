import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMetaDialogComponent } from './update-meta-dialog.component';

describe('UpdateMetaDialogComponent', () => {
  let component: UpdateMetaDialogComponent;
  let fixture: ComponentFixture<UpdateMetaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMetaDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateMetaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
