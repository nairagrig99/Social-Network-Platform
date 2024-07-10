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

  public updateSignInUserAndSameUserFromAllUserList(updatedUser: AuthUserInterface): void {
    let allUser: AuthUserInterface[] = this.getAllUserListFromLocaleToStorage();
    allUser = allUser.map((user) => {
      if (user.id === updatedUser.id) {
        return {
          ...user,
          notifications: updatedUser.notifications
        }
      }
      return user

    })
    console.log('allUser', allUser)
    this.signUpUser(allUser);

    this.signInUser({...updatedUser, notifications: updatedUser.notifications})
  }

  public getSignInUser(): AuthUserInterface {
    return JSON.parse(localStorage.getItem('signIn') || '{}');
  }

  public getAllUserListFromLocaleToStorage(): AuthUserInterface[] {
    return JSON.parse(localStorage.getItem('signUp') || '{}');
  }

  public logOutUser(): void {
    localStorage.removeItem('signIn');
  }

}

