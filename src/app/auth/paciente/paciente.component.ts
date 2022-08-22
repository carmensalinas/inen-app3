import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/firebase/database/users';
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
    rolCode :  new FormControl(''),
    fotoPerfil:  new FormControl('')
  })

  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino', 'Femenino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];
  roleToManage:string = "";
  userRolCode = 3;
  imagenes : any [] = [];
  userName ='';

  constructor(private storage:StorageService) { }

  ngOnInit(): void {
    const user = localStorage.getItem("user")
    if(user){
      switch (JSON.parse(user).rolCode) {
        case 3:
          this.roleToManage = "Paciente"
          break;
      }
    } 


      console.log(user)
      if(user){
          this.userName = "Paciente"+JSON.parse(user).nombres + " " + JSON.parse(user).apellidos
      }
  }
  async registerPacientes(){
    let newPaciente:any={
      email: this.registerPacientesForm.value.correo,
      password: this.registerPacientesForm.value.password,
      rolCode: this.userRolCode,
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





    // cargarImagen(event : any){
    //   let archivos = event.target.files;

    //   for(let i=0; i<archivos.length; i++){
    //     let reader = new FileReader();
    //     reader.readAsDataURL(archivos[i]);
    //     reader.onloadend = () => {
    //     console.log(reader.result);
    //     this.imagenes.push(reader.result);  
    //     this.storage.subirImagen(this.userName+"_"+Date.now(),reader.result)
    //     // .then(urlImagen){
    //     //     console.log(this.urlImagen)
    //     //         // let usuario ={
    //     //         //   name : "",
    //     //         //   imgProfile: urlImagen
    //     //         // }
  
    //     //   };
    //     }
    //   }

    // }
}
