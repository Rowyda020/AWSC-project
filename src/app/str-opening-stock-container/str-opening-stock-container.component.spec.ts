import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrOpeningStockContainerComponent } from './str-opening-stock-container.component';

describe('StrOpeningStockContainerComponent', () => {
  let component: StrOpeningStockContainerComponent;
  let fixture: ComponentFixture<StrOpeningStockContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrOpeningStockContainerComponent]
    });
    fixture = TestBed.createComponent(StrOpeningStockContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
