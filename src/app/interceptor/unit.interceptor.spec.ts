import { TestBed } from '@angular/core/testing';

import { UnitInterceptor } from './unit.interceptor';

describe('UnitInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UnitInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UnitInterceptor = TestBed.inject(UnitInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
