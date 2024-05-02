import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControlService} from "@app/shared/services/form-control.service";
import {AuthService} from "@auth/service/auth.service";
import {customAuthValidator} from "@auth/validator/custom-auth-validator";
import {BehaviorSubject, Observable, of, ReplaySubject} from "rxjs";
import {SelectInputOption} from "@app/shared/interface/select-input-option.interface";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  public registerForm!: FormGroup;
  public countries$: BehaviorSubject<SelectInputOption> = new BehaviorSubject<SelectInputOption>({});
  // public countries$!: Observable<SelectInputOption>;

  constructor(private formBuilder: FormBuilder,
              private formControlService: FormControlService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.getCountries();
  }

  private initForm(): FormGroup {
    const required = Validators.required;
    return this.formBuilder.group({
      name: [null, [required]],
      surname: [null, [required]],
      birthOfDate: [null, [required]],
      gender: [null, [required]],
      country: [null, [required]],
      email: [null, [required]],
      password: [null, [required]],
      rePassword: [null, [required]]
    }, {validators: customAuthValidator});
  }

  public registerUser() {
    console.log('this.registerForm', this.registerForm)
    // if (this.registerForm.valid) {
    this.authService.signUpUser(this.registerForm.value);
    // }
  }

  public control(controlName: string): FormControl {
    return this.formControlService.control(this.registerForm, controlName);
  }

  getCountries() {
    const charA = 65
    const charZ = 90
    const countryName = new Intl.DisplayNames(['en'], {type: 'region'});

    const countries: { [key: string]: string } = {}

    for (let i = charA; i <= charZ; ++i) {
      for (let j = charA; j <= charZ; ++j) {
        let code = String.fromCharCode(i) + String.fromCharCode(j)
        let name = countryName.of(code) || ''
        if (code !== name) {
          countries[code] = name;
        }

      }
    }
    this.countries$.next(countries);
    // this.countries$ = of(countries);
  }

}
