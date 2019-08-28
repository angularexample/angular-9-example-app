import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {XxxAnswersPageComponent} from './xxx-answers-page.component';

const routes: Routes = [
  {path: 'answers/:id', component: XxxAnswersPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class XxxAnswersPageRoutingModule {
}
