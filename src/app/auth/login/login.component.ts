import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { loginApp } from 'src/firebase/auth/authentication';
import { UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  async login(){
    const {email, password} = this.loginForm.value
    const userLogged: UserModel = await loginApp(email,password)
    if(userLogged){
      localStorage.setItem("user",JSON.stringify(userLogged))
      window.alert("Bienvenido")
      window.location.href = userLogged.rolCode === 3? '/pacientes' : '/register'
    }else{
      window.alert("Usuario o contraseña incorrecta")
    }
  }

}

