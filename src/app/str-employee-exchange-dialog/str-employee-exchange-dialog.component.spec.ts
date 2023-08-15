import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrEmployeeExchangeDialogComponent } from './str-employee-exchange-dialog.component';

describe('StrEmployeeExchangeDialogComponent', () => {
  let component: StrEmployeeExchangeDialogComponent;
  let fixture: ComponentFixture<StrEmployeeExchangeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrEmployeeExchangeDialogComponent]
    });
    fixture = TestBed.createComponent(StrEmployeeExchangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
