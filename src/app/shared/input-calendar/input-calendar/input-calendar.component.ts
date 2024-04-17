import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CalendarWindowStateEnum} from "@app/shared/input-calendar/enums/calendar-window-state.enum";
import {
  inputCalendarWindowAnimation
} from "@app/shared/input-calendar/input-calendar-window/animation/input-calendar-window-animation";

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrl: './input-calendar.component.scss',
  animations: inputCalendarWindowAnimation,
})
export class InputCalendarComponent {
  public inputValue$: BehaviorSubject<string> = new BehaviorSubject('');
  public calendarWindowStateEnum = CalendarWindowStateEnum;
  public calendarState$ = new BehaviorSubject(this.calendarWindowStateEnum.CLOSE);

  public toggleCalendarWindow(): void {
    this.calendarState$.next(
      this.calendarState$.getValue() === this.calendarWindowStateEnum.CLOSE ?
        this.calendarWindowStateEnum.OPEN :
        this.calendarWindowStateEnum.CLOSE
    )
  }

  public selectedDays(date: Date): void {
    this.inputValue$.next(String(date));
    this.toggleCalendarWindow();
  }
}
