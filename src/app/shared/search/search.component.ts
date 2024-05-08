import {Component} from '@angular/core';
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent extends SvgIcon(class {
}) {

  constructor() {
    super();
    this.svgIconShow('search')
  }
}
