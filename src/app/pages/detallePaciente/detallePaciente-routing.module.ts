import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallePacienteComponent } from './detallePaciente.component';


const routes: Routes = [{ path: '', component: DetallePacienteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetallePacienteRoutingModule { }
