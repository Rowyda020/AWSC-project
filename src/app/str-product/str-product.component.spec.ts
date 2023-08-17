import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrProductComponent } from './str-product.component';

describe('StrProductComponent', () => {
  let component: StrProductComponent;
  let fixture: ComponentFixture<StrProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrProductComponent]
    });
    fixture = TestBed.createComponent(StrProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
