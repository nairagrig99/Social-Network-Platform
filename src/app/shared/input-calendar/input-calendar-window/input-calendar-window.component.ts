import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {BehaviorSubject, combineLatest, ReplaySubject, takeUntil} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {CalendarWindowService} from "@app/shared/input-calendar/service/calendar-window.service";
import {
  endMonth,
  endYear,
  startYear,
  weekLen,
  weeks
} from "@app/shared/input-calendar/constants/calendar-constants";
import {SvgIcon, UnsubscribeMixin} from "@app/shared/input-calendar/input-calendar-window/base-mixin";

@Component({
  selector: 'app-input-calendar-window',
  templateUrl: './input-calendar-window.component.html',
  styleUrl: './input-calendar-window.component.scss',
  providers: [CalendarWindowService]
})

export class InputCalendarWindowComponent extends UnsubscribeMixin(SvgIcon(class {
})) implements OnInit, OnDestroy {

  @Output() setSelectedDays: EventEmitter<Date> = new EventEmitter<Date>()

  public year$ = new BehaviorSubject(new Date().getFullYear());
  public month$ = new BehaviorSubject(new Date().getMonth());
  public isYears: boolean = false;
  public isMonth: boolean = false;
  public allYearsList: number[] = this.getAllYears();
  public allMonthsList: string[] = this.getAllMonths();
  public calendar$: ReplaySubject<Date[][]> = new ReplaySubject<Date[][]>();

  public getMonthValue: number = this.month$.getValue();
  public getYearValue: number = this.year$.getValue();
  public readonly weeks = weeks;

  constructor(
    public override matIconRegistry: MatIconRegistry,
    public override domSanitizer: DomSanitizer,
    public calendarWindowService: CalendarWindowService) {
    super(matIconRegistry, domSanitizer);
    this.svgIconShow()
  }

  ngOnInit(): void {
    this.getAllDaysWithWeeksAndYearInMonth();
  }

  public chooseYear(year: number): void {
    this.year$.next(year);
    this.isYears = false;
  }

  public chooseMonth(month: number): void {
    this.month$.next(month);
    this.isMonth = false;
  }

  public chooseDay(day: Date): void {
    const newDate: Date = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    this.setSelectedDays.emit(newDate);
  }

  public prevYear(): void {
    if (this.getYearValue >= startYear) {
      this.year$.next(--this.getYearValue)
    }
  }

  public nextYear(): void {
    if (this.getYearValue <= endYear) {
      this.year$.next(++this.getYearValue)
    }
  }

  public openYears(): void {
    this.isYears = !this.isYears;
    this.isMonth = false;
  }

  public openMonth(): void {
    this.isMonth = !this.isMonth;
    this.isYears = false;
  }

  public prevMonth(): void {
    if (this.getMonthValue === 0) {
      this.year$.next(--this.getYearValue);
      this.month$.next(endMonth);
      this.getMonthValue = endMonth;
      return;
    }
    if (this.getMonthValue > 0) {
      this.month$.next(--this.getMonthValue);
    }
  }

  public nextMonth(): void {
    if (this.getMonthValue === endMonth) {
      this.year$.next(++this.getYearValue);
      this.month$.next(0);
      this.getMonthValue = 0;
      return;
    }

    if (this.getMonthValue < endMonth) {
      this.month$.next(++this.getMonthValue);
    }
  }

  public currentDateDays(month: number): boolean {

    if (month === this.month$.getValue()) {
      return true
    }
    return false;
  }

  public weekendDays(day: number): boolean {

    if (day === 0 || day === 6) {
      return true
    }
    return false;
  }

  public getAllMonths(): string[] {
    const allMonthList = [];
    for (let month = 0; month <= endMonth; month++) {
      const formattedDate = this.calendarWindowService.changeMonthToLocaleDateString(this.year$.getValue(), month);
      allMonthList.push(formattedDate);
    }
    return allMonthList;
  }

  public getAllYears(): number[] {
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }

  private getAllDaysWithWeeksAndYearInMonth(): void {

    combineLatest([this.year$, this.month$])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([year, month]) => {

        let lastDayOfMonth: Date = new Date(year, month + 1, 0);

        const daysArray = [];
        let currentWeek = [];

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
          const currentDate = new Date(year, month, day);

          if (day === 1 && currentDate.getDay() != 1) {
            let prevMonthWeek = currentDate.getDay();
            const prevMonthLastDay = new Date(year, month, 0);

            if (prevMonthWeek === 0) {
              prevMonthWeek = weekLen;
            }

            for (let prevMonthDay = prevMonthLastDay.getDate() - (prevMonthWeek - 2);
                 prevMonthDay <= prevMonthLastDay.getDate(); prevMonthDay++) {

              const newDay = new Date(year, month - 1, prevMonthDay);
              currentWeek.push(newDay);
            }
          }

          currentWeek.push(currentDate);

          if (day === lastDayOfMonth.getDate() && currentDate.getDay() <= 6 && currentDate.getDay() != 0) {
            for (let day = 1; day <= weekLen - currentDate.getDay(); day++) {
              const nextMonth = new Date(year, month + 1, day);
              currentWeek.push(nextMonth);
            }
          }

          if (currentDate.getDay() === 0 || day === lastDayOfMonth.getDate()) {
            daysArray.push(currentWeek);
            currentWeek = [];
          }
        }

        this.calendar$.next(daysArray);
      })
  }

}

