import {Injectable} from '@angular/core';

import {XxxLogEntry} from './xxx-log-entry';

/**
 * In full scale app, this service will use the data service to write log entries to backend.
 * It is given here as a placeholder.
 * Note: no module is used, since the provider is done here.
 */
@Injectable({providedIn: 'root'})
export class XxxLogService {
  log(logEntry: XxxLogEntry) {
    // TODO needs backend service to do logging
    console.log('logEntry', logEntry);
  }
}
