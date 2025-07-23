import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authgardGuard } from './authgard.guard';

describe('authgardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authgardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
