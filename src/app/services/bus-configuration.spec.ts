import { TestBed } from '@angular/core/testing';

import { BusConfiguration } from './bus-configuration';

describe('BusConfiguration', () => {
  let service: BusConfiguration;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusConfiguration);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
