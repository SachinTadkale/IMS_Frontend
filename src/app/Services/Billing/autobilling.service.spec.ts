import { TestBed } from '@angular/core/testing';

import { AutobillingService } from './autobilling.service';

describe('AutobillingService', () => {
  let service: AutobillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutobillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
