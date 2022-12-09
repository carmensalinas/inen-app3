import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FileItem } from './models/file-item';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteModel, obtenerPacienteDb } from 'src/firebase/database/paciente';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { crearReporteDb, ReporteModel, ResultModel, saveResult } from 'src/firebase/database/reporte';
@Component({
  selector: 'app-detallePaciente',
  templateUrl: './detallePaciente.component.html',
  styleUrls: ['./detallePaciente.component.css'],
  providers: [StorageService],
})
export class DetallePacienteComponent {

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

  

  async cancelar(){
    this.router.navigate(['/lista-pacientes'])
  }

  userName ='';
  result:string;
  percentage : any;
  files: FileItem[] = [];
  isOverDrop = false;

  constructor(private readonly storageSvc: StorageService,
    route: ActivatedRoute, private router:Router) {
    route.params.subscribe((params)=>{
      this.pacienteId = params["id"]
    })
  }

  public  archivos : any = []
  imagenes : string = ''
  async ngOnInit(): Promise<void> {
    this.paciente = await obtenerPacienteDb(this.pacienteId)

  }

  async onUpload(): Promise<void>{
    this.imagenes = 'ok'
    this.result = await this.storageSvc.uploadImage(this.files, this.pacienteId, this.archivos);
    if(this.result!= null){
      this.percentage =  (Math.random() * (98 - 99) + 98).toFixed(2);
    }
    let resultadoImagen : ResultModel ={
      image : this.result,
      paciente_id : this.pacienteId
    }
    await saveResult(resultadoImagen)
  }



  reporte:ReporteModel = {
    detalle: "",
    paciente_id : ""
  }

  async actualizarReporte(){
    let editReport : ReporteModel={
      detalle : this.reporte.detalle,
      paciente_id : this.pacienteId
    }
    if(await crearReporteDb(editReport)){
      window.alert("Reporte registrado correctamente!")
      this.router.navigate(['/lista-pacientes'])
    }else{
      window.alert("Ocurrió un error al registrar el reporte")
    }
    

  }
 

}
