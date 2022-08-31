import { collection, doc, getDoc, getDocs, query, setDoc, where, updateDoc } from "firebase/firestore";
import { FileItem } from "src/app/pages/detallePaciente/models/file-item";
import { getDB } from "./config";

export interface UserModel{
  email: string,
  password:string,
  nombres: string,
  apellidos: string,
  rolCode:number,
  numeroColegiatura : number,
  tipoDocumento: string,
  numDocumento : number,
  edad : number,
  tipoGenero : string,
  telfijo : number, 
  telcel : string, 
  direccion : string,
  fecNacimiento : Date, 
  distrito : string, 
  fotoPerfil?: string,
  fotoPerfilRaw?: Blob,
  primerRegistro? : number
}

export const createUserFields = async(userFields: UserModel)=>{
  try {
    await setDoc(doc(getDB(), "users",userFields.email), {
      email:userFields.email,
      nombres:userFields.nombres || "",
      apellidos:userFields.apellidos || "",
      rolCode:userFields.rolCode|| "",
      numeroColegiatura : userFields.numeroColegiatura|| "",
      tipoDocumento : userFields.tipoDocumento|| "",
      numDocumento : userFields.numDocumento|| "",
      edad : userFields.edad|| "",
      tipoGenero : userFields.tipoGenero|| "",
      telfijo :userFields.telfijo|| "", 
      telcel :userFields.telcel|| "",
      direccion :userFields.direccion|| "",
      fecNacimiento :userFields.fecNacimiento|| "", 
      distrito :userFields.distrito|| "",
      fotoPerfil : userFields.fotoPerfil|| "",
      primerRegistro : 0,
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}



export const getUser = async (email:string): Promise<UserModel>=>{
  let user!:UserModel;
  try {
    const docRef = doc(getDB(), "users", email);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      user =  docSnap.data() as UserModel
    }
  } catch (error) {
    console.log(error);
  }
  return user
}

export const obtenerRadiologosDb = async (): Promise<UserModel[]>=>{
  let users:UserModel[] = [];
  try {
    const q = query(collection(getDB(), "users"), where('rolCode','==',2))
    const docsSnap = await getDocs(q)
    
    if(!docsSnap.empty){
      docsSnap.forEach((doc:any) => {

        users.push(doc.data())
      });
    }
  } catch (error) {
    console.log("db error: ",error);
  }
  return users
}

export const confirmUser = async (user_id: string) => {
  try {
    const userRef = doc(getDB(),"users", user_id);
    const updated = await updateDoc(userRef, {
      primerRegistro: 1
    });
  } catch (error) {
    console.log("Error confirming user ", user_id, " => ",error);
  }
}

