import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserModel } from 'src/firebase/database/users';
// import { AuthService } from 'src/app/services/auth.service';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {
  public role:number =-1;
  public roleToManage:string="";
  constructor( private router : Router, private authfirebase : AngularFireAuth) { }
  user : UserModel
  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
    if(this.user){
      this.role = this.user.rolCode
      console.log("role es" + this.role);
      switch (this.role) {
        
        case 0:
          this.roleToManage = "Jefes"
          break;
        case 1:
          this.roleToManage = "Radiólogos"
          break;
        case 2:
          this.roleToManage = "Técnicos Radiólogos"
          break;

      }

    }

  }
  logout(){
    this.role=-1;
    
    localStorage.removeItem("user")
    this.authfirebase.signOut();
    window.location.href = '/home'
  }
}
