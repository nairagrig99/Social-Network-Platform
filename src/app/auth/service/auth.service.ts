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

  public signInUser(registerUser: AuthUserInterface): void {
    localStorage.setItem('signIn', JSON.stringify(registerUser) || '{}');
  }

  public getSignInUser(): AuthUserInterface {
    return JSON.parse(localStorage.getItem('signIn') || '{}');
  }

  public getAllUserListFromLocaleToStorage(): AuthUserInterface[] {
    return JSON.parse(localStorage.getItem('signUp') || '{}');
  }

  public logOutUser(): void {
    localStorage.removeItem('signIn')
  }
}

