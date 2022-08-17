import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { loginApp, signInApp } from 'src/firebase/auth/authentication';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerJefesForm = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    numeroColegiatura : new FormControl(''),
    numDocumento : new FormControl(''),
    rolCode : new FormControl('1'),
    correo : new FormControl(''),
    password : new FormControl(''),
    edad : new FormControl(''),
    tipoDocumento :new FormControl(''),
    sexo : new FormControl(''),
    telfijo :  new FormControl(''), 
    telcel :  new FormControl(''),
    direccion :new FormControl(''),
    fecNacimiento :  new FormControl(''),
    distrito :  new FormControl('')
  })
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
      role_id: this.registerJefesForm.value.rolCode,
      apellidos: this.registerJefesForm.value.apellidos,
      nombres: this.registerJefesForm.value.nombres,
      numeroColegiatura : this.registerJefesForm.value.numeroColegiatura,
      tipoDocumento: this.registerJefesForm.value.tipoDocumento,
      numDocumento : this.registerJefesForm.value.numDocumento,
      edad : this.registerJefesForm.value.edad,
      sexo : this.registerJefesForm.value.sexo,
      telfijo : this.registerJefesForm.value.telfijo, 
      telcel : this.registerJefesForm.value.telcel,
      direccion : this.registerJefesForm.value.direccion,
      fecNacimiento : this.registerJefesForm.value.fecNacimiento,
      distrito : this.registerJefesForm.value.distrito
    }
  const create = await signInApp(newDoctor)
    if(create.success){
      window.alert("Creado correctamente!")
      //do -some
    }else{
      window.alert(create.message)
    }
  }

}
