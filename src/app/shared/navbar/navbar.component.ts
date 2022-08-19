import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public role:number =-1;
  public roleToManage:string="";
  constructor(private auth:AuthService, private router : Router) { }

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
    this.auth.logouth()
    window.location.href = '/login'
  }
}
