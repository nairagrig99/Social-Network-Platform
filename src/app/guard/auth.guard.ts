import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync, Route, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "@auth/service/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route: Router,
              private authService: AuthService) {
  }

  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.getSignInUser().email?.length) {
      return true;
    } else {
      this.route.navigate(['/auth/login'])
      return false;
    }

  }

}
