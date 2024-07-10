import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FeedComponent} from './feed/feed.component';
import {RouterModule, Routes} from "@angular/router";
import { StoryComponent } from './story/story.component';
import {MatIcon} from "@angular/material/icon";
import { StoryDialogComponent } from './story/story-dialog/story-dialog.component';

const routes: Routes = [{
  path: '',
  component: FeedComponent,
  // children:[
  //   path
  // ]
}]


@NgModule({
  declarations: [
    FeedComponent,
    StoryComponent,
    StoryDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIcon,
    NgOptimizedImage
  ]
})
export class FeedModule {
}
