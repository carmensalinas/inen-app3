// import { Component } from '@angular/core';
// import { FormGroup, FormControl} from '@angular/forms';
// import { creaRadiologos } from 'src/firebase/auth/authentication';

// @Component({
//   selector: 'app-radiologos',
//   templateUrl: './radiologos.component.html',
//   styleUrls: ['./radiologos.component.css']
// })
// export class RadiologosComponent{
//   registerRadiologosForm = new FormGroup({
//     apellidos: new FormControl(''),
//     nombres: new FormControl(''),
//     numeroColegiatura : new FormControl(''),
//     numDocumento : new FormControl(''),
//     rolJefe : new FormControl(''),
//     correo : new FormControl(''),
//     password : new FormControl(''),
//     edad : new FormControl(''),
//     tipoDocumento : new FormControl(''),
//     tipoGenero :new FormControl(''),
//     telfijo :  new FormControl(''), 
//     telcel :  new FormControl(''),
//     direccion :new FormControl(''),
//     fecNacimiento :  new FormControl(''),
//     distrito :  new FormControl(''),
//     confirmarPassword :  new FormControl(''),
//     rolCode :  new FormControl(''),
//     fotoPerfil:  new FormControl('')
//   })

//   rolCodes : string = '3';
//   tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
//   tipoGeneros = ['Masculino', 'Femenino'];
//   distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];
  
//   constructor() { }

//   async registerRadiologos(){
//     let newRadiologos:any={
//       email: this.registerRadiologosForm.value.correo,
//       password: this.registerRadiologosForm.value.password,
//       rolCode: this.rolCodes,
//       apellidos: this.registerRadiologosForm.value.apellidos,
//       nombres: this.registerRadiologosForm.value.nombres,
//       numeroColegiatura : this.registerRadiologosForm.value.numeroColegiatura,
//       tipoDocumento: this.registerRadiologosForm.value.tipoDocumento,
//       numDocumento : this.registerRadiologosForm.value.numDocumento,
//       edad : this.registerRadiologosForm.value.edad,
//       tipoGenero : this.registerRadiologosForm.value.tipoGenero,
//       telfijo : this.registerRadiologosForm.value.telfijo, 
//       telcel : this.registerRadiologosForm.value.telcel,
//       direccion : this.registerRadiologosForm.value.direccion,
//       fecNacimiento : this.registerRadiologosForm.value.fecNacimiento,
//       distrito : this.registerRadiologosForm.value.distrito,
//       confirmarPassword : this.registerRadiologosForm.value.confirmarPassword,
//       fotoPerfil : this.registerRadiologosForm.value.fotoPerfil
//     }

//     const create = await creaRadiologos(newRadiologos)
//       if(create.success){
//         window.alert("Radiologo creado correctamente!")
//         //do -some
//       }else{
//         window.alert(create.message)
//       }
//     }

// }
