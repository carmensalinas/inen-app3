import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgDominicodeFilesDirective } from './directives/ng-dominicode-files.directive';
import { DetallePacienteComponent } from './detallePaciente.component';
import { DetallePacienteRoutingModule } from './detallePaciente-routing.module';


@NgModule({
  declarations: [DetallePacienteComponent, NgDominicodeFilesDirective],
  imports: [
    CommonModule,
    DetallePacienteRoutingModule,
    MatToolbarModule
  ]
})
export class DetallePacienteModule { }
