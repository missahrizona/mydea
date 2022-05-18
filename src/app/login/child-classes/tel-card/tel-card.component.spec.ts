import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelCardComponent } from './tel-card.component';

describe('TelCardComponent', () => {
  let component: TelCardComponent;
  let fixture: ComponentFixture<TelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
