import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFormPage } from './trip-form.page';

describe('TripFormPage', () => {
  let component: TripFormPage;
  let fixture: ComponentFixture<TripFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
