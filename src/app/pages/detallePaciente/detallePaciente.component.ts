import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FileItem } from './models/file-item';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
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

  registerPacientesForm = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    numDocumento : new FormControl(''),
    edad : new FormControl(''),
    tipoDocumento : new FormControl(''),
    tipoGenero :new FormControl(''),
    telfijo :  new FormControl(''), 
    telcel :  new FormControl(''),
    direccion :new FormControl(''),
    fecNacimiento :  new FormControl(''),
    distrito :  new FormControl(''),
    fotoPerfil:  new FormControl(''),
  })
  
  tipoDocumentos = ['DNI', 'Carnet de Extranjería', 'Pasaporte'];
  tipoGeneros = ['Masculino', 'Femenino'];
  distritos = ['Cercado de Lima', 'Breña', 'Miraflores', 'San Borja', 'Ventanilla'];
  constructor(private readonly storageSvc: StorageService) {}

  onUpload(): void {
    this.storageSvc.uploadImage(this.files);
  }


  ngOnInit(): void {

    let user = localStorage.getItem("user")
    console.log(user)
    if(user){
        this.userName = JSON.parse(user).nombres + " " + JSON.parse(user).apellidos
    }
  } 

















  // constructor(private storage:StorageService) { }

  // imagenes : any [] = [];
  // userName =''
  // ngOnInit(): void {

  //   let user = localStorage.getItem("user")
  //   console.log(user)
  //   if(user){
  //       this.userName = JSON.parse(user).nombres + " " + JSON.parse(user).apellidos
  //   }
  // }
  // cargarImagen(event : any){
  //   let archivos = event.target.files;
    
    
  //   for(let i=0; i<archivos.length; i++){
  //     let reader = new FileReader();
  //     reader.readAsDataURL(archivos[i]);
  //     reader.onloadend = () => {
  //     console.log(reader.result);
  //     this.imagenes.push(reader.result);  
  //     this.storage.subirImagen(this.userName+"_"+Date.now(),reader.result)    
  //       // .then(urlImagen){
  //       //   console.log(urlImagen)
  //             // let usuario ={
  //             //   name : "",
  //             //   imgProfile: urlImagen
  //             // }

  //       // }
  //     }
  //   }
    
  // }

}
