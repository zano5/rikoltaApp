import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhomePage } from './newhome.page';

describe('NewhomePage', () => {
  let component: NewhomePage;
  let fixture: ComponentFixture<NewhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewhomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
