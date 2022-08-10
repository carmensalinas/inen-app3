import { doc, setDoc } from "firebase/firestore";
import { getDB } from "./config";

// Add a new document in collection "cities"

export interface UserFields{
  email: string,
  password:string,
  name: string,
  last_name: string,
  dni: string,
  gender:string,
  telephone:string,
  colegiatura:string,
  birth_date:Date,
  role_id:string
}

export const createUserFields = async(userFields: UserFields)=>{
  try {
    const db = getDB()
    await setDoc(doc(db, "users",userFields.email), {
      email:userFields.email,
      name:userFields.name || "",
      last_name:userFields.last_name || "",
      dni:userFields.dni || "",
      gender:userFields.gender || "",
      telephone:userFields.telephone || "",
      colegiatura:userFields.colegiatura || "",
      birth_date:userFields.birth_date || "",
      role_id:userFields.role_id,
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}