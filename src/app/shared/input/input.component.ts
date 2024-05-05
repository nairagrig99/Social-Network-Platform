import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SvgBaseIcon} from "@app/core/components/svg-base-icon";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends SvgBaseIcon implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label!: string;
  @Input() error!: string;
  @Input() placeholder: string = '';
  @Input() isPsw: boolean = false;

  public model!: string;

  constructor(public override matIconRegistry: MatIconRegistry,
              public override domSanitizer: DomSanitizer) {
    super(matIconRegistry, domSanitizer);
  }

  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.model = obj;
  }

  onModelChange(): void {
    this.onChange(this.model);
  }

  public showPassword(): void {
    if (this.type === 'password') {
      this.type = 'text';
      return
    }
    this.type = 'password'
  }

}
