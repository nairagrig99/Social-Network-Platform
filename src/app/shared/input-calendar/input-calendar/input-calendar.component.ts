import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CalendarWindowStateEnum} from "@app/shared/input-calendar/enums/calendar-window-state.enum";
import {
  inputCalendarWindowAnimation
} from "@app/shared/input-calendar/input-calendar-window/animation/input-calendar-window-animation";
import {CalendarWindowService} from "@app/shared/input-calendar/service/calendar-window.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {numberValidator} from "@app/shared/custom-validators/input-number-custom-validator";

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrl: './input-calendar.component.scss',
  animations: inputCalendarWindowAnimation,
  providers: [CalendarWindowService]
})
export class InputCalendarComponent implements OnInit, AfterViewInit {
  public inputValue$: BehaviorSubject<string> = new BehaviorSubject('');
  public calendarWindowStateEnum = CalendarWindowStateEnum;
  public calendarState$ = new BehaviorSubject(this.calendarWindowStateEnum.CLOSE);

  public inputCalendarForm!:FormGroup;
  constructor(private calendarService: CalendarWindowService,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initCalendarInputForm();
  }

  private initCalendarInputForm() {
    this.inputCalendarForm=this.formBuilder.group({
      date:[null,[numberValidator()]]
    })
  }

  set inputValue(value: string) {
    this.inputValue$.next(value);
  }

  get inputValue() {
    return this.inputValue$.getValue();
  }

  public toggleCalendarWindow(): void {
    this.calendarState$.next(
      this.calendarState$.getValue() === this.calendarWindowStateEnum.CLOSE ?
        this.calendarWindowStateEnum.OPEN :
        this.calendarWindowStateEnum.CLOSE
    )
  }

  public hideCalendarWindow(): void {
    this.calendarState$.next(this.calendarWindowStateEnum.CLOSE)
  }

  public selectedDays(date: Date): void {
    this.inputValue$.next(String(date));
    this.toggleCalendarWindow();
  }

  private closeCalendarWhenClickedOutside(): void {
    this.calendarService.closeCalendarWhenClickedOutside(this.elementRef.nativeElement).subscribe((isOutsideClick: boolean) => {
      if (!isOutsideClick) {
        this.hideCalendarWindow()
      }
    })
  }

  ngAfterViewInit(): void {
    this.closeCalendarWhenClickedOutside()
  }

  protected readonly FormGroup = FormGroup;
}
