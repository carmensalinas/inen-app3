import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPacienteComponent } from './seguimiento-paciente.component';

describe('SeguimientoPacienteComponent', () => {
  let component: SeguimientoPacienteComponent;
  let fixture: ComponentFixture<SeguimientoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
