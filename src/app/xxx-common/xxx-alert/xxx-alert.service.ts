import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';

import {XxxAlertComponent} from './xxx-alert.component';
import {XxxAlertType} from './xxx-alert.enum';

@Injectable({providedIn: 'root'})
export class XxxAlertService {
  private config: MatSnackBarConfig;
  private isOpen = false;
  private snackBarRef: MatSnackBarRef<XxxAlertComponent>;

  constructor(private snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.duration = 10000; // Stay open 10 seconds
    this.config.verticalPosition = 'top';
    this.config.data = {};
  }

  openAlert(type: string, message: string): MatSnackBarRef<XxxAlertComponent> {
    // Ignore any attempt to open while it is already open.
    if (this.isOpen) {
      return null;
    }
    this.config.data.message = message;
    this.config.data.type = type;
    this.setClassByType(type);
    this.snackBarRef = this.snackBar.openFromComponent(XxxAlertComponent, this.config);
    this.isOpen = true;
    this.snackBarRef.afterDismissed().subscribe(() => {
      this.isOpen = false;
    });
    return this.snackBarRef;
  }

  // The type is used for different style colors and template icons
  private setClassByType(type: string) {
    switch (type) {
      case XxxAlertType.ERROR:
        this.config.panelClass = ['xxx-alert', 'xxx-alert-error'];
        break;
      case XxxAlertType.INFO:
        this.config.panelClass = ['xxx-alert', 'xxx-alert-info'];
        break;
      case XxxAlertType.WARN:
        this.config.panelClass = ['xxx-alert', 'xxx-alert-warn'];
        break;
    }
  }
}
