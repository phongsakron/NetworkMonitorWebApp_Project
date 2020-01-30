import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDownDeviceComponent } from './live-down-device.component';

describe('LiveDownDeviceComponent', () => {
  let component: LiveDownDeviceComponent;
  let fixture: ComponentFixture<LiveDownDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDownDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDownDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
