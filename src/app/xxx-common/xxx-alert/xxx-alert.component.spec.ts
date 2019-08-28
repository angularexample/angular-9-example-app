import {CommonModule} from '@angular/common';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarConfig, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {XxxAlertComponent} from './xxx-alert.component';
import {XxxAlertModule} from './xxx-alert.module';

describe('XxxAlertComponent', () => {
  let alertType: string;
  let component: XxxAlertComponent;
  const duration = 500; // Stay open 1/2 second
  let fixture: ComponentFixture<XxxAlertComponent>;
  let snackbar: MatSnackBar;
  let snackbarConfig: MatSnackBarConfig;
  let snackBarRef: MatSnackBarRef<XxxAlertComponent>;
  let spyDismiss: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        XxxAlertModule
      ],
      providers: [
        MatSnackBar,
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
    snackbar = TestBed.get(MatSnackBar);
    snackbarConfig = new MatSnackBarConfig();
    snackbarConfig.duration = duration;
    snackbarConfig.verticalPosition = 'top';
    snackbarConfig.data = {};
    snackbarConfig.data.message = 'This is a test';
  });

  it('should open from component', () => {
    alertType = 'warn';
    snackbarConfig.data.type = alertType;
    snackBarRef = snackbar.openFromComponent(XxxAlertComponent, snackbarConfig);
    fixture.detectChanges();  // needs this to auto close
    component = snackBarRef.instance;
    expect(component).toBeDefined();
  });

  it('should open and close a snackbar', () => {
    alertType = 'info';
    snackbarConfig.data.type = alertType;
    snackBarRef = snackbar.openFromComponent(XxxAlertComponent, snackbarConfig);
    component = snackBarRef.instance;
    expect(component).toBeDefined();
    spyDismiss = spyOn(component, 'dismiss').and.callThrough();
    component.dismiss();
    fixture.detectChanges();
    expect(spyDismiss).toHaveBeenCalled();
  });
});
