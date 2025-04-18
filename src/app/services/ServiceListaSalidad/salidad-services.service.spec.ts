import { TestBed } from '@angular/core/testing';

import { SalidadServicesService } from './salidad-services.service';

describe('SalidadServicesService', () => {
  let service: SalidadServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalidadServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
