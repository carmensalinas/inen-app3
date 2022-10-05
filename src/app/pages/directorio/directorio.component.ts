import { Component, OnInit } from '@angular/core';
import { obtenerMedicosDb, obtenerRadiologosDb, UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  constructor() { }

  show: boolean = true;


  filterMedico = '';
  medicos: UserModel[] =  []
  rolName: string = '';
  async ngOnInit(): Promise<void> {
      const user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
      this.medicos = await obtenerMedicosDb()
      this.getRolName()
  }
  getRolName(){
    for(let medico of this.medicos){
      if(medico.rolCode==3){
        console.log(medico);
        this.rolName = "Técnico"
      }
      else if(medico.rolCode==2){
        this.rolName = "Radiólogo"
      }
      else{
        this.rolName = "doctor"
      }
    }
    return this.rolName;
  }
  desactivar(idMedico:any){
    console.log("id de medico es: ",idMedico);
  }
}
