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

  ngOnInit(): void {
    
  }
  uploadImage(images: FileItem[], paciente_id:string) {
    
    for (const item of images) {
      item.uploading = true;

      const filePath = `${"Radiografías/"+paciente_id}/${new Date().getTime()}_${item.name}`;
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

}
