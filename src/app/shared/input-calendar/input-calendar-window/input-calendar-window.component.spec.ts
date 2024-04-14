import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCalendarWindowComponent } from './input-calendar-window.component';

describe('InputCalendarWindowComponent', () => {
  let component: InputCalendarWindowComponent;
  let fixture: ComponentFixture<InputCalendarWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCalendarWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCalendarWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
