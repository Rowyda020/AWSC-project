import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrCommodityDialogComponent } from './str-commodity-dialog.component';

describe('StrCommodityDialogComponent', () => {
  let component: StrCommodityDialogComponent;
  let fixture: ComponentFixture<StrCommodityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrCommodityDialogComponent]
    });
    fixture = TestBed.createComponent(StrCommodityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
