import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report04Component } from './report04.component';

describe('Report04Component', () => {
  let component: Report04Component;
  let fixture: ComponentFixture<Report04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
