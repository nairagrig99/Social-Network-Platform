import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {CoreModule} from "@app/core/core.module";
import {SearchComponent} from './components/search/search.component';
import {SharedModule} from "@app/shared/shared.module";
import {AuthGuard} from "@app/guard/auth.guard";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

const route: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: "full"
      },
      {
        path: 'feed',
        outlet:'feedOutlet',
        loadChildren: () => import('./components/feed/feed.module').then((module) => module.FeedModule)
      },
      {
        path: 'search',
        component: SearchComponent,
        outlet: 'searchOutlet'
      }
    ]
  }
]

@NgModule({
  declarations: [MainComponent, SearchComponent],
  exports: [
    SearchComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        CoreModule,
        SharedModule,
        MatIcon,
        FormsModule,
        NgOptimizedImage
    ]
})
export class MainModule {
}
