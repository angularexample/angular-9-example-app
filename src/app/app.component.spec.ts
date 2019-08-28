import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {MockXxxAlertService} from '@app/xxx-common/xxx-alert/mock-xxx-alert.service';
import {MockXxxErrorHandler} from '@app/xxx-common/xxx-error-handler/mock-xxx-error-handler';
import {MockXxxHeaderModule} from '@app/modules/xxx-header/mock-xxx-header.module';
import {MockXxxLogService} from '@app/xxx-common/xxx-log/mock-xxx-log.service';
import {XxxAlertService} from '@app/xxx-common/xxx-alert/xxx-alert.service';
import {XxxErrorHandler} from '@app/xxx-common/xxx-error-handler/xxx-error-handler.service';
import {XxxHomePageComponent} from '@app/modules/xxx-home-page/mock-xxx-home-page.component';
import {XxxLogService} from '@app/xxx-common/xxx-log/xxx-log.service';
import {XxxMessage} from '@app/xxx-common/xxx-message/xxx-message';
import {XxxMessageService} from '@app/xxx-common/xxx-message/xxx-message.service';
import {XxxPageNotFoundPageComponent} from '@app/modules/xxx-page-not-found-page/mock-xxx-page-not-found-page.component';

class XxxLogEntry {
  constructor(message: string, level: any) {
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let hostDebugElement: DebugElement;
  let router: Router;
  let spyAlertService: jasmine.Spy;
  let spyErrorHandler: jasmine.Spy;
  let spyLogService: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxErrorHandler: XxxErrorHandler;
  let xxxLogService: XxxLogService;
  let xxxMessageService: XxxMessageService;

  // copy the routes from xxx-app-routing.module
  // so we can use the mock components
  const xxxAppRoutes: Routes = [
    {path: '', component: XxxHomePageComponent},
    {path: '**', component: XxxPageNotFoundPageComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        XxxHomePageComponent,
        XxxPageNotFoundPageComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(xxxAppRoutes),
        MockXxxHeaderModule
      ],
      providers: [
        {provide: XxxAlertService, useClass: MockXxxAlertService},
        {provide: XxxErrorHandler, useClass: MockXxxErrorHandler},
        {provide: XxxLogService, useClass: MockXxxLogService},
        XxxMessageService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    xxxAlertService = TestBed.get(XxxAlertService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    xxxErrorHandler = TestBed.get(XxxErrorHandler);
    spyErrorHandler = spyOn(xxxErrorHandler, 'handleError');
    xxxLogService = TestBed.get(XxxLogService);
    spyLogService = spyOn(xxxLogService, 'log');
    xxxMessageService = TestBed.get(XxxMessageService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    hostDebugElement = fixture.debugElement;
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create the app component', () => {
    expect(component).toBeDefined();
  });

  it('should run log service on create app component', () => {
    expect(spyLogService).toHaveBeenCalled();
  });

  it('should run alert service when message broadcasts data error', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    const mockMessage = new XxxMessage('data.responseError');
    mockMessage.payload = {
      alertType: 'error',
      alertMessage: 'error msg'
    };
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertMessage = msg;
      alertType = type;
    });
    xxxMessageService.broadcast(mockMessage);
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe(mockMessage.payload.alertType);
    expect(alertMessage).toBe(mockMessage.payload.alertMessage);
  }));

  it('should create the home component when navigated to that route url', fakeAsync(() => {
    router.navigate(['']);
    tick();
    const targetElement = hostDebugElement.query(By.css('xxx-home'));
    expect(targetElement).toBeDefined();
  }));

  it('should create the page not found component when navigated to that route url', fakeAsync(() => {
    router.navigate(['badpath']);
    tick();
    const targetElement = hostDebugElement.query(By.css('xxx-page-not-found'));
    expect(targetElement).toBeDefined();
  }));
});
