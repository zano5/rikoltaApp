import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Popover3HelpPage } from './popover3-help.page';

describe('Popover3HelpPage', () => {
  let component: Popover3HelpPage;
  let fixture: ComponentFixture<Popover3HelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popover3HelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popover3HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
