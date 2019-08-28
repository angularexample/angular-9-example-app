import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-alert',
  styleUrls: ['./xxx-alert.component.scss'],
  templateUrl: './xxx-alert.component.html'
})

export class XxxAlertComponent {
  alertMessage: string;
  alertType: string;

  constructor(public snackBarRef: MatSnackBarRef<XxxAlertComponent>, @Inject(MAT_SNACK_BAR_DATA) public alertData: any) {
    this.alertMessage = this.alertData.message;
    this.alertType = this.alertData.type;
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
