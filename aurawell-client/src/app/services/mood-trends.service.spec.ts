import { TestBed } from '@angular/core/testing';

import { MoodTrendsService } from './mood-trends.service';

describe('MoodTrendsService', () => {
  let service: MoodTrendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodTrendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
