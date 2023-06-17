import {TestBed} from '@angular/core/testing';

import {HomeworkUploadService} from './homework-upload.service';

describe('HomeworkUploadServiceService', () => {
  let service: HomeworkUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeworkUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
