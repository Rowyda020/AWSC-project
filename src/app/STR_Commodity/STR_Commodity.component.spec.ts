import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrCommodityComponent } from './STR_Commodity.component';

describe('StrCommodityComponent', () => {
  let component: StrCommodityComponent;
  let fixture: ComponentFixture<StrCommodityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrCommodityComponent]
    });
    fixture = TestBed.createComponent(StrCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
