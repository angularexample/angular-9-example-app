import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {XxxPageNotFoundPageComponent} from '@app/modules/xxx-page-not-found-page/xxx-page-not-found-page.component';
import {XxxPageNotFoundPageModule} from '@app/modules/xxx-page-not-found-page/xxx-page-not-found-page.module';

export const xxxAppRoutes: Routes = [
  {path: '**', component: XxxPageNotFoundPageComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    XxxPageNotFoundPageModule,
    RouterModule.forRoot(
        xxxAppRoutes
    )
  ]
})

export class AppRoutingModule {
}
