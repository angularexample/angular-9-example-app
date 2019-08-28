import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {XxxDataModule} from '../xxx-data/xxx-data.module';
import {XxxMessageModule} from '../xxx-message/xxx-message.module';
import {XxxStateStoreModule} from '../xxx-state-store/xxx-state-store.module';

@NgModule({
  imports: [
    RouterModule,
    XxxDataModule,
    XxxMessageModule,
    XxxStateStoreModule
  ]
})

export class XxxEventMgrModule {
}
