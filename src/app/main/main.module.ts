import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {CoreModule} from "@app/core/core.module";

const route: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('./components/feed/feed.module').then((module) => module.FeedModule)
      }
    ]
  }
]

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    CoreModule
  ]
})
export class MainModule {
}
