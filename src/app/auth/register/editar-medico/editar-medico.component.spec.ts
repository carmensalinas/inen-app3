import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { EditarMedicoComponent } from './editar-medico.component';

describe('EditarMedicoComponent', () => {
  let component: EditarMedicoComponent;
  let fixture: ComponentFixture<EditarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMedicoComponent ],
      imports: [ReactiveFormsModule], 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
