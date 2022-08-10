import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { signInApp } from 'src/firebase/auth/authentication';
import { UserFields } from 'src/firebase/database/users';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  myGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor() { }

  ngOnInit(): void {
  }
  async registerDoctor(){
    // const doctorFields = this.myGroup.value
    // const newDoctor:UserFields={
    //   email:doctorFields.email,
    //   password:doctorFields.password,
    //   name:doctorFields.name,
    //   last_name:doctorFields.last_name,
    //   dni:doctorFields.dni,
    //   gender:doctorFields.gender,
    //   telephone:doctorFields.telephone,
    //   colegiatura:doctorFields.colegiatura,
    //   birth_date:doctorFields.birth_date,
    //   role_id:doctorFields.role_id
    // }
    let newDoctor:any={
      email:"user2@test.com",
      password:"password",
      role_id: "jijijija"
    }
    const create = await signInApp(newDoctor)
    if(create.success){
      window.alert("Creado correctamente!")
      //do -some
    }else{
      window.alert(create.message)
    }
  }
}
