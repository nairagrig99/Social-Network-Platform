import {Directive, HostListener} from "@angular/core";

@Directive({
  selector: '[dateMask]'
})

export class DateMaskDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const inputValue = event.target.value;
    let newValue = inputValue.replace(/\D/g, '').slice(0, 8);

    const findStr = inputValue.split('').every((str: string) => {
      const regex: RegExp = /[a-zA-Z]/;
      return regex.test(str);
    })

    if (!findStr) {
      event.target.value = this.maskInputValue(newValue);
      return
    }

    event.target.value = this.maskInputValue(newValue)
  }

  private maskInputValue(newValue: string): string {
    if (newValue.length >= 2 && newValue.length < 4) {
      return newValue.replace(/(\d{2})/, '$1/');
    } else if (newValue.length >= 4 && newValue.length < 8) {
      return newValue.replace(/(\d{2})(\d{2})/, '$1/$2/');
    } else if (newValue.length === 8) {
      return newValue.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    return newValue;
  }

  @HostListener('keydown.backspace', ['$event'])
  onKeyDownBackspace(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    if (selectionStart) {
      if (selectionStart === selectionEnd && selectionStart % 3 === 0) {
        event.preventDefault();
        const value = input.value;
        const newValue = value.slice(0, selectionStart - 1);
        input.value = newValue;
        const newCursorPosition = selectionStart === selectionEnd ? selectionStart - 1 : selectionStart;
        input.setSelectionRange(newCursorPosition, selectionEnd);
      }
    }

  }

}
