import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Seguimiento } from 'src/app/interfaces/seguimiento';



var listSeguimiento: Seguimiento[] = [
  {Numero: "1", Nombre: "Juan Perez", Edad: "60", Progreso: 100, Estado: "", Probabilidad: 20},
  {Numero: "2", Nombre: "Roger Aguila", Edad: "45", Progreso: 30, Estado: "", Probabilidad:0 },
  {Numero: "3", Nombre: "Jorge Rodriguez", Edad: "55", Progreso: 50, Estado: "", Probabilidad: 0},  
  {Numero: "4", Nombre: "Mario Casas", Edad: "50", Progreso: 40, Estado: "", Probabilidad: 0},  
  {Numero: "5", Nombre: "Jose Juda", Edad: "35", Progreso: 90, Estado: "", Probabilidad: 0},
  {Numero: "6", Nombre: "Dionisio Manrique", Edad: "75", Progreso: 10, Estado: "", Probabilidad: 0}

];


listSeguimiento.forEach(i => (i.Progreso==100)?i.Estado="Listo":i.Estado="En Progreso");






@Component({
  selector: 'app-seguimiento-paciente',
  templateUrl: './seguimiento-paciente.component.html',
  styleUrls: ['./seguimiento-paciente.component.css']
})
export class SeguimientoPacienteComponent implements OnInit {
  
  displayedColumns: string[] = ['Numero','Nombre', 'Edad', 'Progreso', 'Estado', 'Probabilidad'];

  dataSource = new MatTableDataSource(listSeguimiento);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  // applyFilter(event:Event){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
