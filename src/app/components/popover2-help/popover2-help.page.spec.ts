import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Popover2HelpPage } from './popover2-help.page';

describe('Popover2HelpPage', () => {
  let component: Popover2HelpPage;
  let fixture: ComponentFixture<Popover2HelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Popover2HelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Popover2HelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
