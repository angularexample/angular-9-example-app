import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {XxxAnswersPageComponent} from './xxx-answers-page.component';
import {XxxAnswersPageRoutingModule} from './xxx-answers-page-routing.module';

@NgModule({
  declarations: [XxxAnswersPageComponent],
  exports: [XxxAnswersPageComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    XxxAnswersPageRoutingModule
  ]
})

export class XxxAnswersPageModule {
}
