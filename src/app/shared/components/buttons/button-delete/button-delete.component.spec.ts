import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDeleteComponent } from './button-delete.component';

describe('ButtonDeleteComponent', () => {
  let component: ButtonDeleteComponent;
  let fixture: ComponentFixture<ButtonDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonDeleteComponent]
    });
    fixture = TestBed.createComponent(ButtonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
