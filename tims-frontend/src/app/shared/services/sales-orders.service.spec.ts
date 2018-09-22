import { TestBed, inject } from '@angular/core/testing';

import { SalesOrdersService } from './sales-orders.service';

describe('SalesOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesOrdersService]
    });
  });

  it('should be created', inject([SalesOrdersService], (service: SalesOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
