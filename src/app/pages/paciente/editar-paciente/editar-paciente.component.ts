import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { actualizarPacienteDb, crearPacienteDb, obtenerPacienteDb, PacienteModel } from 'src/firebase/database/paciente';
import { getUser, obtenerRadiologosDb, UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css'],
  providers: [StorageService],
})
export class EditarPacienteComponent implements OnInit {

  editPacientesForm = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    numDocumento : new FormControl(''),
    rolPaciente : new FormControl(''),
    correo : new FormControl(''),
    password : new FormControl(''),
    edad : new FormControl(''),
    tipoDocumento : new FormControl(''),
    tipoGenero :new FormControl(''),
    telfijo :  new FormControl(''), 
    telcel :  new FormControl(''),
    direccion :new FormControl(''),
    fecNacimiento :  new FormControl(''),
    distrito :  new FormControl(''),
    confirmarPassword :  new FormControl(''),
    fotoPerfil:  new FormControl(''),
    radiologo_id: new FormControl('')
  })
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

  radiologo:UserModel = {
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
  }
  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];

  radiologos : UserModel[] = [];


  constructor(private readonly storageSvc: StorageService,
    route: ActivatedRoute, private router:Router) {
    route.params.subscribe((params)=>{
      this.pacienteId = params["id"]
    })
  }

  
  async ngOnInit(){
    this.radiologos = await obtenerRadiologosDb()
    this.paciente = await obtenerPacienteDb(this.pacienteId)
    this.radiologo = await getUser(this.paciente.radiologo_id)
  }
  
  async actualizarPacientes(){
    let editadoPaciente:PacienteModel={
      apellidos: this.editPacientesForm.value.apellidos,
      nombres: this.editPacientesForm.value.nombres,
      tipoDocumento: this.editPacientesForm.value.tipoDocumento,
      numDocumento : this.editPacientesForm.value.numDocumento,
      edad : this.editPacientesForm.value.edad,
      tipoGenero : this.editPacientesForm.value.tipoGenero,
      telfijo : this.editPacientesForm.value.telfijo, 
      telcel : this.editPacientesForm.value.telcel,
      direccion : this.editPacientesForm.value.direccion,
      fecNacimiento : this.editPacientesForm.value.fecNacimiento,
      distrito : this.editPacientesForm.value.distrito,
      radiologo_id: this.editPacientesForm.value.radiologo_id,
      id: this.paciente.id
    }
  
  

    const error = this.validarCamposPaciente(editadoPaciente)
    if(error) return window.alert(error)
    if(await actualizarPacienteDb(editadoPaciente)){
      window.alert("Se guardaron los cambios del paciente!")
      this.router.navigate(['/lista-pacientes'])
    }else{
      window.alert("Ocurrió un error al crear el paciente")
    }

  }

  async cancelar(){
    this.router.navigate(['/lista-pacientes'])
  }

  validarCamposPaciente(paciente:PacienteModel):string{
    if(!paciente.nombres) return "El nombre es requerido"
    if(!paciente.numDocumento) return "El número de documento es requerido"
    if(!paciente.radiologo_id) return "El radiólogo asignado es requerido"
    return ""
  }


}
