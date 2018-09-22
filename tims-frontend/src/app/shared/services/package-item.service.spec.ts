import { TestBed, inject } from '@angular/core/testing';

import { PackageItemService } from './package-item.service';

describe('PackageItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageItemService]
    });
  });

  it('should be created', inject([PackageItemService], (service: PackageItemService) => {
    expect(service).toBeTruthy();
  }));
});
