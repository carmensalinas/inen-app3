import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorioComponent } from './pages/directorio/directorio.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaPacientesComponent } from './pages/lista-pacientes/lista-pacientes.component';
import { EditarHistorialComponent } from './pages/historial/editar-historial/editar-historial.component';


const routes: Routes = [
  {path: 'directorio', component: DirectorioComponent},
  {path: 'detallePaciente', loadChildren: () => import('./pages/detallePaciente/detallePaciente.module').then((m) => m.DetallePacienteModule)},
  {path : 'home', component: HomeComponent},
  {path: 'historialmedico', component: HistorialComponent},
  {path: 'editarhistorialmedico', component: EditarHistorialComponent},
  {path: 'lista-pacientes', component: ListaPacientesComponent},
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'paciente', loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
