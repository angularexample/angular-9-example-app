import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {XxxSearchBoxComponent} from './xxx-search-box.component';

@NgModule({
  declarations: [XxxSearchBoxComponent],
  exports: [XxxSearchBoxComponent],
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class XxxSearchBoxModule {
}
