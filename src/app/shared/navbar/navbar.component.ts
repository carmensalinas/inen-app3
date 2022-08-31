import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public role:number =-1;
  public roleToManage:string="";
  constructor( private router : Router, private authfirebase : AngularFireAuth) { }

  ngOnInit(): void {
    const user = localStorage.getItem("user")
    if(user){
      this.role = JSON.parse(user).rolCode
      switch (this.role) {
        case 0:
          this.roleToManage = "Jefes"
          break;
        case 1:
          this.roleToManage = "Radiologos"
          break;
        case 2:
          this.roleToManage = "Tecnicos de Radiologia"
          break;
      }

    }

  }
  logout(){
    this.role=-1;
    this.authfirebase.signOut();
    localStorage.removeItem("user")
    window.location.href = '/home'
  }
}
