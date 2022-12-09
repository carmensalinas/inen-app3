import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProstataService {

  private url : string = "http://34.125.170.113:5000/model/predict/";
  constructor() { }

  postProstata(){
    //return this.http.post(this.url,)
  }
}
