import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologosComponent } from './radiologos.component';

describe('RadiologosComponent', () => {
  let component: RadiologosComponent;
  let fixture: ComponentFixture<RadiologosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
