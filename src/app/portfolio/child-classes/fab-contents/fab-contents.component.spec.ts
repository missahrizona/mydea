import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabContentsComponent } from './fab-contents.component';

describe('FabContentsComponent', () => {
  let component: FabContentsComponent;
  let fixture: ComponentFixture<FabContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
