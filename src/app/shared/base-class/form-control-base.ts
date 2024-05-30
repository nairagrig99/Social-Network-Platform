import {FormControl, FormGroup} from "@angular/forms";

export class FormControlBase {
  public control(form: FormGroup, controlName: string): FormControl {
    return form.get(`${controlName}`) as FormControl;
  }
}
