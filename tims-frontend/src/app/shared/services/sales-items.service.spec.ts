import { TestBed, inject } from '@angular/core/testing';

import { SalesItemsService } from './sales-items.service';

describe('SalesItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesItemsService]
    });
  });

  it('should be created', inject([SalesItemsService], (service: SalesItemsService) => {
    expect(service).toBeTruthy();
  }));
});
