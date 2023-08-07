import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrGroupHomeComponent } from './str-group-home.component';

describe('StrGroupHomeComponent', () => {
  let component: StrGroupHomeComponent;
  let fixture: ComponentFixture<StrGroupHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrGroupHomeComponent]
    });
    fixture = TestBed.createComponent(StrGroupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
