import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {MenuComponent} from './components/menu/menu.component';
import {SharedModule} from "@app/shared/shared.module";
import {ChatComponent} from './components/chat/chat.component';
import {GlobalFeedComponent} from './components/global-feed/global-feed.component';
import {NotificationComponent} from './components/notification/notification.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import { ChatCommunicationComponent } from './components/chat/chat-communication/chat-communication.component';
import {UserPersonalCabinetComponent} from "@main/components/user-personal-cabinet/user-personal-cabinet.component";

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    ChatComponent,
    GlobalFeedComponent,
    NotificationComponent,
    UserProfileComponent,
    UserPersonalCabinetComponent,
    ChatCommunicationComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIcon,
    NgOptimizedImage,
    FormsModule
  ]
})
export class CoreModule {
}
