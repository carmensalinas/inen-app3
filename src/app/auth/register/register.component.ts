import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { loginApp, signInApp } from 'src/firebase/auth/authentication';
// import { prueba } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerJefesForm = new FormGroup({
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
    fotoPerfil:  new FormControl(''),
  })


  rolCodes : string = '1';
  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino', 'Femenino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];
  
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  // registerJefes(){
  // console.log('Form ->', this.registerJefesForm.value)
  // }

  async registerJefes(){
    let newDoctor:any={
      email: this.registerJefesForm.value.correo,
      password: this.registerJefesForm.value.password,
      rolCode: this.rolCodes,
      apellidos: this.registerJefesForm.value.apellidos,
      nombres: this.registerJefesForm.value.nombres,
      numeroColegiatura : this.registerJefesForm.value.numeroColegiatura,
      tipoDocumento: this.registerJefesForm.value.tipoDocumento,
      numDocumento : this.registerJefesForm.value.numDocumento,
      edad : this.registerJefesForm.value.edad,
      tipoGenero : this.registerJefesForm.value.tipoGenero,
      telfijo : this.registerJefesForm.value.telfijo, 
      telcel : this.registerJefesForm.value.telcel,
      direccion : this.registerJefesForm.value.direccion,
      fecNacimiento : this.registerJefesForm.value.fecNacimiento,
      distrito : this.registerJefesForm.value.distrito,
      confirmarPassword : this.registerJefesForm.value.confirmarPassword,
      fotoPerfil : this.registerJefesForm.value.fotoPerfil
    }
    //const caa = this.prueba.datosUser()
    //console.log('Form ->', caa)
    // const x = await prueba('')

    const create = await signInApp(newDoctor)
      if(create.success){
        window.alert("Creado correctamente!")
        //do -some
      }else{
        window.alert(create.message)
      }
    }

}
