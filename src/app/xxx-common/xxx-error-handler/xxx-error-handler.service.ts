import {ErrorHandler, Injectable} from '@angular/core';

import {XxxAlertService} from '../xxx-alert/xxx-alert.service';
import {XxxAlertType} from '../xxx-alert/xxx-alert.enum';
import {XxxLogEntry} from '../xxx-log/xxx-log-entry';
import {XxxLogService} from '../xxx-log/xxx-log.service';

/**
 * Note: There is no providedIn or providers for this class
 * because it is like a mock service.
 * You must import the XxxErrorHandlerModule at the app module.
 * The XxxErrorHandlerModule injects this service as a mock for the built in Angular ErrorHandler.
 */
@Injectable()
export class XxxErrorHandler implements ErrorHandler {
  constructor(
      private xxxAlertService: XxxAlertService,
      private xxxLogService: XxxLogService) {
  }

  handleError(error: Error) {
    const logEntry: XxxLogEntry = new XxxLogEntry(error.message);
    logEntry.stack = error.stack;
    this.xxxLogService.log(logEntry);
    // TODO temporary don't handle known error from Angular Flex
    if (error.message.includes('split')) {
      return;
    }
    this.xxxAlertService.openAlert(XxxAlertType.ERROR, 'An error occurred. Try again or contact Customer Service.');
  }
}
