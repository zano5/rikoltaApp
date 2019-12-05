import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Popover4HelpPage } from './popover4-help.page';

describe('Popover4HelpPage', () => {
  let component: Popover4HelpPage;
  let fixture: ComponentFixture<Popover4HelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popover4HelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popover4HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
