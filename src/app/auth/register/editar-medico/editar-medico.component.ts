import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { actualizarMedicoDb, getUser, obtenerMedicoDb, UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.css'],
  providers: [StorageService]
})
export class EditarMedicoComponent implements OnInit {

  editMedicoForm = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    numDocumento : new FormControl(''),
    rolCode : new FormControl(''),
    email : new FormControl(''),
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
    radiologo_id: new FormControl(''),
    numeroColegiatura: new FormControl(''),
    fotoPerfil: new FormControl(''),
    fotoPerfilRaw: new FormControl(''),
  })
  medicoId:"";
  medico:UserModel = {
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
  esJefe: boolean = false;
  radiologos : UserModel[] = [];
  roleToManage:string = "";
  userRolCode!:number

  constructor(private storage: AngularFireStorage,
    route: ActivatedRoute, private router:Router) {
    route.params.subscribe((params)=>{
      this.medicoId = params["id"]
    })
  }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  uploadPercent!: Observable<any>;
  urlImage:Observable<string>;
  
  async ngOnInit(){
    this.medico = await obtenerMedicoDb(this.medicoId)
    const user = localStorage.getItem("user")
    if(user){
      switch (JSON.parse(user).rolCode) {
        case 0:
          this.roleToManage = "Jefe de radiologos"
          this.userRolCode = 1
          this.esJefe = true
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
  
  async actualizarMedicos(){
    let editadoMedico:UserModel={
      apellidos: this.editMedicoForm.value.apellidos,
      nombres: this.editMedicoForm.value.nombres,
      tipoDocumento: this.editMedicoForm.value.tipoDocumento,
      numDocumento : this.editMedicoForm.value.numDocumento,
      edad : this.editMedicoForm.value.edad,
      tipoGenero : this.editMedicoForm.value.tipoGenero,
      telfijo : this.editMedicoForm.value.telfijo, 
      telcel : this.editMedicoForm.value.telcel,
      direccion : this.editMedicoForm.value.direccion,
      fecNacimiento : this.editMedicoForm.value.fecNacimiento,
      distrito : this.editMedicoForm.value.distrito,
      email: this.medicoId,
      password: this.editMedicoForm.value.password,
      rolCode: this.editMedicoForm.value.rolCode,
      numeroColegiatura: this.editMedicoForm.value.numeroColegiatura
    }
  
  
    
    const error = this.validarCamposPaciente(editadoMedico)
    if(error) return window.alert(error)
    if(await actualizarMedicoDb(editadoMedico)){
      window.alert("Se guardaron los cambios del paciente!")
      this.router.navigate(['/directorio'])
    }else{
      window.alert("Ocurrió un error al actualizar médico")
    }

  }

  async cancelar(){
    this.router.navigate(['/directorio'])
  }

  validarCamposPaciente(medico:UserModel):string{
    if(!medico.nombres) return "El nombre es requerido"
    if(!medico.numDocumento) return "El número de documento es requerido"
    if(!medico.email) return "El radiólogo asignado es requerido"
    return ""
  }

  onFileChange(event:any) {
    const file = event.target.files[0];
    const user = this.editMedicoForm.value.email;
    const filePath= `Usuarios/${user}/${file.name.replace(" ", "")}`
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();


  }

}
