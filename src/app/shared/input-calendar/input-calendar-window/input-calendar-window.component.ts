import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KeyInterface} from "@app/shared/interface/key-interface";
import {BehaviorSubject, combineLatest, ReplaySubject} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {SvgBaseIcon} from "@app/core/components/svg-base-icon";
import {CalendarWindowService} from "@app/shared/input-calendar/service/calendar-window.service";

@Component({
  selector: 'app-input-calendar-window',
  templateUrl: './input-calendar-window.component.html',
  styleUrl: './input-calendar-window.component.scss',
  providers: [CalendarWindowService]
})
export class InputCalendarWindowComponent extends SvgBaseIcon implements OnInit {

  @Output() setSelectedDays: EventEmitter<Date> = new EventEmitter<Date>()

  public year$ = new BehaviorSubject(new Date().getFullYear());
  public month$ = new BehaviorSubject(new Date().getMonth());
  public isYears: boolean = false;
  public isMonth: boolean = false;
  public allYearsList: number[] = this.getAllYears();
  public allMonthsList: string[] = this.getAllMonths();
  public calendar: ReplaySubject<KeyInterface[]> = new ReplaySubject<KeyInterface[]>;

  public getMonthValue: number = this.month$.getValue();
  public getYearValue: number = this.year$.getValue();

  private startYear: number = 1960;
  private endYear: number = 2124;
  private endMonth: number = 11;
  private weekLen: number = 7;


  constructor(public override matIconRegistry: MatIconRegistry,
              public override domSanitizer: DomSanitizer,
              private calendarWindowService: CalendarWindowService) {
    super(matIconRegistry, domSanitizer);
  }

  ngOnInit(): void {
    this.getAllDaysWithWeeksInMonth();
  }

  public chooseYear(year: number): void {
    this.year$.next(year);
    this.isYears = false;
  }

  public chooseMonth(month: number): void {
    this.month$.next(month);
    this.isMonth = false;
  }

  public chooseDay(day: number): void {
    const newDate: Date = new Date(this.getYearValue, this.getMonthValue, day);
    this.setSelectedDays.emit(newDate);
  }

  public prevYear(): void {
    if (this.getYearValue >= this.startYear) {
      this.year$.next(--this.getYearValue)
    }
  }

  public nextYear(): void {
    if (this.getYearValue <= this.endYear) {
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

  public getAllYears(): number[] {
    const years: number[] = [];
    for (let year = this.startYear; year <= this.endYear; year++) {
      years.push(year);
    }
    return years;
  }

  public changeMonthToLocaleDateString(month: number): string {
    const date = new Date(this.getYearValue, month, 1);
    const options: Intl.DateTimeFormatOptions = {month: 'short'}
    return date.toLocaleDateString('en-US', options)
  }

  public getAllMonths(): string[] {
    const allMonthList = [];
    for (let month = 0; month <= this.endMonth; month++) {
      const formattedDate = this.changeMonthToLocaleDateString(month);
      allMonthList.push(formattedDate);
    }
    return allMonthList;
  }

  public getAllDaysWithWeeksInMonth(): void {
    combineLatest([this.year$, this.month$])
      .subscribe(([year, month]) => {

        let lastDayOfMonth: Date = new Date(year, month + 1, 0);

        const daysArray = [];
        let currentWeek = [];

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
          const currentDate = new Date(year, month, day);
          if (day === 1) {
            let prevMonthWeek = currentDate.getDay();
            const prevMonthLastDay = new Date(year, month, 0);

            if (prevMonthWeek === 0) {
              prevMonthWeek = this.weekLen;
            }

            for (let prevMonthDay = prevMonthLastDay.getDate(); prevMonthDay > prevMonthLastDay.getDate() - (prevMonthWeek - 1); prevMonthDay--) {
              const newDay = new Date(year, month - 1, prevMonthDay);
              currentWeek.push(newDay);
            }
          }
          if (day === lastDayOfMonth.getDate() && currentDate.getDay() <= 6 && currentDate.getDay() != 0) {
            const week = this.weekLen;
            for (let day = 1; day <= week - currentDate.getDay(); day++) {
              const nextMonth = new Date(year, month + 1, day);
              currentWeek.push(nextMonth);

            }
          }
          currentWeek.push(currentDate);
          if (currentDate.getDay() === 6 || day === lastDayOfMonth.getDate()) {
            daysArray.push(currentWeek);
            currentWeek = [];
          }
        }
        this.calendar.next(this.calendarWindowService.groupDayByWeek(daysArray));
      })
  }

  public prevMonth(): void {
    if (this.getMonthValue === 0) {
      this.year$.next(--this.getYearValue);
      this.month$.next(this.endMonth);
      return;
    }
    if (this.getMonthValue > 0) {
      this.month$.next(--this.getMonthValue);
    }
  }

  public nextMonth(): void {
    if (this.getMonthValue === this.endMonth) {
      this.year$.next(++this.getYearValue);
      this.month$.next(0);
      return;
    }

    if (this.getMonthValue < this.endMonth) {
      this.month$.next(++this.getMonthValue);
    }
  }

}
