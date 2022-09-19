import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { loginApp, signInApp } from 'src/firebase/auth/authentication';
import { UserModel } from 'src/firebase/database/users';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

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
  })

  
  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino', 'Femenino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];
  
  roleToManage:string = "";
  userRolCode!:number

  
  constructor(private router : Router, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  uploadPercent!: Observable<any>;
  urlImage:Observable<string>;

  ngOnInit(): void {
    const user = localStorage.getItem("user")
    if(user){
      switch (JSON.parse(user).rolCode) {
        case 0:
          this.roleToManage = "Jefe de radiologos"
          this.userRolCode = 1
          break;
        case 1:
          this.roleToManage = "Radiologo"
          this.userRolCode = 2
          break;
        case 2:
          this.roleToManage = "Tecnico radiologo"
          this.userRolCode = 3
          break;
      }
    } 
  }



  async registerUser(){
    let newUser:UserModel={
      email: this.registerJefesForm.value.correo,
      password: this.registerJefesForm.value.password,
      rolCode: this.userRolCode,
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
      fotoPerfil : this.inputImageUser.nativeElement.value
    }

    const create = await signInApp(newUser)
    if(create.success){
      window.alert("Creado correctamente!")
      this.router.navigate(['/home'])
      //do -some
    }else{
      window.alert(create.message)
    }
  }


  onFileChange(event:any) {
    const file = event.target.files[0];
    const user = this.registerJefesForm.value.correo;
    const filePath= `Usuarios/${user}/${file.name.replace(" ", "")}`
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    console.log(this.uploadPercent);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();


  }

    
}
