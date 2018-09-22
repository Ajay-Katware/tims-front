import { TestBed, inject } from '@angular/core/testing';

import { ProductItemService } from './product-item.service';

describe('ProductItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductItemService]
    });
  });

  it('should be created', inject([ProductItemService], (service: ProductItemService) => {
    expect(service).toBeTruthy();
  }));
});
