import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControlService} from "@app/shared/services/form-control.service";
import {AuthService} from "@auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: Router,
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

  public loginUser(): void {
    const getAllRegisteredUsersList = this.authService.getAllUserListFromLocaleToStorage();

    for (const item of getAllRegisteredUsersList) {
      if (item.email === this.loginForm.get('login')?.value && item.password === this.loginForm.get('password')?.value) {
        this.authService.signInUser(item)
        this.route.navigate(['/main']);
      } else {
        this.loginForm.setErrors({invalidUser: true})
      }
    }
  }

}
