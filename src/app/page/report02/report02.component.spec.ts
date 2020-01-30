import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Report02Component } from './report02.component';

describe('Report02Component', () => {
  let component: Report02Component;
  let fixture: ComponentFixture<Report02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Report02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Report02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
