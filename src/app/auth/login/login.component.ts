import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControlService} from "@app/shared/services/form-control.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private formControlService: FormControlService) {
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  public control(controlName: string): FormControl {
    return this.formControlService.control(this.loginForm, controlName);
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public loginUser() {
    console.log('form', this.loginForm.value);
  }
}
