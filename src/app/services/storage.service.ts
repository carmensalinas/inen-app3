import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../pages/detallePaciente/models/file-item';
import { HttpClient } from '@angular/common/http';
firebase.initializeApp(environment.firebaseConfig)


@Injectable()
export class StorageService {
  

  constructor(private readonly storage: AngularFireStorage,
    private http: HttpClient) {}

  ngOnInit(): void {
    
  }

  resultados : any = []
  imagenesProstata = new FormData();
  uploadImage(images: FileItem[], paciente_id:string, archivoss: any) {
    
    for (const item of images) {
      item.uploading = true;

      const filePath = `${"Radiografías/"+paciente_id}/${new Date().getTime()}_${item.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, item.file);
      
      this.imagenesProstata.append('file', item.file)
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
    archivoss.push('https://c.tenor.com/XK37GfbV0g8AAAAC/loading-cargando.gif');
    console.log(archivoss);
    this.http.post(`http://34.125.127.3:5000/model/predict/`, this.imagenesProstata)
        .subscribe(res=>{
          console.log('respuesta servidor: ',res);
          delete archivoss[0]
          archivoss.push('')
          this.resultados = ''
        })
  }

}
