import { Component, OnInit } from '@angular/core';
import { obtenerPacientesDb, PacienteModel } from 'src/firebase/database/paciente';
import { UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

    constructor() { }

    pacientes: PacienteModel[] =  []
    filterPaciente = '';
    async ngOnInit(): Promise<void> {
        const user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
        this.pacientes = await obtenerPacientesDb(user.rolCode === 2? user.email : "")
    }

}
