import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Popover1HelpPage } from './popover1-help.page';

describe('Popover1HelpPage', () => {
  let component: Popover1HelpPage;
  let fixture: ComponentFixture<Popover1HelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popover1HelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popover1HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
