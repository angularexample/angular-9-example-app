import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {XxxHomePageComponent} from './xxx-home-page.component';

const routes: Routes = [
  {path: '', component: XxxHomePageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class XxxHomePageRoutingModule {
}
