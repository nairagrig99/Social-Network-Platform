import {AbstractControl, ValidatorFn} from "@angular/forms";

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (isNaN(control.value)) {
      return {'notANumber': {value: control.value}};
    }
    return null;
  }
}
