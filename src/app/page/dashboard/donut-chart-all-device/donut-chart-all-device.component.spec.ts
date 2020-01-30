import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartAllDeviceComponent } from './donut-chart-all-device.component';

describe('DonutChartAllDeviceComponent', () => {
  let component: DonutChartAllDeviceComponent;
  let fixture: ComponentFixture<DonutChartAllDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartAllDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartAllDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
