import { TestBed } from '@angular/core/testing';

import { SalidadServiceService } from './salidad-service.service';

describe('SalidadServiceService', () => {
  let service: SalidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
