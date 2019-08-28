import {async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';

import {MockActivatedRouteWithId, mockRouteParamId} from '@app/mocks/angular/mock-activated-route';
import {MockXxxAlertService, MockXxxDataService, MockXxxEventMgrService, MockXxxStateStoreService} from '@app/xxx-common/test';
import {XxxAlertService, XxxDataService, XxxEventMgrService, XxxStateStoreService} from '@app/xxx-common';
import {XxxAnswersPageComponent} from './xxx-answers-page.component';

describe('XxxAnswersPageComponent', () => {
  let component: XxxAnswersPageComponent;
  let fixture: ComponentFixture<XxxAnswersPageComponent>;
  let route: ActivatedRoute;
  let spyAlertService: jasmine.Spy;
  let spyDataService: jasmine.Spy;
  let spyEventMgrService: jasmine.Spy;
  let spyStateStoreGetItem: jasmine.Spy;
  let spyStateStorePutItem: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxDataService: XxxDataService;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxStateStoreService: XxxStateStoreService;

  const mockQuestionData = {
    items: [
      {
        question_id: 'Q123',
        title: 'test title'
      }
    ]
  };

  const mockAnswersData = {
    items: [
      {answer_id: 'A123'}
    ]
  };

  function createComponent() {
    fixture = TestBed.createComponent(XxxAnswersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxAnswersPageComponent],
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRouteWithId},
        {provide: XxxAlertService, useClass: MockXxxAlertService},
        {provide: XxxDataService, useClass: MockXxxDataService},
        {provide: XxxEventMgrService, useClass: MockXxxEventMgrService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    xxxAlertService = TestBed.get(XxxAlertService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    xxxDataService = TestBed.get(XxxDataService);
    spyDataService = spyOn(xxxDataService, 'getData').and.callThrough();
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrService = spyOn(xxxEventMgrService, 'handleEvent');
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyStateStoreGetItem = spyOn(xxxStateStoreService, 'getItem');
    spyStateStorePutItem = spyOn(xxxStateStoreService, 'putItem');
    route = TestBed.get(ActivatedRoute);
  });

  it('should create', fakeAsync(() => {
    createComponent();
    tick();
    tick();
    expect(component).toBeDefined();
  }));

  it('should get the question id from the route url id', fakeAsync(() => {
    createComponent();
    tick();
    tick();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes(mockRouteParamId);
    expect(isUrlCorrect).toBeTruthy();
  }));

  it('should handle missing question id from the route url id', fakeAsync(() => {
    route.params = of({});
    createComponent();
    tick();
    tick();
    expect(spyDataService).not.toHaveBeenCalled();
  }));

  // TODO
  // it('should run get question and get answers with success', fakeAsync(() => {
  //   spyDataService.and.callFake((url: string) => {
  //     if (url.includes('answers')) {
  //       return of(mockAnswersData);
  //     } else {
  //       return of(mockQuestionData);
  //     }
  //   });
  //   createComponent();
  //   tick();
  //   tick();
  //   expect(component.isResult).toBeTruthy();
  //   expect(component.isError).toBeFalsy();
  //   expect(component.isBusy).toBeFalsy();
  // }));

  it('should run alert service with warning when question is empty', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    spyDataService.and.returnValue(of({}));
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertType = type;
      alertMessage = msg;
    });
    createComponent();
    tick();
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe('warn');
    expect(alertMessage).toBe('Given Question Id Not Found');
  }));

  it('should run alert service with warning when answers are empty', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    spyDataService.and.callFake((url: string) => {
      if (url.includes('answers')) {
        return of({});
      } else {
        return of(mockQuestionData);
      }
    });
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertType = type;
      alertMessage = msg;
    });
    createComponent();
    tick();
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe('warn');
    expect(alertMessage).toBe('No Answers Found For Given Question Id');
  }));

  it('should set flags when get question data throws error', fakeAsync(() => {
    spyDataService.and.callFake(() => {
      return throwError({status: 404});
    });
    createComponent();
    tick();
    tick();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should set flags when get answers data throws error', fakeAsync(() => {
    spyDataService.and.callFake((url: string) => {
      if (url.includes('answers')) {
        return throwError({status: 404});
      } else {
        return of(mockAnswersData);
      }
    });
    createComponent();
    tick();
    tick();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should decode html entities', fakeAsync(() => {
    let result: string;
    createComponent();
    tick();
    tick();
    result = component.decodeHtmlEntities('&#62;');
    expect(result).toBe('>');
  }));

  it('should decode html entities on empty text', fakeAsync(() => {
    let result: string;
    createComponent();
    tick();
    tick();
    result = component.decodeHtmlEntities('');
    expect(result).toBe('');
  }));

  it('should run onClickBackToQuestions', fakeAsync(() => {
    createComponent();
    tick();
    tick();
    component.onClickBackToQuestions();
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeQuestions');
  }));

  it('should run checkForQuestions on create with no value', fakeAsync(() => {
    createComponent();
    tick();
    tick();
    expect(spyStateStoreGetItem).toHaveBeenCalled();
    const stateKey = spyStateStoreGetItem.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    expect(component.isQuestions).toBeFalsy();
  }));

  it('should run checkForQuestions on create with value', fakeAsync(() => {
    spyStateStoreGetItem.and.returnValue('x');
    createComponent();
    tick();
    tick();
    expect(spyStateStoreGetItem).toHaveBeenCalled();
    const stateKey = spyStateStoreGetItem.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    expect(component.isQuestions).toBeTruthy();
  }));
});
