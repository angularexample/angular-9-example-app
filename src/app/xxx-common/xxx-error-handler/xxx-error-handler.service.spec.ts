import {TestBed} from '@angular/core/testing';

import {MockXxxAlertService, MockXxxLogService} from '../test';
import {XxxAlertService, XxxLogService} from '..';
import {XxxErrorHandler} from './xxx-error-handler.service';

class XxxLogEntry {
  constructor(message: string, level: any) {
  }
}

describe('XxxErrorHandler', () => {
  let spyAlertService: jasmine.Spy;
  let spyLogService: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxErrorHandler: XxxErrorHandler;
  let xxxLogService: XxxLogService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: XxxAlertService, useClass: MockXxxAlertService},
      XxxErrorHandler,
      {provide: XxxLogService, useClass: MockXxxLogService}
    ]
  }));

  beforeEach(() => {
    xxxAlertService = TestBed.get(XxxAlertService);
    xxxErrorHandler = TestBed.get(XxxErrorHandler);
    xxxLogService = TestBed.get(XxxLogService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    spyLogService = spyOn(xxxLogService, 'log');
  });

  it('should be created', () => {
    expect(xxxErrorHandler).toBeDefined();
  });

  it('should run XxxLogService on handleError', () => {
    xxxErrorHandler.handleError(new Error('test'));
    expect(spyLogService).toHaveBeenCalled();
  });

  // TODO temporary to handle branch for known angular flex error
  it('should run XxxLogService on handleError with message split', () => {
    xxxErrorHandler.handleError(new Error('split'));
    expect(spyAlertService).not.toHaveBeenCalled();
  });
});
