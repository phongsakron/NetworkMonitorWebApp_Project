import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeviceComponent } from './all-device.component';

describe('AllDeviceComponent', () => {
  let component: AllDeviceComponent;
  let fixture: ComponentFixture<AllDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
