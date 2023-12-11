import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadPageComponent } from './preload-page.component';

describe('PreloadPageComponent', () => {
  let component: PreloadPageComponent;
  let fixture: ComponentFixture<PreloadPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreloadPageComponent]
    });
    fixture = TestBed.createComponent(PreloadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
