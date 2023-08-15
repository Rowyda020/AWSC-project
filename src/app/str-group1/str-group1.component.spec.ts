import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STRGroup1Component } from './str-group1.component';

describe('STRGroup1Component', () => {
  let component: STRGroup1Component;
  let fixture: ComponentFixture<STRGroup1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [STRGroup1Component]
    });
    fixture = TestBed.createComponent(STRGroup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
