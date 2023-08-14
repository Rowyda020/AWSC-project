import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrEmployeeExchangeTableComponent } from './str-employee-exchange-table.component';

describe('StrEmployeeExchangeTableComponent', () => {
  let component: StrEmployeeExchangeTableComponent;
  let fixture: ComponentFixture<StrEmployeeExchangeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrEmployeeExchangeTableComponent]
    });
    fixture = TestBed.createComponent(StrEmployeeExchangeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
