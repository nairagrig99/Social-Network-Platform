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

  public calendarWindowStateEnum = CalendarWindowStateEnum;
  public calendarState$ = new BehaviorSubject(this.calendarWindowStateEnum.CLOSE);

  public toggleCalendarWindow() {
    this.calendarState$.next(
      this.calendarState$.getValue() === this.calendarWindowStateEnum.CLOSE ?
        this.calendarWindowStateEnum.OPEN :
        this.calendarWindowStateEnum.CLOSE
    )
  }
}
