import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getDB } from "./config";
import { UserModel } from "./users";

// Add a new document in collection "cities"

export interface PacienteModel{
  id?: string,
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numDocumento : number,
  edad : number,
  tipoGenero : string,
  telfijo : number, 
  telcel : string, 
  direccion : string,
  fecNacimiento : Date, 
  distrito : string,
  radiologo_id: string,
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

export const obtenerPacientesDb = async (radiologo_id:string): Promise<PacienteModel[]>=>{
  let pacientes:PacienteModel[] = [];
  try {
    const db = getDB()
    let docsSnap:any;

    if(radiologo_id){
      docsSnap = await getDocs(query(collection(db, "pacientes"), where('radiologo_id','==',radiologo_id)))
    }else{
      docsSnap = await getDocs(collection(db, "pacientes"))
    }
    
    if(!docsSnap.empty){
      docsSnap.forEach((doc:any) => {
        pacientes.push({...doc.data(),id:doc.id})
      });
    }
  } catch (error) {
    console.log("db error: ",error);
  }
  return pacientes
}

export const obtenerPacienteDb = async (id:string): Promise<PacienteModel>=>{
  let paciente!:PacienteModel;
  try {
    const db = getDB()
    const docRef = doc(db, "pacientes", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      paciente =  docSnap.data() as PacienteModel
      paciente.id = docSnap.id
    }
  } catch (error) {
    console.log(error);
  }
  return paciente
}

export const actualizarPacienteDb = async(paciente: PacienteModel)=>{
  try{

    const pacienteRef = doc(getDB(),"pacientes", paciente.id!);
    const updated = await updateDoc(pacienteRef, {
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
    })

  }catch (error) {
    console.log(error);
  }
  return paciente

}