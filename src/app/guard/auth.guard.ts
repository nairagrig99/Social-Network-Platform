import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync, Route, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const el = false;
    if (el) {
      return true;
    } else {
      this.route.navigate(['/auth/login'])
      return false;
    }

  }

}
