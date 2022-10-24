import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOpinionComponent } from './new-opinion.component';

describe('NewOpinionComponent', () => {
  let component: NewOpinionComponent;
  let fixture: ComponentFixture<NewOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOpinionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
