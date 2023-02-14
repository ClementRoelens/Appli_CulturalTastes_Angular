import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationDialogComponent } from './presentation-dialog.component';

describe('SwipeToolTIpComponentComponent', () => {
  let component: PresentationDialogComponent;
  let fixture: ComponentFixture<PresentationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
