import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {MockXxxDataService, MockXxxStateStoreService} from '../test';
import {XxxDataService, XxxMessageService, XxxStateStoreService} from '..';
import {XxxEventRoute} from './xxx-event.interface';
import {XxxEventMgrService} from './xxx-event-mgr.service';

describe('XxxEventMgrService', () => {
  let mockEventConfigs: any;
  let router: Router;
  let spyConsoleLog: jasmine.Spy;
  let spyDataServiceGetData: jasmine.Spy;
  let spyEventMgrHandleEvent: jasmine.Spy;
  let spyMessageServiceBroadcast: jasmine.Spy;
  let spyRouterNavigate: jasmine.Spy;
  let spyStateStoreGetItem: jasmine.Spy;
  let xxxDataService: XxxDataService;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxMessageService: XxxMessageService;
  let xxxStateStoreService: XxxStateStoreService;

  mockEventConfigs = {
    eventConfigs: [
      {
        eventId: 'eventBroadcast',
        eventActions: [
          {
            action: 'broadcast',
            actionKey: 'key-broadcast'
          }
        ]
      },
      {
        eventId: 'eventBroadcastData',
        eventActions: [
          {
            action: 'broadcast',
            actionKey: 'key-broadcast-data',
            actionData: 'test data'
          }
        ]
      },
      {
        eventId: 'eventBroadcastNoActionKey',
        eventActions: [
          {
            action: 'broadcast'
          }
        ]
      },
      {
        eventId: 'eventRoute',
        eventActions: [
          {
            action: 'route',
            actionKey: 'key-route'
          }
        ]
      },
      {
        eventId: 'eventRouteNoActionKey',
        eventActions: [
          {
            action: 'route'
          }
        ]
      },
      {
        eventId: 'eventBroadcastAndRoute',
        eventActions: [
          {
            action: 'broadcast',
            actionKey: 'key-broadcast-2'
          },
          {
            action: 'route',
            actionKey: 'key-route-2'
          }
        ]
      }
    ]
  };

  const mockEventRoute: XxxEventRoute = {
    url: ['mock-url'],
    queryParams: {
      param1: 'value1'
    }
  };

  const mockBadEventRoute: any = 'bad-event-route';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: XxxDataService, useClass: MockXxxDataService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService},
        XxxEventMgrService,
        XxxMessageService
      ]
    });
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    xxxDataService = TestBed.get(XxxDataService);
    xxxMessageService = TestBed.get(XxxMessageService);
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyConsoleLog = spyOn(window.console, 'log');
    spyDataServiceGetData = spyOn(xxxDataService, 'getData').and.callThrough();
    spyMessageServiceBroadcast = spyOn(xxxMessageService, 'broadcast');
    spyRouterNavigate = spyOn(router, 'navigate');
    spyStateStoreGetItem = spyOn(xxxStateStoreService, 'getItem').and.callThrough();
  });

  function createService() {
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrHandleEvent = spyOn(xxxEventMgrService, 'handleEvent').and.callThrough();
  }

  it('should be created', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    createService();
    tick();
    expect(xxxEventMgrService).toBeDefined();
  }));

  it('should run getData with success', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    createService();
    tick();
    expect(spyDataServiceGetData).toHaveBeenCalled();
  }));

  it('should run handleEvent with eventId not found', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('badEventId');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
  }));

  it('should run handleEvent broadcast', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcast');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).toHaveBeenCalled();
    const args = spyMessageServiceBroadcast.calls.mostRecent().args;
    const messageKey = args[0].key;
    expect(messageKey).toBe('key-broadcast');
  }));

  it('should run handleEvent broadcast with no actionKey', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcastNoActionKey');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
  }));

  it('should run handleEvent broadcast with data', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcastData');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).toHaveBeenCalled();
    const args = spyMessageServiceBroadcast.calls.mostRecent().args;
    const messageKey = args[0].key;
    const messagePayload = args[0].payload;
    expect(messageKey).toBe('key-broadcast-data');
    expect(messagePayload).toBe('test data');
  }));

  it('should run handleEvent route', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    spyStateStoreGetItem.and.returnValue(mockEventRoute);
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventRoute');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    const args = spyRouterNavigate.calls.mostRecent().args;
    expect(args[0]).toEqual(['mock-url']);
    expect(args[1]).toEqual({queryParams: {param1: 'value1'}});
  }));

  it('should run handleEvent route with no actionKey', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    spyStateStoreGetItem.and.returnValue(mockEventRoute);
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventRouteNoActionKey');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should run handleEvent route with bad eventUrl', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    spyStateStoreGetItem.and.returnValue(mockBadEventRoute);
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventRoute');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should run handleEvent broadcast and route', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of(mockEventConfigs));
    spyStateStoreGetItem.and.returnValue(mockEventRoute);
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcastAndRoute');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).toHaveBeenCalled();
    let args = spyMessageServiceBroadcast.calls.mostRecent().args;
    const messageKey = args[0].key;
    expect(messageKey).toBe('key-broadcast-2');
    expect(router.navigate).toHaveBeenCalled();
    args = spyRouterNavigate.calls.mostRecent().args;
    expect(args[0]).toEqual(['mock-url']);
    expect(args[1]).toEqual({queryParams: {param1: 'value1'}});
  }));

  it('should run getData with failure', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(throwError('Unknown error'));
    createService();
    tick();
    expect(spyDataServiceGetData).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith('XxxEventMgrService: ERROR in loadData');
  }));

  it('should run handleEvent with no event data failure', fakeAsync(() => {
    spyDataServiceGetData.and.returnValue(of({}));
    createService();
    tick();
    xxxEventMgrService.handleEvent('eventBroadcast');
    expect(spyEventMgrHandleEvent).toHaveBeenCalled();
    expect(spyMessageServiceBroadcast).not.toHaveBeenCalled();
  }));
});
