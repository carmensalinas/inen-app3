import { doc, setDoc } from "firebase/firestore";
import { getDB } from "./config";

// Add a new document in collection "cities"

export interface UserFields{
  email: string,
  password:string,
  nombres: string,
  apellidos: string,
  birth_date:Date,
  role_id:string,
  numeroColegiatura : number,
  tipoDocumento: string,
  numDocumento : number,
  edad : number,
  sexo : string,
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
      birth_date:userFields.birth_date || "",
      role_id:userFields.role_id|| "",
      numeroColegiatura : userFields.numeroColegiatura|| "",
      tipoDocumento : userFields.tipoDocumento|| "",
      numDocumento : userFields.numDocumento|| "",
      edad : userFields.edad|| "",
      sexo : userFields.sexo|| "",
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