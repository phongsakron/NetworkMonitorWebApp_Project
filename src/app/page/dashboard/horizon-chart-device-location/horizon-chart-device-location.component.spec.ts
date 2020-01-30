import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonChartDeviceLocationComponent } from './horizon-chart-device-location.component';

describe('HorizonChartDeviceLocationComponent', () => {
  let component: HorizonChartDeviceLocationComponent;
  let fixture: ComponentFixture<HorizonChartDeviceLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonChartDeviceLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonChartDeviceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
