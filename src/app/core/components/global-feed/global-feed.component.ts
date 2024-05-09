import {Component, Input} from '@angular/core';

import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss'
})
export class GlobalFeedComponent extends SvgIcon(class  {

}) {
  @Input() userInfo!: AuthUserInterface;

  constructor() {
    super();
    this.svgIconShow('feed')
  }
}
