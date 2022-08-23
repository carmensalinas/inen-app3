import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { getDB } from "./config";

// Add a new document in collection "cities"

export interface PacienteModel{
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numDocumento : number,
  edad : number,
  tipoGenero : string,
  telfijo : number, 
  telcel : String, 
  direccion : String,
  fecNacimiento : Date, 
  distrito : String,
  radiologo_id: String,
}

export const crearPacienteDb =  async(paciente: PacienteModel)=>{
  try {
    const db = getDB()
    await addDoc(collection(db, "pacientes"), {
      nombres:paciente.nombres || "",
      apellidos:paciente.apellidos || "",
      tipoDocumento : paciente.tipoDocumento|| "",
      numDocumento : paciente.numDocumento|| "",
      edad : paciente.edad|| "",
      tipoGenero : paciente.tipoGenero|| "",
      telfijo :paciente.telfijo|| "", 
      telcel :paciente.telcel|| "",
      direccion :paciente.direccion|| "",
      fecNacimiento :paciente.fecNacimiento|| "", 
      distrito :paciente.distrito|| "",
      radiologo_id: paciente.radiologo_id,
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}



export const getPaciente = async (email:string): Promise<PacienteModel>=>{
  let user!:PacienteModel;
  try {
    const db = getDB()
    const docRef = doc(db, "pacientes", email);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      user =  docSnap.data() as PacienteModel
    }
  } catch (error) {
    console.log(error);
  }
  return user
}

