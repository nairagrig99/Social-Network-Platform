import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {KeyInterface} from "@app/shared/interface/key-interface";
import {ReplaySubject} from "rxjs";

@Component({
  selector: 'app-input-calendar-window',
  templateUrl: './input-calendar-window.component.html',
  styleUrl: './input-calendar-window.component.scss'
})
export class InputCalendarWindowComponent implements OnInit {

  public calendar: ReplaySubject<KeyInterface[]> = new ReplaySubject<KeyInterface[]>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const year = 2024;
    const month = 8;
    this.groupDayByWeek(this.getAllDaysWithWeeksInMonth(year, month))
  }

  public getAllDaysWithWeeksInMonth(year: number, month: number) {

    const firstDayOfMonth = new Date(year, month + 1, 1);

    let lastDayOfMonth: Date = new Date(year, month, 0);

    const daysArray = [];
    let currentWeek = [];

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const currentDate = new Date(year, month + 1, day);
      if (day === 1 && currentDate.getDay() != 0) {
        const prevMonthWeek = currentDate.getDay();
        const prevMonthLastDay = new Date(year, month + 1, 0);
        for (let prevMonthDay = prevMonthLastDay.getDate(); prevMonthDay > prevMonthLastDay.getDate() - (prevMonthWeek - 1); prevMonthDay--) {
          const newDay = new Date(year, month, prevMonthDay);
          currentWeek.push(newDay);
        }
      }
      if (day === lastDayOfMonth.getDate() && currentDate.getDay() < 6) {
        const week = 7;
        for (let i = 1; i <= week - currentDate.getDay(); i++) {
          const nextMonth = new Date(year, month + 2, i);
          currentWeek.push(nextMonth);
        }
      }

      currentWeek.push(currentDate);
      if (currentDate.getDay() === 6 || day === lastDayOfMonth.getDate()) {
        daysArray.push(currentWeek);
        currentWeek = [];
      }

    }
    console.log('daysArray', daysArray);
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


  public sortWeek(group: KeyInterface) {
    const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const sortedKeys = Object.keys(group).sort((a: string, b: string) => {
      return daysOrder.indexOf(a) - daysOrder.indexOf(b);
    });

    const sortValue = sortedKeys.map((key) => {
      return {[key]: group[key]}
    });
    console.log('sortValue', sortValue)
    return sortValue;
  }

}
