import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControlService} from "@app/shared/services/form-control.service";
import {AuthService} from "@auth/service/auth.service";
import {customAuthValidator} from "@auth/validator/custom-auth-validator";
import {BehaviorSubject, Observable, of, ReplaySubject} from "rxjs";
import {SelectInputOption} from "@app/shared/interface/select-input-option.interface";
import {AuthUserInterface} from "@auth/interface/auth-user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  public registerForm!: FormGroup;
  public countries$: BehaviorSubject<SelectInputOption> = new BehaviorSubject<SelectInputOption>({});
  public gender: BehaviorSubject<SelectInputOption> = new BehaviorSubject<SelectInputOption>({
    'FM': 'Female',
    'ML': 'Male'
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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

  public registerUser(): void {
    if (this.registerForm.valid) {
      const authUserList = JSON.parse(localStorage.getItem('signUp') || '[]');
      setTimeout(() => {
        this.router.navigate(['/auth/login']).then(() => {
          this.authService.signUpUser(authUserList.length ? [...authUserList, this.registerForm.value] : [this.registerForm.value]);
        })
      }, 3000)

    }
  }

  private removeControlValue(): void {
    const ctrl = this.registerForm.controls;

    Object.keys(ctrl).forEach((controlName) => {
      this.registerForm.controls[controlName].reset()
    })
  }

  public control(controlName: string): FormControl {
    return this.formControlService.control(this.registerForm, controlName);
  }

  getCountries(): void {
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
  }

}
