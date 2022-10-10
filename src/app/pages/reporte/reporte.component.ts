import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { obtenerPacienteDb, PacienteModel } from 'src/firebase/database/paciente';
import { ReporteModel } from 'src/firebase/database/reporte';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  pacienteId:"";
  paciente : PacienteModel;

  editReporteForm = new FormGroup({
    apellidos: new FormControl(''),
  })

  reporte:ReporteModel = {
    apellidos: "",
  }

  //private readonly storageSvc: StorageService,
  constructor(route: ActivatedRoute, private router:Router) {
    route.params.subscribe((params)=>{
      this.pacienteId = params["id"]
    })
  }

  async ngOnInit(): Promise<void> {
    this.paciente = await obtenerPacienteDb(this.pacienteId)
  }

  async actualizarReporte(){

    

  }

  async cancelar(){
    this.router.navigate(['/lista-pacientes'])
  }
}
