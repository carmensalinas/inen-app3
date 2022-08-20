import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig)


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref()

  constructor() { }

  async subirImagen(nombreCompleto:string, imgBase64 :any){
    try {
      let respuesta = await this.storageRef.child("radiografías/"+nombreCompleto).putString(imgBase64, 'data_url');
      console.log(respuesta);
      //return await respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log(error)
      //return null;
    }
  }
}
