import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  constructor() { }

  pacientes =  [
    {
        id: '1',  
        nombre: 'Jose Carhuas Méndez',
        fechreg: '02/05/2022',
        fechnac: '09/09/2000',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png'
    },
    {
        id: '2',  
        nombre: 'Maria Avelino Briceño',
        fechreg: '09/15/2021',
        fechnac: '03/07/1989',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/26.png'
    },
    {
        id: '3',  
        nombre: 'Ricardo Merino Zapata',
        fechreg: '29/01/2021',
        fechnac: '08/13/2001',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/27.png'
    },
    {
        id: '4',        
        nombre: 'Andrea Castillo Lopez',
        fechreg: '06/14/2020',
        fechnac: '07/23/1998',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/24.png'
    },
    {
        nombre: 'Juan Lopez Arce',
        fechreg: '29/10/2019',
        fechnac: '14/09/2000',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/23.png'
    },
    {
        nombre: 'Guillermo Fernandez Jimenez',
        fechreg: '03/14/2019',
        fechnac: '03/07/1989',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/22.png'
    },
    {
        nombre: 'Arturo Carrillo Meza',
        fechreg: '28/07/2019',
        fechnac: '08/13/2001',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/21.png'
    },
    {
        nombre: 'Doris Huaman Castro',
        fechreg: '12/11/2017',
        fechnac: '11/09/1986',
        foto: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/29.png'
    }
  ]
  
  ngOnInit(): void {
  }

}
