import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatToolbarModule, 
  MatAutocompleteModule,
  MatListModule ,
  MatStepperModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    PacienteComponent,
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    ReactiveFormsModule,
    modules
  ],
  exports: [
    modules
  ],
})
export class PacienteModule { }
