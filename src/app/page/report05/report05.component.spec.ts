import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report05Component } from './report05.component';

describe('Report05Component', () => {
  let component: Report05Component;
  let fixture: ComponentFixture<Report05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
