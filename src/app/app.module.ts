import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { DetallePacienteComponent } from './pages/detallePaciente/detallePaciente.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { SeguimientoPacienteComponent } from './pages/seguimiento-paciente/seguimiento-paciente.component';
import { DirectorioComponent } from './pages/directorio/directorio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HistorialComponent } from './pages/historial/historial.component';
import { ListaPacientesComponent } from './pages/pacientes/lista-pacientes/lista-pacientes.component';
import { NuevoPacienteComponent } from './pages/pacientes/nuevo-paciente/nuevo-paciente.component';
import { EditarHistorialComponent } from './pages/historial/editar-historial/editar-historial.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NavbarComponent } from './shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    DetallePacienteComponent,
    PacientesComponent,
    SeguimientoPacienteComponent,
    DirectorioComponent,
    PerfilComponent,
    HomeComponent,
    HistorialComponent,
    ListaPacientesComponent,
    NuevoPacienteComponent,
    EditarHistorialComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage())
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}