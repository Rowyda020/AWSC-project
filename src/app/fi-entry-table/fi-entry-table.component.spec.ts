import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiEntryTableComponent } from './fi-entry-table.component';

describe('FiEntryTableComponent', () => {
  let component: FiEntryTableComponent;
  let fixture: ComponentFixture<FiEntryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiEntryTableComponent]
    });
    fixture = TestBed.createComponent(FiEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
