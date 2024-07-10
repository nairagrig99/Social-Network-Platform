import {Component, EventEmitter, forwardRef, Output} from '@angular/core';
import {SvgIcon} from "@app/shared/input-calendar/input-calendar-window/base-mixin";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrl: './custom-search.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSearchComponent),
    multi: true
  }]

})
export class CustomSearchComponent extends SvgIcon(class {
}) implements ControlValueAccessor {

  @Output() findUserName: EventEmitter<any> = new EventEmitter<any>()

  public inputValue!: string;

  constructor() {
    super();
    this.svgIconShow('search')
  }

  onChange = (value: string) => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  openSearchPanel() {
    this.findUserName.emit();
  }
}
