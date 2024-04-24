import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CalendarWindowStateEnum} from "@app/shared/input-calendar/enums/calendar-window-state.enum";
import {
  inputCalendarWindowAnimation
} from "@app/shared/input-calendar/input-calendar-window/animation/input-calendar-window-animation";
import {CalendarWindowService} from "@app/shared/input-calendar/service/calendar-window.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrl: './input-calendar.component.scss',
  animations: inputCalendarWindowAnimation
})
export class InputCalendarComponent implements OnInit, AfterViewInit {
  public inputValue$: BehaviorSubject<string> = new BehaviorSubject('');
  public calendarWindowStateEnum = CalendarWindowStateEnum;
  public calendarState$ = new BehaviorSubject(this.calendarWindowStateEnum.CLOSE);

  public inputCalendarForm!: FormGroup;

  constructor(private calendarService: CalendarWindowService,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initCalendarInputForm();
    this.selectedDays();
  }

  private initCalendarInputForm() {
    this.inputCalendarForm = this.formBuilder.group({
      date: [null]
    })
  }

  set inputValue(value: string) {
    this.inputValue$.next(value);
  }

  get inputValue() {
    return this.inputValue$.getValue();
  }

  public onModelChange(dateValue: string):void {

    if (dateValue.length === 10) {
      const dateParts = dateValue.split("/");

      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]);
      const year = parseInt(dateParts[2]);

      this.calendarService.setInputValue(new Date(year, month - 1, day))
    }

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

  public selectedDays(): void {
    this.calendarService.getAsyncInputValue().subscribe((date) => {
      this.inputValue$.next(String(date));
      this.toggleCalendarWindow();
    })
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

}
