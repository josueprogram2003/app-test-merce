import { TestBed } from '@angular/core/testing';

import { StateTableService } from './state-table.service';

describe('StateTableService', () => {
  let service: StateTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
