import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-detallePaciente',
  templateUrl: './detallePaciente.component.html',
  styleUrls: ['./detallePaciente.component.css']
})
export class DetallePacienteComponent {

  constructor(private storage:StorageService) { }

  imagenes : any [] = [];
  userName =''
  ngOnInit(): void {

    let user = localStorage.getItem("user")
    console.log(user)
    if(user){
        this.userName = JSON.parse(user).nombres + " " + JSON.parse(user).apellidos
    }
  }
  cargarImagen(event : any){
    let archivos = event.target.files;
    
    
    for(let i=0; i<archivos.length; i++){
      let reader = new FileReader();
      reader.readAsDataURL(archivos[i]);
      reader.onloadend = () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);  
      this.storage.subirImagen(this.userName+"_"+Date.now(),reader.result)    
        // .then(urlImagen){
        //   console.log(urlImagen)
              // let usuario ={
              //   name : "",
              //   imgProfile: urlImagen
              // }

        // }
    }
    }
    
  }

}