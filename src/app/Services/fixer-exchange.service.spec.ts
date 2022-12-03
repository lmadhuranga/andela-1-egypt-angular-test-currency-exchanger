import { TestBed } from '@angular/core/testing';

import { FixerExchangeService } from './fixer-exchange.service';

describe('FixerExchangeService', () => {
  let service: FixerExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixerExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
