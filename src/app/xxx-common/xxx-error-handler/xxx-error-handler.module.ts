import {ErrorHandler, NgModule} from '@angular/core';

import {XxxAlertModule} from '../xxx-alert/xxx-alert.module';
import {XxxLogModule} from '../xxx-log/xxx-log.module';
import {XxxErrorHandler} from './xxx-error-handler.service';

@NgModule({
  imports: [
    XxxAlertModule,
    XxxLogModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: XxxErrorHandler}
  ]
})
export class XxxErrorHandlerModule {
}
