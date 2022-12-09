import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { obtenerPacienteDb, PacienteModel } from 'src/firebase/database/paciente';
import { obtenerReporteDb, obtenerResultDb, ReporteModel, ResultModel } from 'src/firebase/database/reporte';
import { HttpClient } from '@angular/common/http';
import { obtenerMedicoDb,UserModel } from 'src/firebase/database/users';

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
    email : "",
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

  medico:UserModel = {
    email: '',
    password:'',
    nombres: '',
    apellidos: '',
    rolCode:0,
    numeroColegiatura : 0,
    tipoDocumento: '',
    numDocumento : 0,
    edad : 0,
    tipoGenero : '',
    telfijo : 0, 
    telcel : '', 
    direccion : '',
    fotoPerfil: "",
    fecNacimiento : new Date(0), 
    distrito : '',
    primerRegistro : 0,
    status : true,
  }

  constructor(route: ActivatedRoute, private router:Router, private httpclien:HttpClient) {
    route.params.subscribe((params)=>{
      this.pacienteId = params["id"]
    })
  }

  async ngOnInit(): Promise<void> {
    this.paciente = await obtenerPacienteDb(this.pacienteId),
    this.reporte = await obtenerReporteDb(this.pacienteId),
    this.medico = await(obtenerMedicoDb(this.paciente.radiologo_id)),
    console.log(this.reporte);
    

    if(await obtenerResultDb(this.pacienteId)){
      this.result = await obtenerResultDb(this.pacienteId)
    }else{
      window.alert("El paciente no tiene un reporte generado aún.")
      this.router.navigate(['/lista-pacientes'])
    }
  }



  async enviarCorreo(){
 
    let params ={
      email: this.paciente.email,
      asunto: 'Reporte médico de ProstatApp',
      apellidos: this.paciente.apellidos,
      nombres: this.paciente.nombres,
      resultado: '\n'+ this.result.image,
      reporte: '\n'+this.reporte.detalle,
      radiologo: this.medico.apellidos + " "+this.medico.nombres
    }

    console.log(params);
    this.httpclien.post('http://localhost:3000/envio',params).subscribe(resp=>{
      window.alert("El reporte fue enviado al paciente")
      this.router.navigate(['/lista-pacientes'])
    })

  }
}
