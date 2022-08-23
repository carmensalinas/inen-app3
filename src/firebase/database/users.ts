import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDB } from "./config";

// Add a new document in collection "cities"

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
  telcel : String, 
  direccion : String,
  fecNacimiento : Date, 
  distrito : String, 
  fotoPerfil : File,
  primerRegistro? : number
}

export const createUserFields = async(userFields: UserModel)=>{
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



export const getUser = async (email:string): Promise<UserModel>=>{
  let user!:UserModel;
  try {
    const db = getDB()
    const docRef = doc(db, "users", email);
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
    const db = getDB()
    const q = query(collection(db, "users"), where('rolCode','==',2))
    const docsSnap = await getDocs(q)
    
    if(!docsSnap.empty){
      docsSnap.forEach((doc:any) => {
        console.log(doc.data())
        users.push(doc.data())
      });
    }
  } catch (error) {
    console.log("db error: ",error);
  }
  return users
}

