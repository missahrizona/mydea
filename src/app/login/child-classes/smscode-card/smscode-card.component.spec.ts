import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmscodeCardComponent } from './smscode-card.component';

describe('SmscodeCardComponent', () => {
  let component: SmscodeCardComponent;
  let fixture: ComponentFixture<SmscodeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmscodeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmscodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
