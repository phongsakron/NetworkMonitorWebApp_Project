/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggingServiceService } from './loggingService.service';

describe('Service: LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingServiceService]
    });
  });

  it('should ...', inject([LoggingServiceService], (service: LoggingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
