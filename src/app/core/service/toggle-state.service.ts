import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ToggleStateEnum} from "@app/shared/enums/toogle-state.enum";

@Injectable({
  providedIn: 'root'
})
export class ToggleStateService {
  private toggleState = ToggleStateEnum;

  public changeStateOfElement(state: string): ToggleStateEnum {
    return state === this.toggleState.OPEN ? this.toggleState.CLOSE : this.toggleState.OPEN
  }
}
