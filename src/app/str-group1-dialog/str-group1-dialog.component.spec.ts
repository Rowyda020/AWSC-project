import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STRGroup1DialogComponent } from './str-group1-dialog.component';

describe('STRGroup1DialogComponent', () => {
  let component: STRGroup1DialogComponent;
  let fixture: ComponentFixture<STRGroup1DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [STRGroup1DialogComponent]
    });
    fixture = TestBed.createComponent(STRGroup1DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
