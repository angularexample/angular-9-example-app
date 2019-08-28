import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {XxxQuestionsPageComponent} from './xxx-questions-page.component';

const routes: Routes = [
  {path: 'questions', component: XxxQuestionsPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class XxxQuestionsPageRoutingModule {
}
