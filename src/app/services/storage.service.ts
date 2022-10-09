import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../pages/detallePaciente/models/file-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class StorageService {
  

  constructor(private readonly storage: AngularFireStorage,
    private http: HttpClient) {}

  ngOnInit(): void {
    
  }

  resultados : Blob
  imagenesProstata: any = new FormData();
  async uploadImage(images: FileItem[], paciente_id:string, archivoss: any): Promise<string> {
    
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

    const requestOptions: Object = {
      responseType: 'blob' 
    }
    await new Promise(resolve=>setTimeout(resolve,5000))
    return await new Promise((resolve,reject)=>{
      this.http.post<any>(`http://34.125.67.136:5000/model/predict/`, this.imagenesProstata, requestOptions)
          .subscribe(res=>{
            let reader = new FileReader()
            reader.readAsDataURL(res)
            reader.onloadend = function() {
              var base64data = String(reader.result);
              resolve(base64data)
              return;
            }
          },error=>{
            reject(error)
          })
    })
  }


  
}
