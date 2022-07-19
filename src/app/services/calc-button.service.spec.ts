import { TestBed } from '@angular/core/testing';

import { CalcButtonService } from './calc-button.service';

describe('CalcButtonService', () => {
  let service: CalcButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
