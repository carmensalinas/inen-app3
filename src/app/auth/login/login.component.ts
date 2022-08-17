import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { loginApp } from 'src/firebase/auth/authentication';

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
    const logged = await loginApp(email,password)
    if(logged){
      console.log("user=>",logged.role)
      window.alert("Bienvenido")
      this.router.navigate(['/lista-pacientes'])
    }else{
      window.alert("Usuario o contraseña incorrecta")
    }
  }

 

}


// export const prueba = async (a:string) =>{
//   const logged = ''
//   return 'd'
// }