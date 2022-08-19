import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
// import { creaPaciente} from 'src/firebase/auth/authentication';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent{
  registerPacientesForm = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    numeroColegiatura : new FormControl(''),
    numDocumento : new FormControl(''),
    rolJefe : new FormControl(''),
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
    rolCode :  new FormControl(''),
    fotoPerfil:  new FormControl('')
  })

  rolCodes : string = '3';
  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino', 'Femenino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];
  
  constructor() { }

  async registerPacientes(){
    let newPaciente:any={
      email: this.registerPacientesForm.value.correo,
      password: this.registerPacientesForm.value.password,
      rolCode: this.rolCodes,
      apellidos: this.registerPacientesForm.value.apellidos,
      nombres: this.registerPacientesForm.value.nombres,
      numeroColegiatura : this.registerPacientesForm.value.numeroColegiatura,
      tipoDocumento: this.registerPacientesForm.value.tipoDocumento,
      numDocumento : this.registerPacientesForm.value.numDocumento,
      edad : this.registerPacientesForm.value.edad,
      tipoGenero : this.registerPacientesForm.value.tipoGenero,
      telfijo : this.registerPacientesForm.value.telfijo, 
      telcel : this.registerPacientesForm.value.telcel,
      direccion : this.registerPacientesForm.value.direccion,
      fecNacimiento : this.registerPacientesForm.value.fecNacimiento,
      distrito : this.registerPacientesForm.value.distrito,
      confirmarPassword : this.registerPacientesForm.value.confirmarPassword,
      fotoPerfil : this.registerPacientesForm.value.fotoPerfil
    }

    // const create = await creaPaciente(newPaciente)
    //   if(create.success){
    //     window.alert("Paciente creado correctamente!")
    //     //do -some
    //   }else{
    //     window.alert(create.message)
    //   }
    }

}
