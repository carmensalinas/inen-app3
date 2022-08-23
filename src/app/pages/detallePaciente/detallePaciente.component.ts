import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FileItem } from './models/file-item';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PacienteModel, obtenerPacienteDb } from 'src/firebase/database/paciente';
@Component({
  selector: 'app-detallePaciente',
  templateUrl: './detallePaciente.component.html',
  styleUrls: ['./detallePaciente.component.css'],
  providers: [StorageService],
})
export class DetallePacienteComponent {

  userName ='';
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

  async ngOnInit(): Promise<void> {
    this.paciente = await obtenerPacienteDb(this.pacienteId)
  }

  onUpload(): void {
    this.storageSvc.uploadImage(this.files, this.pacienteId);
  }

 

}
