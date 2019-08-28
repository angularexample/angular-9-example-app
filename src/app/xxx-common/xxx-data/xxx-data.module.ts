import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {XxxDataResponseInterceptor} from '../xxx-data-response-interceptor/xxx-data-response-interceptor.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: XxxDataResponseInterceptor, multi: true}
  ]
})

export class XxxDataModule {
}
