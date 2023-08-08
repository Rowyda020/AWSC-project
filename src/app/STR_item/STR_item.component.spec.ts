import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrItemComponent } from './STR_item..component';

describe('StrItemComponent', () => {
  let component: StrItemComponent;
  let fixture: ComponentFixture<StrItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrItemComponent]
    });
    fixture = TestBed.createComponent(StrItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
