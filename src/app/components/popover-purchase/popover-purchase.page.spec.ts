import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverPurchasePage } from './popover-purchase.page';

describe('PopoverPurchasePage', () => {
  let component: PopoverPurchasePage;
  let fixture: ComponentFixture<PopoverPurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverPurchasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
