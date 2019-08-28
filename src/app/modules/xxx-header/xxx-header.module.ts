import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

import {XxxHeaderComponent} from './xxx-header.component';
import {XxxSearchBoxModule} from '@app/modules/xxx-search-box/xxx-search-box.module';

@NgModule({
  declarations: [XxxHeaderComponent],
  exports: [XxxHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    XxxSearchBoxModule
  ]
})

export class XxxHeaderModule {
}
