import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {XxxDataResponseInterceptor} from '../xxx-data-response-interceptor/xxx-data-response-interceptor.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: XxxDataResponseInterceptor, multi: true}
  ]
})

/**
 * NOTE: After changing all services to use providedIn,
 * it is necessary to import this module at the app module,
 * or else in any module that uses the data service.
 * Without it, you will get run time error no provider for HttpClient and HttpHandler.
 * You also need this to bind the interceptor to the data service.
 */
export class XxxDataModule {
}
