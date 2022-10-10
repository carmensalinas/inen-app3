import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getDB } from "./config";


export interface ReporteModel{
  apellidos: string,
}

export const crearReporteDb =  async(reporte: ReporteModel)=>{

    
}




