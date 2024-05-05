import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectInputOption} from "@app/shared/interface/select-input-option.interface";
import {SvgBaseIcon} from "@app/core/components/svg-base-icon";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {BehaviorSubject, map} from "rxjs";
import {CalendarWindowStateEnum} from "@app/shared/input-calendar/enums/calendar-window-state.enum";
import {selectOptionAnimation} from "@app/shared/select/select-option-animation/select-option-animation";
import {CalendarWindowService} from "@app/shared/input-calendar/service/calendar-window.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: selectOptionAnimation,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent extends SvgBaseIcon implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('arrow') openSelectList!: ElementRef;

  @Input() placeholder!: string;
  @Input() filteredOptions: BehaviorSubject<SelectInputOption> = new BehaviorSubject<SelectInputOption>({});
  public options: BehaviorSubject<SelectInputOption> = new BehaviorSubject<SelectInputOption>({});
  private rotate: number = 180;
  private rotateArrow: number = this.rotate;

  public selectValue!: string;
  public selectStateEnum = CalendarWindowStateEnum;
  public selectState$: BehaviorSubject<string> = new BehaviorSubject<string>(this.selectStateEnum.CLOSE)

  constructor(public override matIconRegistry: MatIconRegistry,
              public override domSanitizer: DomSanitizer,
              private service: CalendarWindowService,
              private elementRef: ElementRef) {
    super(matIconRegistry, domSanitizer);
  }

  ngOnInit(): void {
    this.options.next(this.filteredOptions.getValue())
  }

  ngAfterViewInit(): void {
    this.closeCalendarWhenClickedOutside()
  }

  onChange = (value: any) => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.selectValue = obj
  }

  public selectedValue(selected: string): void {
    this.selectValue = selected;
    this.onChange(selected)
  }

  public onModelChange(): void {
    if (this.selectValue.length > 2) {
      this.filteredOptions.pipe(
        map((option: any) => {
          const filterOption: any = {}
          for (let optionKey in option) {
            const selectedValueLength = this.selectValue.length;
            const spliceFilterOptions = option[optionKey].slice(0, selectedValueLength);
            if (spliceFilterOptions.toLowerCase().includes(this.selectValue.toLowerCase())) {
              filterOption[optionKey] = option[optionKey];
            }
          }
          return filterOption;
        })).subscribe((s) => {
        this.options.next(s);
        this.onChange(this.options.getValue())
      })
    } else {
      this.options.next(this.filteredOptions.getValue());
    }
  }

  public openSelect(): void {
    this.openSelectList.nativeElement.style.transform = `rotate(${this.rotateArrow}deg)`;
    if (this.rotateArrow === this.rotate) {
      this.rotateArrow = 0;
    } else {
      this.rotateArrow = this.rotate;
    }
    this.selectState$.next(this.selectState$.getValue() === this.selectStateEnum.CLOSE ? this.selectStateEnum.OPEN : this.selectStateEnum.CLOSE)
  }

  private closeCalendarWhenClickedOutside(): void {
    this.service.closeModalWhenClickedOutside(this.elementRef.nativeElement).subscribe((isOutsideClick: boolean) => {
      if (!isOutsideClick) {
        this.selectState$.next(this.selectStateEnum.CLOSE);
      }
    })
  }

}

