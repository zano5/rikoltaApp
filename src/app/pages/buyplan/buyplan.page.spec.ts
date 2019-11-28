import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyplanPage } from './buyplan.page';

describe('BuyplanPage', () => {
  let component: BuyplanPage;
  let fixture: ComponentFixture<BuyplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
