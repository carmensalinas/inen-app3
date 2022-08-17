import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDB } from "./config";

// Add a new document in collection "cities"

export interface UserFields{
  email: string,
  password:string,
  nombres: string,
  apellidos: string,
  rolCode:string,
  numeroColegiatura : number,
  tipoDocumento: string,
  numDocumento : number,
  edad : number,
  tipoGenero : string,
  telfijo : number, 
  telcel : String, 
  direccion : String,
  fecNacimiento : Date, 
  distrito : String, 
  fotoPerfil : File,
  primerRegistro : string
}

export const createUserFields = async(userFields: UserFields)=>{
  try {
    const db = getDB()
    await setDoc(doc(db, "users",userFields.email), {
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


export const getUser = async (email:string)=>{
  try {
    const db = getDB()
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
  } catch (error) {
    console.log(error);
    return false
  }
}