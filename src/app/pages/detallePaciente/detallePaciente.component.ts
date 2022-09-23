import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FileItem } from './models/file-item';
import { ActivatedRoute } from '@angular/router';
import { PacienteModel, obtenerPacienteDb } from 'src/firebase/database/paciente';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-detallePaciente',
  templateUrl: './detallePaciente.component.html',
  styleUrls: ['./detallePaciente.component.css'],
  providers: [StorageService],
})
export class DetallePacienteComponent {

  userName ='';
  result:string;
  files: FileItem[] = [];
  isOverDrop = false;
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
    fecNacimiento : new Date(), 
    distrito : "",
    radiologo_id: "",
  }

  constructor(
    private readonly storageSvc: StorageService,
    route: ActivatedRoute
  ) {
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
  }


 

}
