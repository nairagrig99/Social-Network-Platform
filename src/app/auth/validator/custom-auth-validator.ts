import {FormGroup, ValidationErrors} from "@angular/forms";
import {AuthUserInterface} from "@auth/interface/auth-user.interface";

const emailRegex =/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

export function customAuthValidator(group: FormGroup): ValidationErrors | null {

  const regExpUserName = /^[a-zA-Z0-9_]{3,30}$/;

  const password = group.get('password')?.value;
  const re_password = group.get('rePassword')?.value;
  const name = group.get('name')?.value;
  const surname = group.get('surname')?.value;
  const email = group.get('email')?.value;

  const controls = group.controls;

  for (const nameKey in controls) {
    if (controls[nameKey].value === '') {
      return null;
    }
  }
  const isUserExist = JSON.parse(localStorage.getItem('signUp') || '{}')

  if ((password && re_password) && password !== re_password) {
    return {passwordMismatch: 'Passwords do not match'};
  }

  if (!regExpUserName.test(name)) {
    return {invalidUserName: 'user name is not correct'};
  }

  if (!regExpUserName.test(surname)) {
    return {invalidSurName: 'surname is not correct'};
  }

  if (Array.isArray(isUserExist)) {
    for (const value of isUserExist) {
      return isEmailCreated(value, group, email);
    }
  } else {
    return isEmailCreated(isUserExist, group, email);
  }

  return null;
}

function isEmailCreated(isUserExist: AuthUserInterface,
                        group: FormGroup,
                        email: string): {} | null {

  if (isUserExist.email === email) {
    return {existUser: 'User is Already Exist'};
  } else if (!emailRegex.test(email) && group.get('email')?.dirty) {
    return {existUser: 'Invalid Email'};
  }
  return null
}
