import {ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ChatCommunicationComponent} from "@app/core/components/chat/chat-communication/chat-communication.component";

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<ChatCommunicationComponent> {
  constructor() {
  }

  canDeactivate(component: ChatCommunicationComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (component.canDeactivate) {
      return window.confirm("You have unsaved changes Still want to leave?")
    }
    return false;
  }
}
