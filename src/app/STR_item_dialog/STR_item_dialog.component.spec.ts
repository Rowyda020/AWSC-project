import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrItemDialogComponent } from './STR_item_dialog.component';

describe('StrItemDialogComponent', () => {
  let component: StrItemDialogComponent;
  let fixture: ComponentFixture<StrItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrItemDialogComponent]
    });
    fixture = TestBed.createComponent(StrItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
