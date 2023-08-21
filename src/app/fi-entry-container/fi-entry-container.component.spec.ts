import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiEntryContainerComponent } from './fi-entry-container.component';

describe('FiEntryContainerComponent', () => {
  let component: FiEntryContainerComponent;
  let fixture: ComponentFixture<FiEntryContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiEntryContainerComponent]
    });
    fixture = TestBed.createComponent(FiEntryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
