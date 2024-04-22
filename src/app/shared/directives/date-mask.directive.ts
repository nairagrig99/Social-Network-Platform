import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: '[dateMask]'
})

export class DateMaskDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = event.target;
    const value = input.value;
    console.log('value', value);
    if (value.length <= 2) {
      input.value = value.replace(/\D/g, '');
    } else if (value.length <= 4) {
      input.value = value.slice(0, 2) + '/' + value.replace(/\D/g, '').slice(2);
    } else {
      input.value = value.slice(0, 2) + '/' + value.replace(/\D/g, '').slice(2, 4) + '/' + value.replace(/\D/g, '').slice(4, 8);
    }
  }

}
