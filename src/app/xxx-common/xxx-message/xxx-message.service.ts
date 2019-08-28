import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

import {XxxMessage} from './xxx-message';

type MessageCallback = (payload: any) => void;

@Injectable({providedIn: 'root'})
export class XxxMessageService {
  private handler = new Subject<XxxMessage>();

  broadcast(message: XxxMessage): void {
    this.handler.next({key: message.key, payload: message.payload});
  }

  subscribe(key: string, callback: MessageCallback): Subscription {
    return this.handler.pipe(
        filter(message => message.key === key),
        map(message => message.payload))
        .subscribe(callback);
  }
}
