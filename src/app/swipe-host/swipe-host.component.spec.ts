import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeHostComponent } from './swipe-host.component';

describe('SwipeHostComponent', () => {
  let component: SwipeHostComponent;
  let fixture: ComponentFixture<SwipeHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
