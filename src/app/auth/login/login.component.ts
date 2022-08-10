import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
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
  constructor() { }

  ngOnInit(): void {
  }

  async login(){
    const {email, password} = this.loginForm.value
    const logged = await loginApp(email,password)
    if(logged){
      window.alert("Welcome")
      //do something
    }else{
      window.alert("contraseña incorrecta")
    }
  }

}
