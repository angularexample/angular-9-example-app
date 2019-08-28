import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {XxxAlertComponent} from './xxx-alert.component';

@NgModule({
  declarations: [XxxAlertComponent],
  entryComponents: [XxxAlertComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})

export class XxxAlertModule {
}
