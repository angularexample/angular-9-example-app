import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

import {XxxAlertComponent} from './xxx-alert.component';
import {XxxAlertService} from './xxx-alert.service';

describe('XxxAlertService', () => {
  let alertType: string;
  let component: XxxAlertComponent;
  let fixture: ComponentFixture<XxxAlertComponent>;
  const message = 'This is a test';
  let snackBar: MatSnackBar;
  let snackBarRef: MatSnackBarRef<XxxAlertComponent>;
  let spyOpenAlert: jasmine.Spy;
  let xxxAlertService: XxxAlertService;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [XxxAlertComponent]
      }
    });
    TestBed.configureTestingModule({
      declarations: [XxxAlertComponent],
      imports: [
        CommonModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        MatSnackBar,
        XxxAlertService,
        {
          provide: MatSnackBarRef,
          useValue: {}
        }, {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {}
        }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XxxAlertComponent);
    snackBar = TestBed.get(MatSnackBar);
    xxxAlertService = TestBed.get(XxxAlertService);
    spyOpenAlert = spyOn(xxxAlertService, 'openAlert').and.callThrough();
  });

  afterEach(() => {
    if (snackBarRef) {
      snackBarRef.dismiss();
    }
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(xxxAlertService).toBeDefined();
  });

  it('should run openAlert', () => {
    alertType = 'info';
    snackBarRef = xxxAlertService.openAlert(alertType, message);
    expect(spyOpenAlert).toHaveBeenCalled();
  });

  it('should not open second alert while first one is still open', () => {
    alertType = 'info';
    snackBarRef = xxxAlertService.openAlert(alertType, message);
    const snackBarRef2 = xxxAlertService.openAlert(alertType, 'This ia alert 2');
    expect(snackBarRef2).toBe(null);
  });

  it('should set component alert type for info', () => {
    alertType = 'info';
    snackBarRef = xxxAlertService.openAlert(alertType, message);
    component = snackBarRef.instance;
    expect(component.alertType).toBe('info');
  });

  it('should set component alert type for error', () => {
    alertType = 'error';
    snackBarRef = xxxAlertService.openAlert(alertType, message);
    component = snackBarRef.instance;
    expect(component.alertType).toBe('error');
  });

  it('should set component alert type for warn', () => {
    alertType = 'warn';
    snackBarRef = xxxAlertService.openAlert(alertType, message);
    component = snackBarRef.instance;
    expect(component.alertType).toBe('warn');
  });
});
