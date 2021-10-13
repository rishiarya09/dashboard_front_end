import { TestBed, inject } from '@angular/core/testing';

import { EnqueryServiceService } from './enquery-service.service';

describe('EnqueryServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnqueryServiceService]
    });
  });

  it('should be created', inject([EnqueryServiceService], (service: EnqueryServiceService) => {
    expect(service).toBeTruthy();
  }));
});
