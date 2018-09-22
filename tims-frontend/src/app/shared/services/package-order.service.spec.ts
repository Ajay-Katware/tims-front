import { TestBed, inject } from '@angular/core/testing';

import { PackageOrderService } from './package-order.service';

describe('PackageOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageOrderService]
    });
  });

  it('should be created', inject([PackageOrderService], (service: PackageOrderService) => {
    expect(service).toBeTruthy();
  }));
});
