import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrModifyOpinionComponent } from './create-or-modify-opinion.component';

describe('CreateOrModifyOpinionComponent', () => {
  let component: CreateOrModifyOpinionComponent;
  let fixture: ComponentFixture<CreateOrModifyOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrModifyOpinionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrModifyOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
