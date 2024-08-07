import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {InputComponent} from './input/input.component';
import {ButtonComponent} from './button/button.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputCalendarWindowComponent} from './input-calendar/input-calendar-window/input-calendar-window.component';
import {InputCalendarComponent} from "@app/shared/input-calendar/input-calendar/input-calendar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {DateFormatPipe} from "@app/shared/pipes/date-format.pipe";
import {DateMaskDirective} from "@app/shared/directives/date-mask.directive";
import {CalendarWindowService} from "@app/shared/input-calendar/service/calendar-window.service";
import {SelectComponent} from './select/select.component';
import {CustomSelectHeightDirective} from "@app/shared/directives/custom-select-height.directive";
import {PlaceholderDirective} from "@app/shared/directives/placeholder.directive";
import {CustomSearchComponent} from './search/custom-search.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    InputComponent,
    DateFormatPipe,
    ButtonComponent,
    CustomSearchComponent,
    SelectComponent,
    DateMaskDirective,
    PlaceholderDirective,
    InputCalendarComponent,
    CustomSelectHeightDirective,
    InputCalendarWindowComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        MatIconModule,
        MatButton,
        RouterLink
    ],
  exports: [
    InputComponent,
    ButtonComponent,
    InputCalendarComponent,
    InputCalendarWindowComponent,
    SelectComponent,
    CustomSearchComponent
  ],
  providers: [CalendarWindowService]
})
export class SharedModule {

}
