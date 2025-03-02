import { TestBed } from '@angular/core/testing';

import { ServicespaginadoService } from './servicespaginado.service';

describe('ServicespaginadoService', () => {
  let service: ServicespaginadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicespaginadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
