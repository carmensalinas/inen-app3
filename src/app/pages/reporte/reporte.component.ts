import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { obtenerPacienteDb, PacienteModel } from 'src/firebase/database/paciente';
import { obtenerReporteDb, obtenerResultDb, ReporteModel, ResultModel } from 'src/firebase/database/reporte';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  pacienteId:"";
  paciente:PacienteModel = {
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numDocumento : 0,
    edad : 0,
    tipoGenero : "",
    telfijo : 0, 
    telcel : "", 
    direccion : "",
    fecNacimiento : new Date(0), 
    distrito : "",
    radiologo_id: "",
  }

  editReporteForm = new FormGroup({
    detalle: new FormControl(''),
  })

  reporte:ReporteModel = {
    detalle: "",
    paciente_id : ""
  }
  result : ResultModel={
    image:"",
    paciente_id:""
  }

  constructor(route: ActivatedRoute, private router:Router) {
    route.params.subscribe((params)=>{
      this.pacienteId = params["id"]
    })
  }

  async ngOnInit(): Promise<void> {
    this.paciente = await obtenerPacienteDb(this.pacienteId),
    this.reporte = await obtenerReporteDb(this.pacienteId),
    console.log(this.reporte);
    this.result = await obtenerResultDb(this.pacienteId)
  }


}
