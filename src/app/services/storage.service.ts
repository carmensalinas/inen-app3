import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../pages/detallePaciente/models/file-item';
import { UserModel } from '../../../src/firebase/database/users';
firebase.initializeApp(environment.firebaseConfig)


@Injectable()
export class StorageService {
  

  constructor(private readonly storage: AngularFireStorage) {}

  private MEDIA_STORAGE_PATH ='Radiografías'

  ngOnInit(): void {
    
  }
  uploadImage(images: FileItem[]) {
    
    for (const item of images) {
      item.uploading = true;

      const filePath = this.generateFileName(item.name);
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);

      item.uploadPercent = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            item.downloadURL = fileRef.getDownloadURL();
            item.uploading = false;
          })
        )
        .subscribe();
    }
  }

  private generateFileName(name: string): string {
    let user = localStorage.getItem("user")
    
    if(user){
        this.MEDIA_STORAGE_PATH = JSON.parse(user).nombres + " " + JSON.parse(user).apellidos
    }
    console.log(this.MEDIA_STORAGE_PATH)
    return `${"Radiografías/"+this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }


  // storageRef = firebase.app().storage().ref()



  // async subirImagen(nombreCompleto:string, imgBase64 :any){
  //   try {
  //     let respuesta = await this.storageRef.child("radiografías/"+nombreCompleto).putString(imgBase64, 'data_url');
  //     console.log(respuesta);
  //     //return await respuesta.ref.getDownloadURL();
  //   } catch (error) {
  //     console.log(error)
  //     //return null;
  //   }
  // }
}
