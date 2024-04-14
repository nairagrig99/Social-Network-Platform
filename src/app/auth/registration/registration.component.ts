import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControlService} from "@app/shared/services/form-control.service";
import {AuthService} from "@auth/service/auth.service";
import {customAuthValidator} from "@auth/validator/custom-auth-validator";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  public registerForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private formControlService: FormControlService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.initForm();
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
    if (this.registerForm.valid) {
      console.log(this.authService.signUpUser(this.registerForm.value));
    }
  }

  public control(controlName: string): FormControl {
    return this.formControlService.control(this.registerForm, controlName);
  }
}
