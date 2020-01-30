import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartLiveComponent } from './line-chart-live.component';

describe('LineChartLiveComponent', () => {
  let component: LineChartLiveComponent;
  let fixture: ComponentFixture<LineChartLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
