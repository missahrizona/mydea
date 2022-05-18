import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaynameCardComponent } from './displayname-card.component';

describe('DisplaynameCardComponent', () => {
  let component: DisplaynameCardComponent;
  let fixture: ComponentFixture<DisplaynameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaynameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaynameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
