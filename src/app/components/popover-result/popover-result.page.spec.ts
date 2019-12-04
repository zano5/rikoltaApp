import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverResultPage } from './popover-result.page';

describe('PopoverResultPage', () => {
  let component: PopoverResultPage;
  let fixture: ComponentFixture<PopoverResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
