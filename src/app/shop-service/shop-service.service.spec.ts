import { TestBed, inject } from '@angular/core/testing';

import { ShopServiceService } from './shop-service.service';

describe('ShopServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopServiceService]
    });
  });

  it('should be created', inject([ShopServiceService], (service: ShopServiceService) => {
    expect(service).toBeTruthy();
  }));
});
