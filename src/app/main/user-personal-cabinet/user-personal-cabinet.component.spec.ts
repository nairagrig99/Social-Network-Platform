import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalCabinetComponent } from './user-personal-cabinet.component';

describe('UserPersonalCabinetComponent', () => {
  let component: UserPersonalCabinetComponent;
  let fixture: ComponentFixture<UserPersonalCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPersonalCabinetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPersonalCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
