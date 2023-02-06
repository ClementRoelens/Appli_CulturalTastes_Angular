import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeToolTIpComponentComponent } from './swipe-tool-tip-component.component';

describe('SwipeToolTIpComponentComponent', () => {
  let component: SwipeToolTIpComponentComponent;
  let fixture: ComponentFixture<SwipeToolTIpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeToolTIpComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipeToolTIpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
