import {Component, OnInit} from '@angular/core';
import {KeyInterface} from "@app/shared/interface/key-interface";
import {ReplaySubject} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {SvgBaseIcon} from "@app/core/components/svg-base-icon";

@Component({
  selector: 'app-input-calendar-window',
  templateUrl: './input-calendar-window.component.html',
  styleUrl: './input-calendar-window.component.scss'
})
export class InputCalendarWindowComponent extends SvgBaseIcon implements OnInit {

  public year: number = new Date().getFullYear();
  public month: number = new Date().getMonth();

  public isYears: boolean = false;
  public isMonth: boolean = false;
  public allYearsList: number[] = [];
  public allMonthsList: string[] = [];
  public calendar: ReplaySubject<KeyInterface[]> = new ReplaySubject<KeyInterface[]>;

  constructor(public override matIconRegistry: MatIconRegistry,
              public override domSanitizer: DomSanitizer) {
    super(matIconRegistry, domSanitizer);
  }

  ngOnInit(): void {
    this.allYearsList = this.getAllYears();
    this.allMonthsList = this.getAllMonths();
    this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
  }

  public chooseYear(year: number): void {
    this.year = year;
    this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
    this.isYears = false;
  }

  public chooseMonth(month: number): void {
    this.month = month;
    this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
    this.isMonth = false;
  }

  public getAllYears(): number[] {
    const startYear: number = 1960;
    const years: number[] = [];
    for (let year = startYear; year <= 2124; year++) {
      years.push(year);
    }
    return years;
  }

  public changeMonthToLocaleDateString(month: number): string {
    const date = new Date(this.year, month, 1);
    const options: Intl.DateTimeFormatOptions = {month: 'short'}
    return date.toLocaleDateString('en-US', options)
  }

  public getAllMonths(): string[] {
    const allMonthList = [];
    for (let month = 0; month <= 11; month++) {
      const formattedDate = this.changeMonthToLocaleDateString(month);
      allMonthList.push(formattedDate)
    }
    return allMonthList;
  }

  public getAllDaysWithWeeksInMonth(year: number, month: number): Date[][] {

    let lastDayOfMonth: Date = new Date(year, month + 1, 0);

    const daysArray = [];
    let currentWeek = [];

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      // console.log('currentDate', currentDate)
      if (day === 1) {
        let prevMonthWeek = currentDate.getDay();
        console.log('prevMonthWeek', prevMonthWeek)
        const prevMonthLastDay = new Date(year, month, 0);
        console.log('prevMonthLastDay', prevMonthLastDay);
        if (prevMonthWeek === 0) {
          prevMonthWeek = 7;
        }
        for (let prevMonthDay = prevMonthLastDay.getDate(); prevMonthDay > prevMonthLastDay.getDate() - (prevMonthWeek - 1); prevMonthDay--) {
          const newDay = new Date(year, month - 1, prevMonthDay);
          currentWeek.push(newDay);
          // console.log('currentweek', currentWeek);
        }
      }
      if (day === lastDayOfMonth.getDate() && currentDate.getDay() <= 6 && currentDate.getDay() != 0) {
        const week = 7;
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
    console.log('daysArray', daysArray)
    return daysArray;
  }

  public groupDayByWeek(daysWithWeeks: any): void {
    const group = daysWithWeeks.reduce((acc: KeyInterface, next: any) => {
      return next.reduce((innerAcc: any, innerNextValue: any) => {
        const options = {weekday: 'short'}
        const week = innerNextValue.toLocaleDateString('en-US', options);

        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(innerNextValue.getDate());
        return acc;
      }, {});
    }, {});
    this.calendar.next(this.sortWeek(group));
  }

  public sortWeek(group: KeyInterface): KeyInterface[] {
    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const sortedKeys = Object.keys(group).sort((a: string, b: string) => {
      return daysOrder.indexOf(a) - daysOrder.indexOf(b);
    });

    const sortValue: KeyInterface[] = sortedKeys.map((key: string) => {
      return {[key]: group[key]}
    });

    return sortValue;
  }

  public prevMonth() {
    if (this.month > 0) {
      this.month--;
      this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
    }

  }

  public nextMonth() {
    if (this.month === 11) {
      this.year++;
      this.month = 0;
      this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
      return

    }
    if (this.month < 11) {
      this.month++;
      this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
    }

  }

  public prevYear() {
    if (this.year >= 1960) {
      this.year--;
      this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
    }
  }

  public nextYear() {
    if (this.year <= 2124) {
      this.year++;
      this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(this.year, this.month))
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


}
