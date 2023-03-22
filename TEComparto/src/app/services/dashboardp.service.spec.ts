import { TestBed } from '@angular/core/testing';

import { DashboardpService } from './dashboardp.service';

describe('DashboardpService', () => {
  let service: DashboardpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
