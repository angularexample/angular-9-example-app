import {TestBed} from '@angular/core/testing';

import {XxxLogEntry} from './xxx-log-entry';
import {XxxLogService} from './xxx-log.service';

describe('XxxLogService', () => {
  let spyConsoleLog: jasmine.Spy;
  let xxxLogService: XxxLogService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [XxxLogService]
  }));

  beforeEach(() => {
    xxxLogService = TestBed.get(XxxLogService);
    spyConsoleLog = spyOn(console, 'log');
  });

  it('should be created', () => {
    expect(xxxLogService).toBeDefined();
  });

  it('should after log run console log', () => {
    xxxLogService.log(new XxxLogEntry('test'));
    expect(spyConsoleLog).toHaveBeenCalled();
  });
});
