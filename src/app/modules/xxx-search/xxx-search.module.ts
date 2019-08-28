import {NgModule} from '@angular/core';

import {XxxEventMgrModule, XxxMessageModule, XxxStateStoreModule} from '@app/xxx-common';

@NgModule({
  imports: [
    XxxEventMgrModule,
    XxxMessageModule,
    XxxStateStoreModule
  ]
})

export class XxxSearchModule {
}
