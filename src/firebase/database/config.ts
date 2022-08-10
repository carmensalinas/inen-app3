import { getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "../config";

let db:any;

export const getDB= ()=>{
    if(db) return db
    db = getFirestore(getFirebaseApp());
    return db
}