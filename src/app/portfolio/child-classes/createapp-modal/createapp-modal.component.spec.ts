import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappModalComponent } from './createapp-modal.component';

describe('CreateappModalComponent', () => {
  let component: CreateappModalComponent;
  let fixture: ComponentFixture<CreateappModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateappModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateappModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
