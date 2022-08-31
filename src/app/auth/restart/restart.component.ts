import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { confirmUser, UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})
export class RestartComponent {
  restartForm = new FormGroup({
    email: new FormControl(''),
  })

  constructor() { }

  async restart(){
    const {email} = this.restartForm.value
    const auth = getAuth();

    const user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
    const response = await sendPasswordResetEmail(auth, email).then(() => {
      window.alert("Se ha enviado un  correo para restablecer contraseña")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    if(user.email === email){
      await confirmUser(user.email)
      window.location.href = (user.rolCode === 2 || user.rolCode === 3) ? '/lista-pacientes' :'/register'
    }
    else{
      window.alert("El correo no coincide con el registrado en su usuario")
    }
  }


}
