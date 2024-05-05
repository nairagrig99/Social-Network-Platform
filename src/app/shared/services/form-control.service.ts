import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() {
  }

  // public control<T extends AbstractControl>(form: T, control?: string): T {
  //   return form.get(`${control}`) as T;
  // }
  public control(form: FormGroup, control?: string): FormControl {
    return form.get(`${control}`) as FormControl;
  }
}
