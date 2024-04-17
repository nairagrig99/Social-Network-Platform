import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {InputComponent} from './input/input.component';
import {ButtonComponent} from './button/button.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputCalendarWindowComponent} from './input-calendar/input-calendar-window/input-calendar-window.component';
import {InputCalendarComponent} from "@app/shared/input-calendar/input-calendar/input-calendar.component";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatButton} from "@angular/material/button";
import {DateFormatPipe} from "@app/shared/pipes/date-format.pipe";

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    DateFormatPipe,
    InputCalendarComponent,
    InputCalendarWindowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatIconModule,
    MatButton
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    InputCalendarComponent,
    InputCalendarWindowComponent]
})
export class SharedModule {

}
