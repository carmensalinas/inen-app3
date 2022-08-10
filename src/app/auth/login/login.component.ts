import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private auth : AuthService,
    private router : Router) { }
  

  ngOnInit(): void {
  }
  async onLogin(){
    console.log('Form ->', this.loginForm.value)
    const res = await this.auth.login(this.loginForm.value.email, this.loginForm.value.password).catch(error =>{
      console.log('error');
      alert("Usuario o contraseña incorrecta");
    })
    if(res){
      console.log('res -> ', res)
      this.router.navigate(['/home'])
    }
  }
}
