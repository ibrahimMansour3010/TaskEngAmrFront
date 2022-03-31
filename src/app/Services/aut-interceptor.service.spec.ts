import { TestBed } from '@angular/core/testing';

import { AutInterceptorService } from './aut-interceptor.service';

describe('AutInterceptorService', () => {
  let service: AutInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
