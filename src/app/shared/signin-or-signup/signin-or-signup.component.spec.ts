import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninOrSignupComponent } from './signin-or-signup.component';

describe('SigninOrSignupComponent', () => {
  let component: SigninOrSignupComponent;
  let fixture: ComponentFixture<SigninOrSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninOrSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninOrSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
