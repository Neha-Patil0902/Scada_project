import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPolicy } from './display-policy';

describe('DisplayPolicy', () => {
  let component: DisplayPolicy;
  let fixture: ComponentFixture<DisplayPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
