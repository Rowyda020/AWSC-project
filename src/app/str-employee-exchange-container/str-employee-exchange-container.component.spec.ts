import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrEmployeeExchangeContainerComponent } from './str-employee-exchange-container.component';

describe('StrEmployeeExchangeContainerComponent', () => {
  let component: StrEmployeeExchangeContainerComponent;
  let fixture: ComponentFixture<StrEmployeeExchangeContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrEmployeeExchangeContainerComponent]
    });
    fixture = TestBed.createComponent(StrEmployeeExchangeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
