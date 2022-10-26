import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallePacienteComponent } from './detallePaciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
const routes: Routes = [{ path: ':id', component: DetallePacienteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes),
            FormsModule,
            ReactiveFormsModule],
  declarations: [
      
  ],
  bootstrap: [],
  exports: [RouterModule,
    ReactiveFormsModule]
})
export class DetallePacienteRoutingModule { }
