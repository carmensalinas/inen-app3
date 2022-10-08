import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actualizarStatusMedicoDb, obtenerMedicoDb, obtenerMedicosDb, UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  constructor(private router:Router) { }

  show: boolean = true;

  medicoGuardado:UserModel = {
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
    status : true,
  }
  filterMedico = '';
  medicos: UserModel[] =  []
  user : UserModel
  async ngOnInit(): Promise<void> {
      this.user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
      this.medicos = await obtenerMedicosDb()
      // for(let medico of this.medicos){
      //   if(medico.rolCode==3){
      //     console.log(medico);
      //     medico.push('Técnico');
      //   }
      //   else if(medico.rolCode==2){
      //     listaRoles.push("Radiólogo");
      //   }
      // }

  }




  async desactivar(idMedico:string){
    this.medicoGuardado = await obtenerMedicoDb(idMedico);
    this.medicoGuardado.status = false;
    if(await actualizarStatusMedicoDb(this.medicoGuardado)){
      console.log("Se actualizó el status del médico ",this.medicoGuardado.email, " a desactivado",this.medicoGuardado.status );
      window.alert("Se desactivó al médico: "+this.medicoGuardado.nombres+ " "+ this.medicoGuardado.apellidos)
      window.location.reload()
    }else{
      window.alert("Ocurrió un error al desactivar médico")
    }
    
  }
}
