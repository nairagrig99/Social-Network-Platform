import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() {
  }

  public control(form: FormGroup, control?: string): FormControl {
    return form.get(`${control}`) as FormControl;
  }
}
