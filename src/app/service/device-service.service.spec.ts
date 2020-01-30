/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceServiceService } from './device-service.service';

describe('Service: DeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceServiceService]
    });
  });

  it('should ...', inject([DeviceServiceService], (service: DeviceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
