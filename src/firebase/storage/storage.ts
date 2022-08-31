// uploadImageProfile(item: Blob, user_id:string) {
//     item.uploading = true;

//     const filePath = `${"Usuarios/"+user_id}/${new Date().getTime()}_${item.name}`;
//     const fileRef = this.storage.ref(filePath);
//     const task = this.storage.upload(filePath, item.file);

//     item.uploadPercent = task.percentageChanges();
//     task
//       .snapshotChanges()
//       .pipe(
//         finalize(() => {
//           item.downloadURL = fileRef.getDownloadURL();
//           item.uploading = false;
//         })
//       )
//       .subscribe();

// }

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
export const uploadPicAndGetUrl = async(image: Blob, user_id:string) : Promise<string> =>{

    const storage = getStorage();
    const imageRef = ref(storage,`Usuarios/${user_id}/${new Date().getTime()}.${image.type.split("/")[1]}`);

    return await new Promise(resolve=>{
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(imageRef).then(url=> resolve(url))
        });
    })
    
}