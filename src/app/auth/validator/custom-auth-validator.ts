import {FormGroup, ValidationErrors} from "@angular/forms";

export function customAuthValidator(group: FormGroup): ValidationErrors | null {

  const regExp = /^[a-zA-Z0-9_]{3,30}$/;

  const password = group.get('password')?.value;
  const re_password = group.get('rePassword')?.value;
  const name = group.get('name')?.value;
  const surname = group.get('surname')?.value;
  const email = group.get('email')?.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (!regExp.test(name)) {
    return {invalidUserName: 'user name is not correct'};
  }

  if (!regExp.test(surname)) {
    return {invalidSurName: 'surname is not correct'};
  }


  if (isUserExist.hasOwnProperty('email') && isUserExist.email === email) {
    return {existUser: 'User is Already Exist'};
  } else if (!emailRegex.test(email) && group.get('email')?.dirty) {
    return {existUser: 'Invalid Email'};
  }

  return null;
}
