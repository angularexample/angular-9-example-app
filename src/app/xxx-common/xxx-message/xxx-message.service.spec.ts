import {TestBed} from '@angular/core/testing';
import {Subscription} from 'rxjs';

import {XxxMessage} from './xxx-message';
import {XxxMessageService} from './xxx-message.service';

describe('XxxMessageService', () => {
  let xxxMessageService: XxxMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XxxMessageService]
    });
    xxxMessageService = TestBed.get(XxxMessageService);
  });

  it('should be created', () => {
    expect(xxxMessageService).toBeTruthy();
  });

  it('should be subscribed fires callback on broadcast', () => {
    let isCalled = false;
    const subscription: Subscription = xxxMessageService.subscribe('test-key', () => {
      isCalled = true;
    });
    xxxMessageService.broadcast(new XxxMessage('test-key'));
    expect(isCalled).toBeTruthy();
    subscription.unsubscribe();
  });
});
