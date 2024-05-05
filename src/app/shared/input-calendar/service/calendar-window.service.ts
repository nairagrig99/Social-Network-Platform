import {Injectable} from "@angular/core";
import {KeyInterface} from "@app/shared/interface/key-interface";
import {BehaviorSubject, fromEvent, map, Observable, of, ReplaySubject, Subject} from "rxjs";

@Injectable()
export class CalendarWindowService {

  private dateInputValue$: ReplaySubject<Date> = new ReplaySubject<Date>();
  private date$: Observable<Date> = this.dateInputValue$.asObservable();

  public setInputValue(date: Date) {
    this.dateInputValue$.next(date);
  }

  public getAsyncInputValue(): Observable<any> {
    return this.date$;
  }

  public closeModalWhenClickedOutside(domElement: HTMLElement): Observable<boolean> {
    return fromEvent(document, 'click').pipe(
      map((event: Event) => this.checkOwnershipInParents(event.target as HTMLElement, domElement))
    )
  }

  private checkOwnershipInParents(targetElement: HTMLElement, DOMOfOwner: HTMLElement): boolean {
    if (!targetElement) {
      return false;
    }

    if (targetElement.nodeName === 'BODY') {
      return false;
    }

    if (targetElement === DOMOfOwner) {
      return true;
    }

    return this.checkOwnershipInParents(targetElement?.parentNode as HTMLElement, DOMOfOwner);
  }

  public changeMonthToLocaleDateString(year: number, month: number): string {
    const date = new Date(year, month, 1);
    const options: Intl.DateTimeFormatOptions = {month: 'short'}
    return date.toLocaleDateString('en-US', options);
  }


}
