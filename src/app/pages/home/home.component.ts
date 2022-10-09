import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/firebase/database/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  public role:number;
  user : UserModel
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
    if(this.user){
      this.role = this.user.rolCode
    }
  }

}
