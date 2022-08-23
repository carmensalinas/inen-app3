import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { crearPacienteDb, PacienteModel } from 'src/firebase/database/paciente';
import { obtenerRadiologosDb, UserModel } from 'src/firebase/database/users';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent{
  registerPacientesForm = new FormGroup({
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

  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino', 'Femenino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];

  imagenes : any [] = [];

  radiologos : UserModel[] = [];
  
  constructor(private router: Router) { }

  async ngOnInit() {
    this.radiologos = await obtenerRadiologosDb()
  }
  
  async registerPacientes(){
    let nuevoPaciente:PacienteModel={
      apellidos: this.registerPacientesForm.value.apellidos,
      nombres: this.registerPacientesForm.value.nombres,
      tipoDocumento: this.registerPacientesForm.value.tipoDocumento,
      numDocumento : this.registerPacientesForm.value.numDocumento,
      edad : this.registerPacientesForm.value.edad,
      tipoGenero : this.registerPacientesForm.value.tipoGenero,
      telfijo : this.registerPacientesForm.value.telfijo, 
      telcel : this.registerPacientesForm.value.telcel,
      direccion : this.registerPacientesForm.value.direccion,
      fecNacimiento : this.registerPacientesForm.value.fecNacimiento,
      distrito : this.registerPacientesForm.value.distrito,
      radiologo_id: this.registerPacientesForm.value.radiologo_id
    } 
    const error = this.validarCamposPaciente(nuevoPaciente)
    if(error) return window.alert(error)
    if(await crearPacienteDb(nuevoPaciente)){
      window.alert("Paciente registrado correctamente!")
      this.router.navigate(['/lista-pacientes'])
    }else{
      window.alert("Ocurrió un error al crear el paciente")
    }

  }

  validarCamposPaciente(paciente:PacienteModel):string{
    if(!paciente.nombres) return "El nombre es requerido"
    if(!paciente.numDocumento) return "El número de documento es requerido"
    if(!paciente.radiologo_id) return "El radiólogo asignado es requerido"
    return ""
  }

}
