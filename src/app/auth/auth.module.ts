import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "@auth/login/login.component";
import {RegistrationComponent} from "@auth/registration/registration.component";
import {AuthComponent} from "@auth/auth.component";
import {SharedModule} from "@app/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

const route: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      }, {
        path: 'registration',
        component: RegistrationComponent,
      },
    ]
  },
]

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(route),
        ReactiveFormsModule
    ]
})

export class AuthModule {
}
