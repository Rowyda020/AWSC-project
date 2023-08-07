import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrCostcenterDialogComponent } from './str-costcenter-dialog.component';

describe('StrCostcenterDialogComponent', () => {
  let component: StrCostcenterDialogComponent;
  let fixture: ComponentFixture<StrCostcenterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrCostcenterDialogComponent]
    });
    fixture = TestBed.createComponent(StrCostcenterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
