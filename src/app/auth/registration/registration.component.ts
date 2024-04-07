import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControlService} from "@app/shared/services/form-control.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  public registerForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private formControlService: FormControlService) {
  }

  ngOnInit(): void {
    this.registerForm = this.initForm();
  }

  public get nameControl(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  public get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      birthOfDate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      country: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]]
    });
  }

  public loginUser() {
    console.log('form', this.registerForm.value);
  }

  public control(controlName: string): FormControl {
    return this.formControlService.control(this.registerForm, controlName);
  }
}
