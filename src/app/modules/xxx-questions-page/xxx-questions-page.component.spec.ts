import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of, throwError} from 'rxjs';

import {environment} from '@env/environment';
import {MockActivatedRouteWithQueryParms, mockQueryParamPage, mockQueryParamTitle} from '@app/mocks/angular/mock-activated-route';
import {MockXxxAlertService, MockXxxDataService, MockXxxEventMgrService, MockXxxStateStoreService} from '@app/xxx-common/test';
import {XxxAlertService, XxxAlertType, XxxDataService, XxxEventMgrService, XxxEventRoute, XxxStateStoreService} from '@app/xxx-common';
import {XxxQuestionsPageComponent} from './xxx-questions-page.component';

describe('XxxQuestionsPageComponent', () => {
  let component: XxxQuestionsPageComponent;
  let fixture: ComponentFixture<XxxQuestionsPageComponent>;
  let route: ActivatedRoute;
  let spyAlertService: jasmine.Spy;
  let spyDataService: jasmine.Spy;
  let spyEventMgrService: jasmine.Spy;
  let spyStateStorePut: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxDataService: XxxDataService;
  let xxxEventMgrService: XxxEventMgrService;
  let xxxStateStoreService: XxxStateStoreService;

  const mockQuestionData = {
    items: [
      {
        question_id: 'Q123'
      }
    ],
    has_more: true
  };

  const mockQueryParamsNoChange = [
    {
      title: 'title1',
      page: '2'
    },
    {
      title: 'title1',
      page: '2'
    }
  ];

  const mockQueryParamsTitleChange = [
    {
      title: 'title1',
      page: '2'
    },
    {
      title: 'title2',
      page: '2'
    }
  ];

  const mockQueryParamsPageChange = [
    {
      title: 'title1',
      page: '2'
    },
    {
      title: 'title1',
      page: '3'
    }
  ];

  function mockMultipleRouteExecution(mockQueryParams: any[]): Observable<any> {
    return new Observable<any>(observer => {
      mockQueryParams.forEach((param) => {
        observer.next(param);
      });
    });
  }

  function createComponent() {
    fixture = TestBed.createComponent(XxxQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [XxxQuestionsPageComponent],
      imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRouteWithQueryParms},
        {provide: XxxAlertService, useClass: MockXxxAlertService},
        {provide: XxxDataService, useClass: MockXxxDataService},
        {provide: XxxEventMgrService, useClass: MockXxxEventMgrService},
        {provide: XxxStateStoreService, useClass: MockXxxStateStoreService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    xxxAlertService = TestBed.get(XxxAlertService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    xxxDataService = TestBed.get(XxxDataService);
    spyDataService = spyOn(xxxDataService, 'getData').and.returnValue(of(mockQuestionData));
    xxxEventMgrService = TestBed.get(XxxEventMgrService);
    spyEventMgrService = spyOn(xxxEventMgrService, 'handleEvent');
    xxxStateStoreService = TestBed.get(XxxStateStoreService);
    spyStateStorePut = spyOn(xxxStateStoreService, 'putItem');
  });

  it('should create', fakeAsync(() => {
    createComponent();
    tick();
    expect(component).toBeDefined();
  }));

  it('should get the title for search text from the route query param', fakeAsync(() => {
    createComponent();
    tick();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes('title=' + mockQueryParamTitle);
    expect(isUrlCorrect).toBeTruthy();
  }));

  it('should handle missing title for search text from the route query param', fakeAsync(() => {
    route.queryParams = of({
      page: mockQueryParamPage
    });
    createComponent();
    tick();
    expect(spyDataService).not.toHaveBeenCalled();
  }));

  it('should get the page number from the route query param', fakeAsync(() => {
    createComponent();
    tick();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes('page=' + mockQueryParamPage);
    expect(isUrlCorrect).toBeTruthy();
  }));

  it('should handle missing page number from the route query param', fakeAsync(() => {
    route.queryParams = of({
      title: mockQueryParamTitle
    });
    createComponent();
    tick();
    expect(spyDataService).toHaveBeenCalled();
    const url: string = spyDataService.calls.mostRecent().args[0];
    const isUrlCorrect = url.includes('page=1');
    expect(isUrlCorrect).toBeTruthy();
  }));

  it('should run goToFirstPage', fakeAsync(() => {
    createComponent();
    tick();
    component.goToFirstPage();
    tick();
    expect(spyStateStorePut).toHaveBeenCalled();
    const stateKey: string = spyStateStorePut.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    const expectedEventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: mockQueryParamTitle
      }
    };
    const eventRoute: XxxEventRoute = spyStateStorePut.calls.mostRecent().args[1];
    expect(eventRoute).toEqual(expectedEventRoute);
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeQuestions');
  }));

  it('should run goToNextPage', fakeAsync(() => {
    createComponent();
    tick();
    component.goToNextPage();
    tick();
    expect(spyStateStorePut).toHaveBeenCalled();
    const stateKey: string = spyStateStorePut.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    const expectedEventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: mockQueryParamTitle,
        page: +mockQueryParamPage + 1
      }
    };
    const eventRoute: XxxEventRoute = spyStateStorePut.calls.mostRecent().args[1];
    expect(eventRoute).toEqual(expectedEventRoute);
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeQuestions');
  }));

  it('should run goToPreviousPage', fakeAsync(() => {
    createComponent();
    tick();
    component.goToPreviousPage();
    tick();
    expect(spyStateStorePut).toHaveBeenCalled();
    const stateKey: string = spyStateStorePut.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    const expectedEventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: mockQueryParamTitle,
        page: +mockQueryParamPage - 1
      }
    };
    const eventRoute: XxxEventRoute = spyStateStorePut.calls.mostRecent().args[1];
    expect(eventRoute).toEqual(expectedEventRoute);
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeQuestions');
  }));

  it('should handle page number not > 2 during go to previous page', fakeAsync(() => {
    route.queryParams = of({
      title: mockQueryParamTitle,
      page: 2
    });
    createComponent();
    tick();
    component.goToPreviousPage();
    tick();
    expect(spyStateStorePut).toHaveBeenCalled();
    const stateKey: string = spyStateStorePut.calls.mostRecent().args[0];
    expect(stateKey).toEqual('questionsRoute');
    const expectedEventRoute: XxxEventRoute = {
      url: [environment.url.questions],
      queryParams: {
        title: mockQueryParamTitle,
        page: null
      }
    };
    const eventRoute: XxxEventRoute = spyStateStorePut.calls.mostRecent().args[1];
    expect(eventRoute).toEqual(expectedEventRoute);
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeQuestions');
  }));

  it('should handle success on get questions not empty', fakeAsync(() => {
    createComponent();
    tick();
    component.goToNextPage();
    tick();
    expect(component.isResult).toBeTruthy();
    expect(component.isError).toBeFalsy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should run alert service with warning when questions are empty', fakeAsync(() => {
    let alertType: string;
    spyDataService.and.returnValue(of({}));
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertType = type;
    });
    createComponent();
    tick();
    component.goToNextPage();
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe(XxxAlertType.WARN);
  }));

  it('should set flags when questions data throws error', fakeAsync(() => {
    spyDataService.and.returnValue(throwError({status: 404}));
    createComponent();
    tick();
    component.goToNextPage();
    tick();
    expect(component.isError).toBeTruthy();
    expect(component.isBusy).toBeFalsy();
  }));

  it('should decode html entities', fakeAsync(() => {
    createComponent();
    tick();
    const result = component.decodeHtmlEntities('&#62;');
    expect(result).toBe('>');
  }));

  it('should decode html entities on empty text', fakeAsync(() => {
    let result: string;
    createComponent();
    tick();
    result = component.decodeHtmlEntities('');
    expect(result).toBe('');
  }));

  it('should run questionOnClick', fakeAsync(() => {
    createComponent();
    tick();
    component.questionOnClick('test-question-id');
    tick();
    expect(spyStateStorePut).toHaveBeenCalled();
    const routeKey: string = spyStateStorePut.calls.all()[0].args[0];
    expect(routeKey).toEqual('answersRoute');
    const eventRoute: XxxEventRoute = spyStateStorePut.calls.mostRecent().args[1];
    const url = eventRoute.url[0];
    expect(url).toEqual(environment.url.answers + '/test-question-id');
    expect(spyEventMgrService).toHaveBeenCalled();
    const eventId = spyEventMgrService.calls.mostRecent().args[0];
    expect(eventId).toEqual('routeAnswers');
  }));

  it('should handle multiple routes with no change', fakeAsync(() => {
    route.queryParams = mockMultipleRouteExecution(mockQueryParamsNoChange);
    createComponent();
    tick();
    expect(spyDataService.calls.count()).toEqual(1);
  }));

  it('should handle multiple routes with title change', fakeAsync(() => {
    route.queryParams = mockMultipleRouteExecution(mockQueryParamsTitleChange);
    createComponent();
    tick();
    expect(spyDataService.calls.count()).toEqual(2);
  }));

  it('should handle multiple routes with page change', fakeAsync(() => {
    route.queryParams = mockMultipleRouteExecution(mockQueryParamsPageChange);
    createComponent();
    tick();
    expect(spyDataService.calls.count()).toEqual(2);
  }));
});
