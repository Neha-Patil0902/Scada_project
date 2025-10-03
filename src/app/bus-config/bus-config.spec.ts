import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusConfig } from './bus-config';

describe('BusConfig', () => {
  let component: BusConfig;
  let fixture: ComponentFixture<BusConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
