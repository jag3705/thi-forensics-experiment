import { TestBed } from '@angular/core/testing';

import { RecommendRefreshService } from './recommend-refresh.service';

describe('RecommendRefreshService', () => {
  let service: RecommendRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
