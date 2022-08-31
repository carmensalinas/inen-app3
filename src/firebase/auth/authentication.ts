import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "../config";
import { createUserFields, getUser, UserModel} from "../database/users";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from "src/app/services/storage.service";
import { uploadPicAndGetUrl } from "../storage/storage";

const auth = getAuth(getFirebaseApp());
let storageSvc: StorageService;
export const loginApp = async (email:string,password:string):Promise<UserModel>=>{
    let user!:UserModel
    const login: boolean =  await new Promise((resolve)=>{
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            resolve(true)
          })
          .catch((error) => {
            resolve(false)
          });
    })
    if(login) return await getUser(email)
    return user 
}


export class Logouth{
  constructor(private authfirebase : AngularFireAuth){
    
  }
  logouth(){
    this.authfirebase.signOut();
  }
  
}

class UserCreateResponse{
  success: boolean;
  message: string;
  constructor(_success: boolean,_message: string){
    this.success = _success
    this.message = _message
  }
}

export const signInApp = async (userFields: UserModel):Promise<any>=>{
    if(!userFields.email || !userFields.password || !userFields.rolCode) return new UserCreateResponse(false,"email, contraseña y rol son requeridos")

    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userFields.email))) return new UserCreateResponse(false,"No es un email correcto")
    
    if(userFields.password.length<6) return new UserCreateResponse(false,"La contraseña debe tener 6 caracteres como minimo")

    const createUserCreds = await new Promise((resolve)=>{
      createUserWithEmailAndPassword(auth, userFields.email, userFields.password)
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("error at create user creds:",errorMessage);
        resolve(false)
      });
    })

    if(!createUserCreds) return {success:false,message:"Email ya registrado, por favor use uno nuevo"}
    
    userFields.fotoPerfil = await uploadPicAndGetUrl(userFields.fotoPerfilRaw as Blob, userFields.email)

    const userFieldsCreated = await createUserFields(userFields)

    if(!userFieldsCreated) return new UserCreateResponse(false,"Ocurrio un error al crear los campos del usuario")

    return new UserCreateResponse(true,"")

}


