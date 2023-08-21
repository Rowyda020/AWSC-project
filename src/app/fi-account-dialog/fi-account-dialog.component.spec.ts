import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FIAccountDialogComponent } from './fi-account-dialog.component';

describe('FIAccountDialogComponent', () => {
  let component: FIAccountDialogComponent;
  let fixture: ComponentFixture<FIAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FIAccountDialogComponent]
    });
    fixture = TestBed.createComponent(FIAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
