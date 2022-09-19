import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UserModel } from "../database/users";
export const uploadPicAndGetUrl = async(image: Blob, user_id:string) : Promise<string> =>{
    image = new Blob
    const storage = getStorage();
    const user = JSON.parse(localStorage.getItem("user")||"{}") as UserModel
    
    const imageRef = ref(storage,`Usuarios/${user_id}/${new Date().getTime()}.jpg`);
    return await new Promise(resolve=>{
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(imageRef).then(url=> resolve(url))
        });
    })
    
}