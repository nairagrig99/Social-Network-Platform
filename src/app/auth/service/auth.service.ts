import {Injectable} from '@angular/core';

import {AuthUserInterface} from "@auth/interface/auth-user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  public signUpUser(registerUser: AuthUserInterface[]): void {
    localStorage.setItem('signUp', JSON.stringify(registerUser) || '[]');
  }
}

