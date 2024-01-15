import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUpdateComponent } from './button-update.component';

describe('ButtonUpdateComponent', () => {
  let component: ButtonUpdateComponent;
  let fixture: ComponentFixture<ButtonUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonUpdateComponent]
    });
    fixture = TestBed.createComponent(ButtonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
