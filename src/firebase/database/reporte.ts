import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getDB } from "./config";


export interface ReporteModel{
  id?: string,
  detalle: string,
  paciente_id:string,
}

export interface ResultModel{
  id?: string,
  image: any,
  paciente_id:string
}
export const crearReporteDb =  async(reporte: ReporteModel)=>{
  try {
    await setDoc(doc(getDB(), "reportes",reporte.paciente_id), {
      detalle:reporte.detalle || "",
      paciente_id:reporte.paciente_id || "",
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export const saveResult =  async(results: ResultModel)=>{
  try {
    await setDoc(doc(getDB(), "results",results.paciente_id), {
      image:results.image || "",
      paciente_id:results.paciente_id || "",
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}



export const obtenerReporteDb = async (paciente_id:string): Promise<ReporteModel>=>{
  let reporte!:ReporteModel;
  try {
    const docRef = doc(getDB(), "reportes", paciente_id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      reporte =  docSnap.data() as ReporteModel
    }
  } catch (error) {
    console.log(error);
  }
  return reporte
}


export const obtenerResultDb = async (paciente_id:string): Promise<ResultModel>=>{
  let result!:ResultModel;
  try {
    const db = getDB()
    const docRef = doc(db, "results", paciente_id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      result =  docSnap.data() as ResultModel
      console.log("imagen: "+result.image)
    }
  } catch (error) {
    console.log(error);
  }
  return result
}
