import {NgModule} from '@angular/core';

import {XxxHomePageComponent} from './xxx-home-page.component';
import {XxxHomePageRoutingModule} from './xxx-home-page-routing.module';

@NgModule({
  declarations: [XxxHomePageComponent],
  exports: [XxxHomePageComponent],
  imports: [XxxHomePageRoutingModule]
})

export class XxxHomePageModule {
}
