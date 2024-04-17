import {Injectable} from "@angular/core";
import {KeyInterface} from "@app/shared/interface/key-interface";
import {daysOrder} from "@app/shared/input-calendar/constants/calendar-constants";

@Injectable()
export class CalendarWindowService {

  public groupDayByWeek(daysWithWeeks: any): KeyInterface[] {
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
    // after group day sort week
    return this.sortWeek(group)
  }

  public sortWeek(group: KeyInterface): KeyInterface[] {
    const sortedKeys = Object.keys(group).sort((a: string, b: string) => {
      return daysOrder.indexOf(a) - daysOrder.indexOf(b);
    });

    const sortValue: KeyInterface[] = sortedKeys.map((key: string) => {
      return {[key]: group[key]}
    });

    return sortValue;
  }

}
