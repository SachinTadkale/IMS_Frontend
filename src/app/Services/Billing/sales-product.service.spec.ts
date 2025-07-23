import { TestBed } from '@angular/core/testing';

import { SalesProductService } from './sales-product.service';

describe('SalesProductService', () => {
  let service: SalesProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
